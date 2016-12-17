var Graphics = require('./graphics');
var Particles = require('./particles');

var raf;

function step() {
    Particles.step();
    raf = requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded(){
    Graphics.init();
    Particles.init();
    step();
});