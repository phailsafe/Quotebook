angular.module('app')
  .controller('AppCtrl', function AppCtrl(quotesService) {
    // login
    this.login = function login() {
      if (this.username && this.password) {
        quotesService.login(this.username, this.password, () => {
          this.showLogin = false;
          this.clearFields();
          this.getFavorites();
          this.getPosts();
        });
      }
    }.bind(this);

    // signup
    this.signup = function signup() {
      if (this.username && this.password) {
        quotesService.signup(this.username, this.password, () => {
          this.showSignin = false;
          this.clearFields();
          this.getFavorites();
        });
      }
    }.bind(this);

    // display correct form
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

    // logout
    this.logout = function logout() {
      quotesService.logout();
      this.showLogin = true;
      this.favorites = [];
      this.posts = [];
    }.bind(this);

    // clear forms
    this.clearFields = function clearFields() {
      this.username = '';
      this.password = '';
      this.userQuote = '';
    }.bind(this);

    // get a new quote
    this.getNewQuote = function getNewQuote() {
      quotesService.getNewQuote((newQuote) => {
        this.quote = newQuote;
      });
    }.bind(this);

    // get user favorites
    this.getFavorites = function getFavorites() {
      quotesService.getFavorites((favs) => {
        // console.log(favs);
        this.favorites = favs;
      });
    }.bind(this);

    // delete favorite
    this.deleteFav = function deleteFav(userId, quoteId) {
      quotesService.deleteFavorite(userId, quoteId, this.getFavorites);
    }.bind(this);

    // save quote as favorite
    this.saveFavorite = function saveFavorite() {
      quotesService.saveFavorite(this.quote, this.getFavorites);
    }.bind(this);

    // add a quote
    this.writeQuote = function writeQuote() {
      quotesService.addQuote(this.userQuote, () => {
        this.getPosts();
      });
      this.clearFields();
    }.bind(this);

    // get user quotes
    this.getPosts = function getPosts() {
      // console.log('get user posts');
      quotesService.getPosts((quotes) => {
        this.posts = quotes;
        // console.log(this.posts);
      });
    }.bind(this);

    this.editPost = function editPost(postId) {
      quotesService.updatePost(this.userQuote, postId, () => {
        this.getPosts();
      });
      this.clearFields();
    }.bind(this);

    this.posts = [];
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
