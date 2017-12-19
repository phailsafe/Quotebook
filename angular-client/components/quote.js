angular.module('app')
.component('quote', {
  bindings: {
    quote: '<',
  },
  controller: function () { 
    // this.quote = { text: "don't quote me on that.", author: "ryan" };
  },
  templateUrl: '/templates/quote.html'
})