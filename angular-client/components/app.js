angular.module('app')
  .controller('AppCtrl', function AppCtrl(quotesService) {
    this.login = function login() {
      quotesService.login(this.username, this.password, () => {
        this.showLogin = false;
        this.clearFields();
        this.getFavorites();
      });
    }.bind(this);
    this.signup = function signup() {
      quotesService.signup(this.username, this.password, () => {
        this.showSignin = false;
        this.clearFields();
        this.getFavorites();
      });
    }.bind(this);
    this.switchLoginSignup = function showSignup() {
      this.showSignin = !this.showSignin;
      this.showLogin = !this.showLogin;
      if (this.showLogin) {
        this.formMode = 'Sign Up';
      } else {
        this.formMode = 'Cancel';
      }
      this.clearFields();
    }.bind(this);
    this.logout = function logout() {
      quotesService.logout();
      this.showLogin = true;
      this.favorites = [];
    }.bind(this);
    this.clearFields = function clearFields() {
      this.username = '';
      this.password = '';
    }.bind(this);
    this.getNewQuote = function getNewQuote() {
      quotesService.getNewQuote((newQuote) => {
        this.quote = newQuote;
      });
    }.bind(this);
    this.getFavorites = function getFavorites() {
      quotesService.getFavorites((favs) => {
        // console.log(favs);
        this.favorites = favs;
      });
    }.bind(this);
    this.deleteFav = function deleteFav(userId, quoteId) {
      quotesService.deleteFavorite(userId, quoteId, this.getFavorites);
    }.bind(this);
    
    this.saveFavorite = function saveFavorite() {
      quotesService.saveFavorite(this.quote, this.getFavorites);
    }.bind(this);
    
    this.getNewQuote = this.getNewQuote.bind(this);
    
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
