var _             = require('lodash');
var stats         = require('stats-analysis/stats')

var utils         = require('./../../utils');
var ColorDetector = require('./../color-detector');
var colors        = require('./../../colors');

var Guitar = function(neckHand, pickHand) {
  this.neckHandDetector = new ColorDetector(colors[neckHand] || neckHand);
  this.pickHandDetector = new ColorDetector(colors[pickHand] || pickHand);
  this.configuiring     = 50;

  this.neckHandPoints   = [];
  this.pickHandPoints   = [];

  this.pickHandAbove    = true;
};

Guitar.prototype.setInstrument = function(inst) {
  this.inst = new inst();
};

Guitar.prototype.removeOutliers = function() {
  var self = this;

  var pickHandDistances = this.pickHandPoints.map(function(hand) {
    return utils.dist(hand, [self.pickHandsMeanX, self.pickHandsMeanY]);
  });

  var neckHandDistances = this.neckHandPoints.map(function(hand) {
    return utils.dist(hand, [self.nickHandsMeanX, self.nickHandsMeanY]);
  });

  var i = 0;
  this.pickHandPoints = _.filter(this.pickHandPoints, function() {
    return stats.isOutlier(pickHandDistances[i++], pickHandDistances, 3.5);
  });

  var i = 0;
  this.neckHandPoints = _.filter(this.neckHandPoints, function() {
    return stats.isOutlier(neckHandDistances[i++], neckHandDistances, 3.5);
  });
};

Guitar.prototype.calculateMeans = function() {
  var self = this;

  this.pickHandsMeanX = 0;
  this.pickHandsMeanY = 0;

  this.pickHandPoints.forEach(function(hand) {
    self.pickHandsMeanX += hand[0];
    self.pickHandsMeanY += hand[1];
  });
  this.pickHandsMeanX /= this.pickHandPoints.length;
  this.pickHandsMeanY /= this.pickHandPoints.length;

  this.neckHandsMeanX = 0;
  this.neckHandsMeanY = 0;

  this.neckHandPoints.forEach(function(hand) {
    self.neckHandsMeanX += hand[0];
    self.neckHandsMeanY += hand[1];
  });
  this.neckHandsMeanX /= this.neckHandPoints.length;
  this.neckHandsMeanY /= this.neckHandPoints.length;
};

Guitar.prototype.configure = function(img) {
  var neckHands = this.neckHandDetector.detect(img);
  var pickHands = this.pickHandDetector.detect(img);
  if (pickHands[0]) {
    for (var i in pickHands) {
      var pickHand = pickHands[i];
      img.ellipse(pickHand[0], pickHand[1], 5, 5, [0, 255, 0], 2);
      this.pickHandPoints.push(pickHand);
    }
  }
  if (neckHands[0]) {
    for (var i in neckHands) {
      var neckHand = neckHands[i];
      img.ellipse(neckHand[0], neckHand[1], 5, 5, [0, 0, 255], 2);
      this.neckHandPoints.push(neckHand);
    }
  }
  return img;
};

Guitar.prototype.getNeckHand = function(img) {
  var neckHands = this.neckHandDetector.detect(img);
  var min       = 999999;
  var besst     = undefined;
  for (var i in neckHands) {
    var neckHand = neckHands[i];
    var dist     = utils.dist(neckHand, this.bestNeckHand || [this.neckHandsMeanX, this.neckHandsMeanY]);
    if (dist < min) {
      min = dist;
      this.bestNeckHand = best = neckHand;
    }
  }
  return this.bestNeckHand;
};

Guitar.prototype.getPickHand = function(img) {
  var pickHands = this.pickHandDetector.detect(img);
  var min       = 999999;
  var best      = undefined;
  for (var i in pickHands) {
    var pickHand = pickHands[i];
    var dist     = utils.dist(pickHand, [this.pickHandsMeanX, this.pickHandsMeanY]);
    if (dist < min) {
      min  = dist;
      best = pickHand;
    }
  }
  return min < 200 ? best : undefined;
};

// detect guitar like movements and play notes w/ inst
// returns an image to be displayed in the window
var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'];
Guitar.prototype.process = function(img) {
  if (this.configuiring > 0) {
    this.configuiring--;
    return this.configure(img);
  } else if (this.configuiring !== false) {
    this.calculateMeans();
    this.removeOutliers();
    this.configuiring = false;
  } else {
    var neckHand = this.getNeckHand(img);
    var pickHand = this.getPickHand(img);
    img.line([this.pickHandsMeanX, this.pickHandsMeanY], [this.neckHandsMeanX, this.neckHandsMeanY]);
    img.line([this.pickHandsMeanX, this.pickHandsMeanY], neckHand, [255, 0, 0], 4);
    img.ellipse(this.pickHandsMeanX, this.pickHandsMeanY, 200, 200, [0, 255, 0], 2);
    img.ellipse(this.neckHandsMeanX, this.neckHandsMeanY, 5, 5, [0, 0, 255], 2);
    if (pickHand) {
      img.ellipse(pickHand[0], pickHand[1], 5, 5, [0, 0, 255], 8);
      var aboveOrBelow = this.pickHandsMeanY - pickHand[1];
      var above        = aboveOrBelow < 0;
      if (this.pickHandAbove != above) {
        this.pickHandAbove = above;
        var dist   = utils.dist(neckHand, [this.pickHandsMeanX, this.pickHandsMeanY]);
        // var octave = Math.floor(dist / 90);
        // var note   = Math.floor(Math.floor(dist % 90) / 7.5);
        var note = 8 - Math.floor(dist / 112);
        this.inst.play(notes[note] || 'B', 2);
      }
    }
  }
  return img;
};

module.exports = Guitar;
