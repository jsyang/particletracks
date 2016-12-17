var Graphics = require('./graphics');
var Random   = require('./random');

var particles = [];

function init(options) {
    var count    = 20;
    var dx       = 3;
    var dy       = 3;
    var ddx      = 0.2;
    var ddy      = 0.2;
    var lifespan = 200;

    if (options) {
        count    = options.count || count;
        dx       = options.dx || dx;
        dy       = options.dy || dy;
        ddx      = options.ddx || ddx;
        ddy      = options.ddy || ddy;
        lifespan = options.lifespan || lifespan;
    }

    for (var i = count; i > 0; i--) {
        particles.push({
            x   : Random.float(0.1 * innerWidth, 0.9 * innerWidth),
            y   : Random.float(0.1 * innerHeight, 0.9 * innerHeight),
            dx  : Random.float(-dx, dx),
            dy  : Random.float(-dy, dy),
            ddx : Random.float(0, ddx),
            ddy : Random.float(0, ddy),

            attractorX : Random.float(innerWidth * 0.2, innerWidth * 0.8),
            attractorY : Random.float(innerHeight * 0.2, innerHeight * 0.8),

            // How long the particle lives
            lifespan : Random.int(lifespan, lifespan * 5),

            // Amount to fiddle the ddx, ddy factors
            ddFiddleFactor : 0 //Random.float(0.03, 0.2)
        });
    }

    particles.forEach(function addLastCoordinates(p) {
        p.lastX = p.x;
        p.lastY = p.y;
    });

    Graphics.setStrokeStyle('rgba(255,255,255,0.1)');
}

function moveParticle(p) {
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

    p.dx *= Random.float(1 - p.ddFiddleFactor, 1 + p.ddFiddleFactor);
    p.dy *= Random.float(1 - p.ddFiddleFactor, 1 + p.ddFiddleFactor);
}

function drawParticle(p) {
    var alpha = Math.log(( Math.abs(p.dx) + Math.abs(p.dy)) / Math.log(p.lifespan));
    Graphics.setStrokeWidth(Math.log((p.ddx * p.ddy)));
    Graphics.setStrokeStyle('rgba(255,255,255,' + alpha.toFixed(3) + ')');

    Graphics.line(p.lastX, p.lastY, p.x, p.y);
}

function metaboliseParticle(p) {
    p.lifespan--;
    return p.lifespan > 0;
}

function step() {
    particles.forEach(moveParticle);
    particles.forEach(drawParticle);

    particles = particles.filter(metaboliseParticle);
}

module.exports = {
    init : init,
    step : step
};