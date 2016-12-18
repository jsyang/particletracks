/**
 * Graphics interface
 */

var canvas;
var ctx2d;

var width;
var height;

function init() {
    canvas = document.querySelector('canvas');

    canvas.style.position = 'absolute';
    canvas.style.top      = 0;
    canvas.style.left     = 0;

    window.addEventListener('resize', onResize);
    updateDimensions();
}

function updateDimensions() {
    width         = window.innerWidth;
    height        = window.innerHeight;
    canvas.width  = width;
    canvas.height = height;
    ctx2d         = canvas.getContext('2d');
    clear();
}

function onResize() {
    updateDimensions();
}

function clear() {
    ctx2d.clearRect(0, 0, width, height);
}

function line(x1, y1, x2, y2) {
    ctx2d.beginPath();
    ctx2d.moveTo(x1, y1);
    ctx2d.lineTo(x2, y2);
    ctx2d.stroke();
}

function circle(x, y, r) {
    ctx2d.beginPath();
    ctx2d.arc(x, y, r, 0, 2 * Math.PI);
    ctx2d.stroke();
}

function setStrokeStyle(styleString) {
    ctx2d.strokeStyle = styleString;
}

function setLineWidth(width) {
    ctx2d.lineWidth = width;
}

function setLineCap(capType) {
    ctx2d.lineCap = capType;
}

module.exports = {
    init           : init,
    line           : line,
    setStrokeStyle : setStrokeStyle,
    setLineWidth   : setLineWidth,
    setLineCap     : setLineCap,
    circle         : circle,
    clear          : clear
};