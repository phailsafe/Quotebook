angular.module('app')
  .controller('AppCtrl', function AppCtrl(quotesService) {
    this.login = quotesService.login;
    this.signup = quotesService.signup;
    this.getNewQuote = function getNewQuote() {
      quotesService.getNewQuote((newQuote) => {
        this.quote = newQuote;
      });
    };
    this.getNewQuote = this.getNewQuote.bind(this);

    this.loggedIn = false;
    this.saveFavorite = quotesService.saveFavorite.bind(this);

    this.quote = { text: "\"Don't quote me on that.\"", author: 'Ryan' };
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
