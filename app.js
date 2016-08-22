var TicTacToeGame = function () {
  var self = this;

  self.init = function () {
    self.player = 'X';
    self.game = $('#game');
    self.result = $('#game-result');
    self.resultText = self.result.find('.result');
    self.turn = self.game.find('.turn');
    self.box = self.game.find('.box');
    self.resetButton = self.result.find('.reset-game');

    self.setTurn(self.player);
    self.box.on('click', self.move);
    self.resetButton.on('click', self.resetBoard);
  };

  self.setTurn = function (player) {
    self.player = player;
    self.turn.removeClass('X O').addClass(player).text(player + "'s turn");
  };

  self.move = function () {
    var currentBox = $(this);

    if (!currentBox.text()) {
      currentBox.addClass(self.player).text(self.player);
      self.checkScore();
    } else {
      alert('Invalid move.');
    }
  };

  self.checkScore = function () {
    var nextPlayer = this.player === 'X' ? 'O' : 'X';
    var possibleCombos = [[0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6], [0,3,6], [1,4,7], [2,5,8]];
    var emptyBoxes = this.box.filter(function (index, box) {
      return box.innerHTML === '';
    });

    if (emptyBoxes.length === 0) {
      self.tie = true;
    } else {
      possibleCombos.some(function (combo, index) {
        if (self.box[combo[0]].innerHTML === self.player &&
          self.box[combo[1]].innerHTML === self.player &&
          self.box[combo[2]].innerHTML === self.player) {
          self.winner = self.player;

          return true;
        }
      });
    }

    if (self.winner || self.tie) {
      var resultText = self.winner ? self.winner + ' Wins!!!!' : 'Tie!';

      self.game.hide();
      self.resultText.removeClass('X O').addClass(self.winner).text(resultText);

      self.result.fadeIn();
    } else {
      self.setTurn(nextPlayer);
    }
  };

  self.resetBoard = function () {
    self.turn.text('');
    self.box.removeClass('X O').text('');
    self.result.hide();
    self.game.fadeIn();
    self.player = self.winner || self.player;
    self.winner = null;
    self.tie = null;

    self.setTurn(self.player);
  };
};

$(document).ready(function () {
  var game = new TicTacToeGame();

  game.init();
});
