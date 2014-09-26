var cv = require('opencv');

var ColorDetector = function(hue, upper) {
  if (upper) {
    this.setLowerBounds(hue);
    this.setUpperBounds(upper);
  } else {
    this.setHue(hue);
  }
  this.minArea = 5000;
};

ColorDetector.prototype.setMinArea = function(area) {
  this.minArea = area;
};

ColorDetector.prototype.setHue = function(hue) {
  this.setLowerBounds(hue - 10);
  this.setUpperBounds(hue + 10);
};

ColorDetector.prototype.setBounds = function(lb, ub) {
  this.setLowerBounds(lb);
  this.setUpperBounds(ub);
};

ColorDetector.prototype.setLowerBounds = function(lb) {
  this.lowerBounds = lb;
};

ColorDetector.prototype.setUpperBounds = function(ub) {
  this.upperBounds = ub;
};

ColorDetector.prototype.detect = function(im) {
  var objs   = [];
  var hsvImg = im.copy();

  hsvImg.convertHSVscale();
  hsvImg.inRange([this.lowerBounds, 0, 0], [this.upperBounds, 255, 255]);

  var contours = hsvImg.findContours();
  for (var i = contours.size() - 1; i >= 0; i--) {
    if(contours.area(i) > this.minArea) {
      var moments = contours.moments(i);
      var cgx = Math.round(moments.m10/moments.m00);
      var cgy = Math.round(moments.m01/moments.m00);
      objs.push([cgx, cgy]);
    }
  };

  return objs;
}

module.exports = ColorDetector;
