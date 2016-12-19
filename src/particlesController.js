var Particles = require('./particles');

var savedOptions;

function setOwnProperty(key) {
    this[key] = savedOptions[key];
}

function ParticlesController(options) {
    var gui = new dat.GUI();

    savedOptions = Particles.getAllOptions(options || {});

    gui.remember(savedOptions);

    var optionDictKeys = Object.keys(savedOptions);

    optionDictKeys.forEach(setOwnProperty.bind(this));
    optionDictKeys.forEach(function addGUI(key) {
        var guiOption = gui.add(savedOptions, key);
        guiOption.onFinishChange(refresh);
    });

    refresh();
}

function refresh() {
    Particles.init(savedOptions);
}

ParticlesController.prototype.step = Particles.step;

module.exports = ParticlesController;