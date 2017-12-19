const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  name: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

const quoteSchema = mongoose.Schema({
  text: String,
  author: String,
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Quote = mongoose.model('Quote', quoteSchema);

const favoriteSchema = mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id_quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
});
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports.User = User;
module.exports.Quote = Quote;
module.exports.Favorite = Favorite;

// to connect to database shell:
// mongo ds041516.mlab.com:41516/heroku_xf5sf6rw -u heroku_xf5sf6rw -p 9hrvdilfl32k5gkdrjiapfn1k9
