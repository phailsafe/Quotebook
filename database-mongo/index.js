var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb://heroku_xf5sf6rw:9hrvdilfl32k5gkdrjiapfn1k9@ds041516.mlab.com:41516/heroku_xf5sf6rw");

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  quantity: Number,
  description: String
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;