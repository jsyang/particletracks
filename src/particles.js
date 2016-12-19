var Graphics = require('./graphics');
var Random   = require('./random');

var particles;

var DEFAULTS = {
    count                     : 10,
    ddx                       : 0.4,
    ddy                       : 0.4,
    lifespan                  : 2000,
    shouldClearTracksPerFrame : false,
    fiddleFactorMin           : 0.0001,
    fiddleFactorMax           : 0.01
};

var shouldClearTracksPerFrame;

function init(options) {
    var count, dx, dy, ddx, ddy, lifespan, fiddleFactorMin, fiddleFactorMax;

    if (options) {
        count    = options.count || DEFAULTS.count;
        dx       = options.dx || 0;
        dy       = options.dy || 0;
        ddx      = options.ddx || DEFAULTS.ddx;
        ddy      = options.ddy || DEFAULTS.ddy;
        lifespan = options.lifespan || DEFAULTS.lifespan;

        shouldClearTracksPerFrame = Boolean(options.shouldClearTracksPerFrame);

        fiddleFactorMax = options.fiddleFactorMax || DEFAULTS.fiddleFactorMax;
        fiddleFactorMin = options.fiddleFactorMin || DEFAULTS.fiddleFactorMin;
    }

    particles = [];

    for (var i = count; i > 0; i--) {
        particles.push({
            x   : Random.float(-1.2 * innerWidth, 1.2 * innerWidth),
            y   : Random.float(-1.2 * innerHeight, 1.2 * innerHeight),
            dx  : Random.float(-dx, dx),
            dy  : Random.float(-dy, dy),
            ddx : Random.float(0, ddx),
            ddy : Random.float(0, ddy),

            attractorX : Random.float(0.4 * innerWidth, 0.6 * innerWidth),
            attractorY : Random.float(0.4 * innerHeight, 0.6 * innerHeight),

            // How long the particle lives
            lifespan  : Random.int(lifespan * 0.1, lifespan),
            splitTime : Random.int(0, lifespan),

            // Amount to fiddle the ddx, ddy factors
            ddFiddleFactor : Random.float(fiddleFactorMin, fiddleFactorMax)
        });
    }

    particles.forEach(function addLastCoordinates(p) {
        p.lastX  = p.x;
        p.lastX2 = p.x;
        p.lastY  = p.y;
        p.lastY2 = p.y;
    });

    Graphics.clear();
}

function moveParticle(p) {
    p.lastX2 = p.lastX;
    p.lastY2 = p.lastY;

    p.lastX = p.x;
    p.lastY = p.y;

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < p.attractorX) {
        p.dx += p.ddx;
    } else if (p.x > p.attractorX) {
        p.dx -= p.ddx;
    }

    if (p.y < p.attractorY) {
        p.dy += p.ddy;
    } else if (p.x > p.attractorY) {
        p.dy -= p.ddy;
    }

    //p.ddx *= Random.float(1 - p.ddFiddleFactor, 1 + p.ddFiddleFactor);
    //p.ddy *= Random.float(1 - p.ddFiddleFactor, 1 + p.ddFiddleFactor);

    p.ddx *= Random.float(1 - p.ddFiddleFactor, 1);
    p.ddy *= Random.float(1 - p.ddFiddleFactor, 1);
}

function drawParticle(p) {
    var rgbaString = [
        255,
        255,
        255,
        //Math.log(p.lifespan).toFixed(2)
        (p.lifespan / Math.log(p.lifespan * p.ddx * p.ddy)).toFixed(2)
    ];

    Graphics.setLineWidth(Math.pow(p.ddx * p.ddy, 0.1));
    Graphics.setStrokeStyle('rgba(' + rgbaString + ')');

    Graphics.line(p.lastX, p.lastY, p.x, p.y);
    Graphics.line(p.lastX, p.lastY, p.lastX2, p.lastY2);
}

function metaboliseParticle(p) {
    p.lifespan--;
    return p.lifespan > 0;
}

function step() {
    if (shouldClearTracksPerFrame) {
        Graphics.clear();
    }

    particles.forEach(moveParticle);
    particles.forEach(drawParticle);

    particles = particles.filter(metaboliseParticle);
}

function getAllOptions(options) {
    var allOptions = {};
    for (var k in DEFAULTS) {
        if (options[k] !== undefined) {
            allOptions[k] = options[k];
        } else {
            allOptions[k] = DEFAULTS[k];
        }
    }

    return allOptions;
}

module.exports = {
    DEFAULTS      : DEFAULTS,
    getAllOptions : getAllOptions,
    init          : init,
    step          : step
};