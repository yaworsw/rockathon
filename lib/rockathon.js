var config = reuqire('./../config');

config.delay = config.delay || 20;

var win    = require('./rockathon/ui');
var cam    = require('./rockathon/camera');

var inst   = require('./rockathon/' + (config.inst || 'guitar'))

var loop   = function() {
  camera.read(function(err, img) {
    win.show(inst.process(img));
    setTimeout(loop, config.delay);
  });
};
loop();
