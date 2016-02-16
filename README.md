# TicTacToe Yo

## Problem:
Trouble calling functions between js files:

Worked:
* ttt.js => typed.js
* ttt.js => combos.js
* typed.js => combos.js
* combos.js => typed.js

Failed:

* combos.js => ttt.js
* typed.js => ttt.js

#### Solution:
* removed $(document).on('ready', function(){}); from ttt.js.
* move all script tags to the end of the body section in index.html.

#### Better Solution!!

$(function(){
  $("#mainMessage").typed({
    strings: ["Welcome to jQuery Tic-Tac-Toe", "click any square to begin..."],
    typeSpeed: 1,
    contentType: 'text',
    callback: function() {
      $("table").fadeIn(1000);
      $(".centerScores").fadeIn(1000);
      mode.state = "waiting";
      tdInit();
      gameReset();
    },
  });
});

* instead of modifying the typed.js library (generally best to avoid modifying libraries)
* add the callback function to the .typed function inside my document.ready event handler.
* this is a more elegant solution that is much easier to follow for others.
___

Q: functions inside document.ready cannot be called from outside document.ready
