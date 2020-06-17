const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://ristemicev:admin@cluster-wjyl3.mongodb.net/livechat?retryWrites=true&w=majority";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect; 