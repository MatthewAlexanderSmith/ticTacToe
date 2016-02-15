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
