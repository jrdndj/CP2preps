//require the express module
const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
const loginRouter = require("./route/loginRoute");
const bcryptjs = require('bcryptjs');
const myModule = require('./myModule');
var mongoose = require('mongoose');
global.userr = "Anonymous";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html")

})

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/register.html', (req, res) => {
  res.sendFile(__dirname + "\\register.html")
})
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + "\\login.html")
})
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + "\\index.html")
})
app.get('/livechat.html', (req, res) => {
  res.sendFile(__dirname + "\\livechat.html")
})
app.get('/aboutus.html', (req, res) => {
  res.sendFile(__dirname + "\\aboutus.html")
})
app.get('/test.html', (req, res) => {
  res.sendFile(__dirname + "\\test.html")
})



app.post("/register", async (req, res) => {
  let email = req.body.email;
  let fullname = req.body.fullname;
  const hashedPassword = await bcryptjs.hash(req.body.password, 10) 
  let password = hashedPassword;
  let gender = req.body.gender;
  console.log("email: " + email + " name: " + fullname + " password: " + password + "gender: " + gender );
  myModule.accReg(email, fullname, password, gender);
  res.redirect('/login.html');
});

app.post("/login", async (req, res) => {
    const user = await myModule.getAcc(req.body.email)
    if (user == null) {
        return res.status(400).send("cannot find user")
    }
    try {
      bcryptjs.compare(req.body.password, user[0].password, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
           console.log("Incorrect Password!")
        } else {
          console.log("Password matches!")
          global.userr = user[0].fullname;
          res.redirect("livechat.html")
        }
      })
    } catch {
      console.log("u fail")
        res.status(500).send()
    }
});


app.get('/get-user', (req, res) => {
  console.log('i receive a GET request');
  if (global.userr === undefined){
    var tryFetch = {myString: "Anonymous"};
   }else {
    var tryFetch = {myString: global.userr};
  }
  res.json(tryFetch)
})

//require the http module
const http = require("http").Server(app);

// require the socket.io module
const io = require("socket.io");

const port = process.env.PORT || 5000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter);

//set the express.static middleware
app.use(express.static(__dirname + "/public"));

//integrating socketio
socket = io(http);

//database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");

//setup event listener
socket.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);

    //broadcast message to everyone in port:8080 except yourself.
    socket.broadcast.emit("received", { message: msg, sender: global.userr });

    //save chat to the database
    connect.then(db => {
      console.log("connected correctly to the server");
      let chatMessage = new Chat({ message: msg, sender: global.userr });

      chatMessage.save();
    });
  });
});


http.listen(port, () => {
  console.log("Running on Port: " + port);
});