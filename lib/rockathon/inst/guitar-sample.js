var wav     = require('wav');
var Speaker = require('speaker');
var path    = require('path');
var fs      = require('fs');

var Guitar = function() {

};

Guitar.prototype.play = function(octave, note) {
  var reader   = new wav.Reader();
  var filePath = path.join(__dirname, '..', '..', '..', 'sounds', 'guitar', 'a#2d.wav');
  var file     = fs.createReadStream(filePath);
  reader.on('format', function (format) {
    reader.pipe(new Speaker(format));
    file.on('end', function() {

    });
  });
  file.pipe(reader);
};

module.exports = Guitar;
