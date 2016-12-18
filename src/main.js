var Graphics    = require('./graphics');
var Particles   = require('./particles');
var Querystring = require('./querystring');

var raf;

function step() {
    Particles.step();
    raf = requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    Graphics.init();
    var particleInitOptions = Querystring.toDict(location.search);
    Particles.init(particleInitOptions);

    step();
});