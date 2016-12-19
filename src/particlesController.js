var Particles = require('./particles');

var savedOptions;

function setOwnProperty(key) {
    this[key] = savedOptions[key];
}

function viewOnGitHub() {
    location.href = 'http://github.com/jsyang/particletracks';
}

function ParticlesController(options) {
    var gui = new dat.GUI();

    savedOptions = Particles.getAllOptions(options || {});

    savedOptions['View on GitHub'] = viewOnGitHub;

    gui.remember(savedOptions);

    var optionDictKeys = Object.keys(savedOptions);

    optionDictKeys.forEach(setOwnProperty.bind(this));
    optionDictKeys.forEach(function addGUI(key) {
        var guiOption;

        if (/color/i.test(key)) {
            guiOption = gui.addColor(savedOptions, key);
        } else {
            guiOption = gui.add(savedOptions, key);
        }

        guiOption.onFinishChange(refresh);
    });

    refresh();
}

function refresh() {
    Particles.init(savedOptions);
}

ParticlesController.prototype.step = Particles.step;

module.exports = ParticlesController;