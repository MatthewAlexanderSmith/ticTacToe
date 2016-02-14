$(document).on('ready', function() {
  $(function(){
    $("h1").typed({
      strings: ["Welcome to jQuery Tic-Tac-Toe", "No biting", "eye gauging", "or fish hooks", "x plays first", "click a square to begin"],
      typeSpeed: 10
    });
  });

  console.log($('h1').html());



  var turn = 0;
  var game = new gameTracker(0, 0);
  tdInit();

  function tdInit(){
    $('td').off().on('click', makeMove).removeAttr('class').html('');
    $('.xScore span').text(game.xWins);
    $('.oScore span').text(game.oWins);
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
    // Save the <td> jQuery element that was clicked
    var self = $(this);
    // Store id of all <td>'s with class="x"
    var idXs = [];
    // Store id of all <td>'s with class="o"
    var idOs = [];

    if ( turn % 2 ) {
      self.html('O').addClass('o');
    } else {
      self.html('X').addClass('x');
    };

    self.off('click');

    $('.x').each(function(){idXs.push(parseInt(this.id, 10))});
    $('.o').each(function(){idOs.push(parseInt(this.id, 10))});
    turn++;
    checkForWinner(idXs, idOs);
  };

  function checkForWinner(idXs, idOs) {
    // Store all possible 3 digit combinations of idXs and idOs
    var xCombos = k_combinations(idXs, 3);
    var oCombos = k_combinations(idOs, 3);
    // Store sums of all 3 digit combinations of idXs and idOs
    var xSums = [];
    var oSums = [];

    // Calculate the sum of all 3 digit combinations separately
    for (var i = 0; i < xCombos.length; i++){
      xSums.push(xCombos[i].reduce((prev, curr) => prev + curr));
    }
    for (var i = 0; i < oCombos.length; i++){
      oSums.push(oCombos[i].reduce((prev, curr) => prev + curr));
    }
    // Check if any sum adds up to 15
    var xWins = xSums.some(elem => elem === 15); // returns true or false
    var oWins = oSums.some(elem => elem === 15); // returns true or false
    var draw = (turn >= 9); // Returns true or false

    if (xWins){
      alert("X Player Wins!")
      game.oneUpX();
      tdInit();
    } else if (oWins) {
      alert("O Player Wins!")
      game.oneUpO();
      tdInit();
    } else if (draw) {
      alert("It's a draw!")
      tdInit();
    };
  }
});
