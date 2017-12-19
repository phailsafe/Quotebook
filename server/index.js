const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { User, Quote, Favorite } = require('../database-mongo/index');
const session = require('express-session');


const app = express();
app.use(express.static(`${__dirname}/../angular-client`));
app.use(express.static(`${__dirname}/../node_modules`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  name: 'app.sid',
  secret: '1234567890QWERTY',
  resave: true,
  saveUninitialized: true,
}));


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ name: username, password })
    .then((found) => {
      if (found) {
        // console.log('user logged in');
        req.session.regenerate(() => {
          req.session.user = username;
          console.log('session started', req.session);
          req.session.save();
          res.redirect('/');
        });
      } else {
        console.log('invalid username/password');
        res.redirect('/');
      }
    })
    .catch((err) => {
      console.log('error finding user', err);
    });
});

app.post('/signup', (req, res) => {
  // console.log('sign up', req.body);
  const { username, password } = req.body;
  User.findOne({ name: username, password })
    .then((found) => {
      if (found) {
        console.log('user already exists');
        res.redirect('/');
      } else {
        const newUser = new User({ name: username, password });
        newUser.save()
          .then(() => {
            console.log('new user added');
            req.session.regenerate(() => {
              req.session.user = username;
              req.session.save();
              res.redirect('/');
            });
          })
          .catch((err) => {
            console.log('error on signup', err);
          });
      }
    })
    .catch((err) => {
      console.log('error querying users', err);
    });
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('error ending session', err);
    }
    console.log('logged out');
    res.end();
  });
});

app.get('/quote', (req, res) => {
  console.log('get quote');
  const chance = Math.floor(Math.random() * 4);
  // console.log('chance', chance);
  if (!chance) {
    Quote.findOne()
      .then((quote) => {
        // console.log('db quote', quote);
        res.send(quote);
      })
      .catch((error) => {
        if (error) {
          console.log('error getting quote', error);
        }
      });
  } else {
    request('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', (err, response, body) => {
      let quote;
      try {
        quote = JSON.parse(body)
      } catch (error) {
        quote = { quoteText: 'this api sucks', quoteAuthor: 'the dev' };
      }
      // console.log('quote', quote);
      const text = quote.quoteText;
      const author = quote.quoteAuthor;
      const newQuote = {
        text,
        author,
      };
      res.send(newQuote);
    });
  }
});

const isUserSession = function isUserSession(req, res, next) {
  if (req.session.user) {
    console.log('is user session');
    next();
  } else {
    console.log('no user session');
    req.session.error = 'user not logged in';
    res.redirect('/');
  }
};

app.get('/favorite', isUserSession, (req, res) => {
  const username = req.session.user;
  User.findOne({ name: username })
    .then(user => Favorite.find({ id_user: user.id }))
    .then((favs) => {
      return Promise.all(favs.map((fav) => {
        // console.log('fav', fav);
        return Quote.findOne({ _id: fav.id_quote });
      }));
    })
    .then((quotes) => {
      // console.log('quotes', quotes);
      res.send(quotes);
    })
    .catch((err) => {
      console.log('error', err);
      res.end();
    });
});

app.post('/favorite', isUserSession, (req, res) => {
  const { quote } = req.body;
  console.log('favoriting', quote);
  const username = req.session.user;
  console.log('username', username);
  User.findOne({ name: username })
    .then((user) => {
      // console.log('user found', user);
      Quote.findOne({ text: quote.text, author: quote.author })
        .then((found) => {
          if (found) {
            console.log('found quote');
            // add quote id and user id to favorites
            const newFav = new Favorite({ id_user: user.id, id_quote: found.id });
            newFav.save()
              .then(() => {
                res.end();
              })
              .catch((err) => {
                console.log('error saving favorite', err);
              });
          } else {
            console.log('saving quote');
            const newQuote = new Quote({
              text: quote.text,
              author: quote.author,
              id_user: user.id,
            });
            newQuote.save()
              .then(() => {
                // add quote id and user id to favorites
                const newFav = new Favorite({ id_user: user.id, id_quote: newQuote.id });
                newFav.save()
                  .then(() => {
                    res.end();
                  })
                  .catch((err) => {
                    console.log('error saving favorite', err);
                  });
              })
              .catch((err) => {
                console.log('error saving quote', err);
              });
          }
        })
        .catch((err) => {
          console.log('error finding quote', err);
        });
    })
    .catch((error) => {
      console.log('error finding user', error);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!`);
});

