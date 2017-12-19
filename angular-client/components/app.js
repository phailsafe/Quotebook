angular.module('app')
.controller('AppCtrl', function(quotesService) {
  // itemsService.getAll((data) => {
  //   this.items = data;
  // });
  this.login = quotesService.login;
  this.signup = quotesService.signup;
  this.getNewQuote = function() {
    quotesService.getNewQuote((newQuote) => {
      this.quote = newQuote;
    });
  }
  this.getNewQuote = this.getNewQuote.bind(this);

  this.quote = { text: "\"Don't quote me on that.\"", author: "Ryan" };
})
.component('app', {
  bindings: {},
  controller: 'AppCtrl',
  templateUrl: '/templates/app.html'
});