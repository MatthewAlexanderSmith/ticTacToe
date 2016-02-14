$(document).on('ready', function() {
  var turn = 0;
  // var collect = new idCollect();
  var game = new gameTracker(0, 0);
  tdInit();

  function tdInit(){
    $('td').off().on('click', makeMove).removeAttr('class').html('');
    $('body').data("game", 0)
    turn = 0;
  }

  function gameTracker(xWins, oWins){
    this.xWins = xWins,
    this.oWins = oWins
    this.oneUpX = function(){
      ++this.xWins;
      console.log(this.xWins);
    }
    this.oneUpO = function(){
      ++this.oWins;
      console.log(this.oWins);
    }
  }

  function makeMove() {
    // Save the <td> jQuery element that was clicked to self
    var self = $(this);
    // Store id of all TD's with class="x"
    var idXs = [];
    // Store id of all TD's with class="o"
    var idOs = [];

    if ( turn % 2 ) {
      self.html('O').addClass('o');
    } else {
      self.html('X').addClass('x');
    }

    self.off('click');

    $('.x').each(function(){idXs.push(parseInt(this.id, 10))});
    $('.o').each(function(){idOs.push(parseInt(this.id, 10))});

    turn++;

    checkForWinner(idXs, idOs);
  };

  function checkForWinner(idXs, idOs) {
    // Store all possible 3 digit combinations of idXs
    var xCombos = k_combinations(idXs, 3);
    // Store all possible 3 digit combinations of idOs
    var oCombos = k_combinations(idOs, 3);
    // Store sums of all 3 digit combinations of idXs
    var xSums = [];
    // Store sums of all 3 digit combinations of idOs
    var oSums = [];

    // Calculate sums of all 3 digit combinations
    for (var i = 0; i < xCombos.length; i++){
      xSums.push(xCombos[i].reduce((prev, curr) => prev + curr));
    }
    for (var i = 0; i < oCombos.length; i++){
      oSums.push(oCombos[i].reduce((prev, curr) => prev + curr));
    }

    // If any 3 digit combination of x's or o's adds up to 15
    var xWins = xSums.some(elem => elem === 15);
    var oWins = oSums.some(elem => elem === 15);

    if (xWins){
      alert("X Player Wins!")
      // ++game.xWins;
      game.oneUpX();
      tdInit();
    } else if (oWins) {
      alert("O Player Wins!")
      game.oneUpO();
      tdInit();
    } else if (turn >= 9) {
      alert("It's a draw!")
      tdInit();
    };
  }
});
