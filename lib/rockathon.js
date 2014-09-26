var config = require('./../config');

config.delay = config.delay || 20;

var win    = require('./rockathon/ui');
var cam    = require('./rockathon/camera');

var Detector = require('./rockathon/detectors/' + (config.inst || 'guitar'));
var det      = new Detector();

var loop = function() {
  cam.read(function(err, img) {
    win.show(det.process(img));
    setTimeout(loop, config.delay);
  });
};
loop();
