angular.module('app')
  .component('quote', {
    bindings: {
      quote: '<',
    },
    controller: () => {},
    templateUrl: '/templates/quote.html',
  });
