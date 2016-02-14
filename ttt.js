$(document).on('ready', function() {
  var turn = 0;
  $('td').on('click', function() {
    // this === DOM Element
    // $(this) === jQuery Object

    // Idempotent = Always get the same outcome
    // Memoization = Store a computed output for repeated use
    var self = $(this);

    if ( turn % 2 ) {
      self.html('O').addClass('o');

    } else {
      self.html('X').addClass('x');
    }

    self.off('click');

    checkForWinner();

    turn++;

    function checkForWinner() {
    var x = $('.x');
    var o = $('.o');
    var idXs = [];
    var idOs = [];

    // Collect id's of all td's in play
    // Separate by .x and .o classes
    // Place values in respective array
    for (var i = 0; i < x.length; i++){
      idXs.push(parseInt($(x[i]).attr('id'), 10));
    }

    for (var i = 0; i < o.length; i++){
      idOs.push(parseInt($(o[i]).attr('id'), 10));
    }

    // Return all possible 3 digit combinations of x's and o's
    var xCombos = k_combinations(idXs, 3);
    var oCombos = k_combinations(idOs, 3);

    // Iterate over the xCombos and oCombos arrays
    // Push the sum to xSum and ySum
    var xSum = [];
    var oSum = [];
    for (var i = 0; i < xCombos.length; i++){
      xSum.push(xCombos[i].reduce((prev, curr) => prev + curr));
    }

    for (var i = 0; i < oCombos.length; i++){
      oSum.push(oCombos[i].reduce((prev, curr) => prev + curr));
    }

    // If any 3 digit combination of x's or o's adds up to 15
    // We got a Winner!
    if (xSum.some(elem => elem === 15)){
      alert("X Player Wins!")
    } else if (oSum.some(elem => elem === 15)) {
      alert("O Player Wins!")
    };
  }
});
  
