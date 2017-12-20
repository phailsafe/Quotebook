angular.module('app')
  .controller('AppCtrl', function AppCtrl(quotesService) {
    this.login = function login() {
      quotesService.login(this.username, this.password);
      this.showLogin = false;
      this.clearFields();
    };
    this.signup = function signup() {
      quotesService.signup(this.username, this.password);
      this.showSignin = false;
      this.clearFields();
    };
    this.switchLoginSignup = function showSignup() {
      this.showSignin = !this.showSignin;
      this.showLogin = !this.showLogin;
      if (this.showLogin) {
        this.formMode = 'Sign Up';
      } else {
        this.formMode = 'Cancel';
      }
      this.clearFields();
    };
    this.logout = function logout() {
      quotesService.logout();
      this.showLogin = true;
      this.favorites = [];
    };
    this.clearFields = function clearFields() {
      this.username = '';
      this.password = '';
    };
    this.getNewQuote = function getNewQuote() {
      quotesService.getNewQuote((newQuote) => {
        this.quote = newQuote;
      });
    };
    this.getFavorites = function getFavorites() {
      quotesService.getFavorites((favs) => {
        // console.log(favs);
        this.favorites = favs;
      });
    };

    this.deleteFav = function deleteFav(userId, quoteId) {
      console.log('user id', userId);
      console.log('quote id', quoteId);
      quotesService.deleteFavorite(userId, quoteId);
    };
    
    this.getNewQuote = this.getNewQuote.bind(this);
    this.saveFavorite = quotesService.saveFavorite.bind(this);
    
    this.favorites = [];
    this.formMode = 'Sign Up';
    this.showLogin = true;
    this.showSignin = false;
    this.quote = { text: "\"Don't quote me on that.\"", author: 'Ryan' };
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
