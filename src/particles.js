var Graphics = require('./graphics');
var Random   = require('./random');

var particles = [];

// Particle defaults
var count    = 10;
var dx       = 1;
var dy       = 1;
var ddx      = 0.4;
var ddy      = 0.4;
var lifespan = 2000;

var shouldClearTracksPerFrame = false;
var fiddleFactorMin           = 0.0001;
var fiddleFactorMax           = 0.01;

function init(options) {

    if (options) {
        count    = options.count || count;
        dx       = options.dx || dx;
        dy       = options.dy || dy;
        ddx      = options.ddx || ddx;
        ddy      = options.ddy || ddy;
        lifespan = options.lifespan || lifespan;

        shouldClearTracksPerFrame = options.shouldClearTracksPerFrame || shouldClearTracksPerFrame;

        fiddleFactorMax = options.fiddleFactorMax || fiddleFactorMax;
        fiddleFactorMin = options.fiddleFactorMin || fiddleFactorMin;
    }

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

module.exports = {
    init : init,
    step : step
};