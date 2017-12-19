angular.module('app')
  .service('quotesService', function quotesService($http) {
    this.login = (username, password) => {
      // console.log('logging in:', username, password);
      $http.post('/login', {
        username,
        password,
      })
        .catch((err) => {
          console.log(err);
        });
    };
    this.signup = (username, password) => {
      $http.post('/signup', {
        username,
        password,
      })
        .catch((err) => {
          console.log(err);
        });
    };

    this.getNewQuote = function getNewQuote(callback) {
      $http.get('/quote')
        .then(({ data }) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.saveFavorite = function saveFavorite(quote) {
      $http.post('/favorite', {
        quote,
      })
        .catch((err) => {
          console.log(err);
        });
    };
    // this.getByUser

    // this.getUserFavorite
  });
