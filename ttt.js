$(document).on('ready', function() {
  var turn = 0;
  var collect = new idCollect();
  tdInit();


  // function init(){
  //   $('td').off().on('click',
  // }

  function tdInit(){
    $('td').off().on('click', makeMove);
    $('body').data("game", 0)
    collect.idOs = [];
    collect.idXs = [];
    xSums = [];
    oSums= [];
    turn = 0;

  }

  function idCollect(idXs, idOs, xSums, oSums){
    this.idXs = idXs;
    this.idOs = idOs;
    this.xSums = xSums;
    this.oSums = oSums;

  }

  // $('td').on('click', makeMove);
    // this === DOM Element
    // $(this) === jQuery Object
  function makeMove() {
    console.log(turn);
    var self = $(this);

    if ( turn % 2 ) {
      self.html('O').addClass('o');

    } else {
      self.html('X').addClass('x');
    }

    self.off('click');


    // Store id of all TD's with class="x"
    var idXs = [];
    $('.x').each(function(){idXs.push(parseInt(this.id, 10))});
    // Store id of all TD's with class="o"
    var idOs = [];
    $('.o').each(function(){idOs.push(parseInt(this.id, 10))});

    collect.idXs = idXs;
    collect.idOs = idOs;


    turn++;

    checkForWinner(collect.idXs, collect.idOs);

    if ($('body').data("game") === 1){
      alert("Play Again?");
      tdInit();
    };



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
    // We got a Winner!
    if (xSums.some(elem => elem === 15)){
      alert("X Player Wins!")
      $('td').removeAttr('class').html('');
      xSums = [];
      oSums = [];

      xCombos = [];
      oCombos = [];
      $('body').data("game", 1);

      // location.reload();
      // this.winner = 1;
      // location.reload();
      // $('td').on('click', )
      // turn = 0;

    } else if (oSums.some(elem => elem === 15)) {
      alert("O Player Wins!")
      // location.reload();
      $('td').removeAttr('class').html('');
      $('body').data("game", 1);
      // turn = 0;
    } else if (turn >= 8) {
      alert("It's a draw!")
      // location.reload();
    };
  }
});
