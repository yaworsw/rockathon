var ColorDetector = require('./../color-detector');
var inst          = new require('./../inst/guitar')();

var Guitar = function(neckHand, pickHand) {
  this.neckHandDetector = new ColorDetector(neckHand);
  this.pickHandDetector = new ColorDetector(pickHand);
};

// detect guitar like movements and play notes w/ inst
// returns an image to be displayed in the window
Guitar.prototype.process = function(img) {
  return img;
};

module.exports = Guitar;
