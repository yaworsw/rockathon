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
  // 'C#' : 37,
  'D'  : 38,
  // 'D#' : 39,
  'E'  : 40,
  'F'  : 41,
  // 'F#' : 42,
  'G'  : 43,
  // 'G#' : 44,
  'A'  : 45,
  // 'A#' : 46,
  'B'  : 47,
  'C2':  48
};
Guitar.prototype.play = function(note, octave) {
  if (!octave) {
    octave = 0;
  }
  note     = typeof note === 'string' ? notes[note] : note;
  var self = this;
  console.log(note)
  self.out.sendMessage([144, note + octave * 12 - 36, 80]);
  setTimeout(function() {
    self.out.sendMessage([144, notes + octave * 12 - 36, 0]);
  }, 80);
};

module.exports = Guitar;
