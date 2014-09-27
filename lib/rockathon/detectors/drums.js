var _             = require('lodash');
var stats         = require('stats-analysis/stats')

var utils         = require('./../../utils');
var ColorDetector = require('./../color-detector');
var colors        = require('./../../colors');

var Drums = function(handOne, handTwo) {
  this.handOneDetector = new ColorDetector(colors[handOne] || handOne);
  this.handTwoDetector = new ColorDetector(colors[handTwo] || handTwo);
  this.configuiring     = 100;

  this.handOnePoints   = [];
  this.handTwoPoints   = [];

  this.handOneAbove    = true;
  this.handTwoAbove    = true;
};

Drums.prototype.setInstrument = function(inst) {
  this.inst = new inst();
};

Drums.prototype.getHand = function(num, img) {
  var hand = num === 1 ? this.handOneDetector.detect(img) : this.handTwoDetector.detect(img);
  return hand ? hand[0] : [0, 0];
};

Drums.prototype.getHandOne = function(img) { return this.getHand(1, img); }
Drums.prototype.getHandTwo = function(img) { return this.getHand(2, img); }

var regions;

var inRegion = function(point, region) {
  try {
    if (utils.dist(region.center, point) < region.radius) {
      return true;
    }
  } catch (ex) { /* */ }
  return false;
};

// detect Drums like movements and play notes w/ inst
// returns an image to be displayed in the window
var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
Drums.prototype.process = function(img) {
  var w = img.width();
  var h = img.height();

  if (!regions) {
    regions = {
      hihat: {
        shape:  'ellipse',
        center: [w - 100, h / 2],
        radius:  100,
        note:    46,
        hands:  {}
      },
      snare: {
        shape:  'ellipse',
        center: [w - 300, h / 1.5],
        radius:  100,
        note:    38,
        hands:  {}
      },
      bass: {
        shape:  'ellipse',
        center: [w / 2, h - 200],
        radius:  100,
        note:    35,
        hands:  {}
      },
      crash: {
        shape:  'ellipse',
        center: [100, h / 2],
        radius:  100,
        note:    49,
        hands:  {}
      },
      cowbell: {
        shape:  'ellipse',
        center: [w * 0.25, 100],
        radius:  100,
        note:    56,
        hands:  {}
      }
    };
  }

  var hands = [this.getHandOne(img), this.getHandTwo(img)];
  for (var i in hands) {
    var hand = hands[i];
    if (!hand) continue;
    for (var j in regions) {
      var region = regions[j];
      if (inRegion(hand, region)) {
        if (!region.hands[i]) {
          this.inst.play(region.note);
          region.hands[i] = true;
        }
        break;
      } else {
        region.hands[i] = false;
      }
    }
  }

  for (var i in regions) {
    var region = regions[i];
    img[region.shape](region.center[0], region.center[1], region.radius, region.radius, [255, 0 , 0], 4);
  }

  for (var i in hands) {
    var hand = hands[i];
    if (!hand) continue;
    img.ellipse(hand[0], hand[1], 5, 5, [0, 255, 0], 4);
    img.ellipse(hand[0], hand[1], 50, 50, [0, 255, 255], 4);
  }

  // clap !
  try {
    if (!this.clapped && utils.dist(hands[0], hands[1]) < 100) {
      var self = this;
      this.clapped = true;
      this.inst.play(39);
      setTimeout(function() {
        self.clapped = false;
      }, 100);
    }
  } catch (ex) { /* */ }


  return img;
};

module.exports = Drums;
