(function () {

  var Symbol = function (name, code) {
    this.name = name;
    this.code = code;
    this.codeArray = this.code.split('');

    this.playSound = function (codeSymbol) {
      setTimeout(function () {
        App.sounds[codeSymbol].play();
        console.log(App.sounds[codeSymbol].duration);
      }, 1000);
    };

    this.playCode = function () {
      var self = this;

      this.codeArray.forEach(function (codeSymbol) {
        self.playSound(codeSymbol);
      });
    }
  }

  var App = {
    DOMElements: {
      cardsContainer: '.js-cards'
    },
    symbols: [
      new Symbol('A', '.-'),
      new Symbol('B', '-...'),
      new Symbol('C', '-.-.'),
      new Symbol('D', '-..'),
      new Symbol('E', '.'),
      new Symbol('F', '..-.'),
      new Symbol('G', '--.')
    ],
    sounds: {
      '.': new Audio('sounds/long.wav'),
      '-': new Audio('sounds/short.wav')
    },
    fillCards: function () {
      var self = this;

      this.symbols.forEach((symbol) => {
        var cardHTML = '<div class="card js-card" data-symbol-name="' + symbol.name + '">';
        cardHTML += '<h2 class="card__symbol">' + symbol.name + '</h2>';
        cardHTML += '<p class="card__code">' + symbol.code + '</p>';
        cardHTML += '</div>';

        document.querySelector(self.DOMElements.cardsContainer).insertAdjacentHTML('beforeend', cardHTML);
      });
    },
    init: function () {
      var self = this;

      this.fillCards();

      document.querySelector(this.DOMElements.cardsContainer).addEventListener('click', function (e) {
        if (e.target.classList.value === 'card js-card') {
          // 1. Find symbol of clicked item
          // 2. Find corresponding symbol in symbols array
          // 3. Play the symbol's code sound
          // console.log(self.symbols.find(symbol => symbol.name === e.target.dataset.symbolName));
          self.symbols.find(symbol => symbol.name === e.target.dataset.symbolName).playCode();

        }
      });
    }
  }

  App.init();

})();