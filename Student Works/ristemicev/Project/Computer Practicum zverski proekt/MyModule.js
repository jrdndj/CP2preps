const mongoose = require('mongoose');
const url = "mongodb+srv://ristemicev:admin@cluster-wjyl3.mongodb.net/livechat?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    fullname: String,
    password: String,
    gender: Number,
});

exports.accReg = function (email, fullname, password, gender) {
    var Acc = mongoose.model('Register', userSchema)
    var acc = new Acc({ email: email, fullname: fullname, password: password, gender: gender })
    acc.save()
    console.log("Acc registered")
};
exports.getAcc = async function (email) {
    var Acc = mongoose.model('Register', userSchema)
    var query = Acc.find({ email: email })
    var register = await query.exec()
    return register;
    
};

