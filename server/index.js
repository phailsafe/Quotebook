var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
var request = require('request');
var app = express();
var User = require('../database-mongo/index').User;
var Quote = require('../database-mongo/index').Quote;
var Favorite = require('../database-mongo/index').Favorite;

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/login', (req, res) => {
  // console.log('user login', req.body);
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({name: username, password: password})
    .then(found => {
      if (found) {
        console.log('user logged in');
      } else {
        console.log('invalid username/password');
      }
      res.redirect('/');
    })
    .catch(err => {
      console.log('error finding user', err);
    })
  });
  
  app.post('/signup', (req, res) => {
    console.log('sign up', req.body);
    let username = req.body.username;
    let password = req.body.password;
    let newUser = new User({name: username, password: password})
    newUser.save()
    .then(newUser => {
      console.log('new user added')
      res.redirect('/');
    })
    .catch(err => {
      console.log('error on signup', err);
    })
});

app.get('/quote', (req, res) => {
  console.log('get quote')
  let chance = Math.floor(Math.random() * 2);
  // if (chance) {
    
  // } else {
    request('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', (err, response, body) => {
      let quote;
      try {
        quote = JSON.parse(body)
      } catch (err) {
        quote = { quoteText: 'this api sucks', quoteAuthor: 'the dev' };
      }
      console.log('quote', quote);
      let text = quote.quoteText;
      let author = quote.quoteAuthor;
      
      let newQuote = {
        text: text,
        author: author
      }
      res.send(newQuote);
    });
  // }
});



app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});

