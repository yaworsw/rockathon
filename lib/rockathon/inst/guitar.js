var T = require('timbre');

var env   = T('perc', { a: 50, r: 2500 });
var pluck = T('PluckGen', { env:env, mul: 0.5 }).play();

var Guitar = function() {

};

var notes   = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var noteNum = function(octave, note) {
  if (!octave) { octave = 5; }
  return octave * 11 + notes.indexOf(note);
};

// play whatever note is sent
Guitar.prototype.play = function(note, octave) {
  var now = Date.now();
  if (!this.lastPlay < now - 500) {
    this.lastPlay = now;
    pluck.noteOn(noteNum(octave, note), 64);
  }
};

module.exports = Guitar;
