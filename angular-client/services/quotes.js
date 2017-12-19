angular.module('app')
  .service('quotesService', function ($http) {
    this.login = function (username, password) {
      // console.log('logging in:', username, password);
      $http.post('/login', {
        username: username,
        password: password
      })
        .catch(function (err) {
          console.log(err);
        });
    }
    this.signup = function (username, password) {
    $http.post('/signup', {
        username: username,
        password: password
    })
      .catch(function (err) {
        console.log(err);
      });
    }

    this.getNewQuote = function(callback) {
      $http.get('/quote')
        .then(function ({ data }) {
          if (callback) {
            callback(data);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    
    // this.getByUser

    // this.getUserFavorite
  });