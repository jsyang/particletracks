var Graphics            = require('./graphics');
var ParticlesController = require('./particlesController');
var Querystring         = require('./querystring');

var controller;

function step() {
    controller.step();
    requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    Graphics.init();

    controller = new ParticlesController(
        Querystring.toDict(location.search)
    );

    step();
});