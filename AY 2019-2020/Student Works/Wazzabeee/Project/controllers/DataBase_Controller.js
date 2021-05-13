var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);//to avoid deprecation warning when using FindOneAndUpdate 
//see here : https://mongoosejs.com/docs/deprecations.html#findandmodify

//create a Mongoose schema (blueprint)
var playersSchema = new mongoose.Schema({
    flag: String,
    name: String,
    wins: Number

});
//we define a model for the schema
var Players = mongoose.model('Players', playersSchema);

//we define functions that will act on the database
var methods = {};
//retrieve all players from DB
methods.GetPlayersFromDB = function(res) {
    Players.find({},function(err, data){
        if(err) throw err;
        res.render('dynamic_leaderboard', {PlayersList: data}); //render leaderboard page with players data from DB
    }).sort( {wins: -1} ); //wins decreased order
};

//add new player to DB after win
methods.PushPlayerToDB = function(username) {
    if(username != undefined && username != "") {
        Players.find({name:username}).exec(function(err,searched){
            if (err) { throw err; }
            else {
                if(searched.length != 0) { //if player's already in DB
                    var oldWin = parseInt(searched[0].wins);
                    oldWin = oldWin + 1;
                    var newWin = oldWin.toString();

                    //Model.findOneAndUpdate(   conditions,       update,        options,        callback)
                    Players.findOneAndUpdate({name: username}, {wins: newWin}, {new: true}).exec(function(err,doc) {
                        if (err) { throw err; }
                        else  {console.log("Player's wins updated in DB"); }
                    });
                } else { // player's not in DB so we add him
                    Players({flag: 'flag flag-fr', name: username, wins: '1'}).save(function(err){
                        if(err) { throw err; }
                        else { console.log('Player added to DB'); }
                    });
                }
            }
        });
    }
    
};
exports.data = methods; //we export the two methods to use them outside of the scope of this file