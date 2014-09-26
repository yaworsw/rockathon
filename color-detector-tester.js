//
// The bounds start at 109 115 which is blue
//
// to change the bounds enter the lower bounds followed by a space then the
// upper bounds
//

console.log('To change bounds enter the lower bounds then the upper bounds and press enter');
console.log('[lower bounds] [upper bounds] [enter]');

var bounds = {
  'blue': [109, 115],
}

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var cd = require('./lib/rockathon/color-detector');
cd = new cd(109, 115);

if (bounds[process.argv[2]]) {
  cd.setBounds.apply(cd, bounds[process.argv[2]]);
}

var cv = require('opencv');

var camera = new cv.VideoCapture(0);

var win = new cv.NamedWindow('Display Window', '400x400');

rl.on('line', function (input) {
  cd.setBounds.apply(cd, input.split(' '));
  console.log('bounds set to', input.split(' '))
});

var sound = {
  process: function(L, R) {
    for (var i = 0; i < L.length; i++) {
      L[i] = R[i] = Math.random() * 0.25;
    }
  }
};

var main = function() {
  camera.read(function(err, im) {
    var objs = cd.detect(im);
    for (var i = objs.length - 1; i >= 0; i--) {
      var obj = objs[i];
      im.ellipse(obj[0], obj[1], 5, 5, [0, 255, 0], 2);
    };
    win.show(im);
    setTimeout(main, 20);
  });
};

main();

process.on('exit', function(code) {
});
