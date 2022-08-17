const express = require("express");
const app = express();
const server = require('https').createServer({
    key: fs.readFileSync('../privatekey.pem'),
    cert: fs.readFileSync('../cert.pem'),
}, app);
const bodyParser = require("body-parser");
const session = require("express-session");
const port = process.env.PORT || 3001;

var session_opt = {
    secret: "Love saves the world",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3 * 60 * 60 * 1000 }
};

app.use(session(session_opt));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let url = "";
let chat = [];


app.get("/share",(req,res) => {
    res.json({url: url});
})

app.post("/share",(req,res) => {
    url = req.body.url;
    console.log(req.body.url);
})

app.post("/user",(req,res) => {
    //req.session.id = req.body.id;
    req.session.name = req.body.name;
    console.log(req.session.name);
})

app.get("/chat",(req,res) => {
    res.json({chat: chat})
})

app.post("/chat",(req,res) => {
    console.log(req.session.name);
    chat.unshift({name: req.session.name,comment: req.body.comment});
    if(chat.length > 15){
        chat.pop();
    }
    res.json({chat: chat});
})

app.listen(port,() => {
    console.log(`listening on *:${port}`);
})