var picks = [];
var last  = undefined;

$('#wrapper').tubular({videoId: 'Iq5aWzD_MfM', start: 31});

setInterval(function() {
    try {
    if (player) player.seekTo(31);
  } catch (ex) { /* */ }
}, 60000);

var ___looooopppp = function() {
  document.getElementById('that-part-up-there').innerHTML   = '';
  document.getElementById('whatcha-gunna-be').innerHTML     = '';
  document.getElementById('that-part-down-there').innerHTML = '';

  var choices = [
    ['Be The', 'Air Guitar Hero'],
    ['You too can be a', 'Rock God'],
    ['Become the next', '"Mean Melin" *', '* Winner of the 2013 Aur Guitar World Championships'],
    ['Become the', 'King of the Classroom'],
    ['Does not currently support dubstep'],
    ['', 'Coming to a theater near you'],
    ['You too', 'Can look this cool'],
    ['', 'Too Cool For School'],
    ['', 'Better exercise than cross fit *', '* I made that up'],
    ['', 'Pants not required'],
    ['Justin Beiber Lip Syncs', 'Air Guitar Should Count Too!<br/>Sign the petition below'],
    ['My imaginary friend stole my air guitar'],
    ['1. Start Up</br>2. Cash In</br>3. Sell Out<br/>4. Bro Down'],
    ['Be the', 'Dude at the party with the air guitar'],
    ['', 'Pay me for an air guitar!'],
    ['', 'All the cool kids are doing it'],
    ['', 'Sweaty gloves']
  ];

  var pick;
  if (picks.length == choices.length) {
    picks = [];
  }
  while (true) {
    pick = Math.floor(Math.random() * choices.length);
    if (picks.indexOf(pick) > 0 || pick === last) {

    } else {
      last = pick;
      picks.push(pick);
      break;
    }
  }

  var choice = choices[pick];
  if (choice[0]) document.getElementById('that-part-up-there').innerHTML   = choice[0];
  if (choice[1]) document.getElementById('whatcha-gunna-be').innerHTML     = choice[1];
  if (choice[2]) document.getElementById('that-part-down-there').innerHTML = choice[2];

  setTimeout(___looooopppp, 4200);

};

___looooopppp();

