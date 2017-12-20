angular.module('app')
  .service('quotesService', function quotesService($http) {
    this.login = (username, password, callback) => {
      // console.log('logging in:', username, password);
      $http.post('/login', {
        username,
        password,
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    this.signup = (username, password, callback) => {
      $http.post('/signup', {
        username,
        password,
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    this.logout = () => {
      $http.post('/logout')
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

    this.saveFavorite = function saveFavorite(quote, callback) {
      $http.post('/favorite', {
        quote,
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.getFavorites = function getFavorites(callback) {
      $http.get('/favorite')
        .then((quotes) => {
          const favs = quotes.data;
          callback(favs);
        })
        .catch((err) => {
          console.log('error getting favorites', err);
        });
    };

    this.deleteFavorite = function deleteFavorite(userId, quoteId, callback) {
      // $http.delete('/favorite', {
      //   data: {
      //     userId,
      //     quoteId,
      //   },
      $http({
        url: '/favorite',
        method: 'DELETE',
        data: {
          userId,
          quoteId,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log('error deleting favorite', err);
        });
    };

    this.addQuote = function addQuote(text, callback) {
      $http.post('/quote', {
        text,
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log('error sending quote', err);
        });
    };

    this.getPosts = function getPosts(callback) {
      $http.get('/user')
        .then((quotes) => {
          callback(quotes.data);
        })
        .catch((err) => {
          console.log('error getting user posts', err);
        });
    };

    this.updatePost = function updatePost(text, postId, callback) {
      $http({
        url: '/user',
        method: 'PUT',
        data: {
          text,
          postId,
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
        .then(() => {
          callback();
        })
        .catch((err) => {
          console.log('error updating post', err);
        });
    };

  });
