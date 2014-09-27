var config = require('./../config');

config.delay = config.delay || 20;

var win    = require('./rockathon/ui');
var cam    = require('./rockathon/camera');

var Detector   = require('./rockathon/detectors/' + (config.detector.type || 'guitar'));

var Det2       = function(args) { return Detector.apply(this, args); };
Det2.prototype = Detector.prototype;
var det        = new Det2(config.detector ? config.detector.args : []);

det.setInstrument(require('./rockathon/inst/' + config.inst));

var loop = function() {
  cam.read(function(err, img) {
    img = det.process(img);
    img = img.flip(1);
    win.show(img);
    setTimeout(loop);
  });
};
loop();
