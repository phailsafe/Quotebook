var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  name: {type: String, unique: true},
  password: String
});
var User = mongoose.model('User', userSchema);

var quoteSchema = mongoose.Schema({
  text: String,
  author: String,
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
var Quote = mongoose.model('Quote', quoteSchema);

var favoriteSchema = mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id_quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }
});
var Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports.User = User;
module.exports.Quote = Quote;
module.exports.Favorite = Favorite;

// to connect to database shell:
// mongo ds041516.mlab.com: 41516 / heroku_xf5sf6rw - u heroku_xf5sf6rw - p 9hrvdilfl32k5gkdrjiapfn1k9
