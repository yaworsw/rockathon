var midi = require('midi');


var Guitar = function() {
  var self = this;
  self.out  = new midi.output();
  self.out.openVirtualPort('');
  process.on('end', function() {
    self.out.closePort();
  });
};

var notes = {
  'C'  : 36,
  'C#' : 37,
  'D'  : 38,
  'D#' : 39,
  'E'  : 40,
  'F'  : 41,
  'F#' : 42,
  'G'  : 43,
  'G#' : 44,
  'A'  : 45,
  'A#' : 46,
  'B'  : 47
};
Guitar.prototype.play = function(note, octave) {
  note     = note instanceof String ? notes[note] : note;
  var self = this;
  self.out.sendMessage([144, note, 80]);
  setTimeout(function() {
    self.out.sendMessage([144, notes, 0]);
  }, 80);
};

module.exports = Guitar;
