var ColorDetector = require('./../color-detector');
var inst          = new require('./../inst/guitar')();

var Guitar = function(neckHand, pickHand) {
  this.neckHandDetector = new ColorDetector(neckHand);
  this.pickHandDetector = new ColorDetector(pickHand);
};

Guitar.prototype.process = function(img) {
  return img;
};

module.exports = Guitar;
