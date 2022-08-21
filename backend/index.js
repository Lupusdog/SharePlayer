const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
// const session = require("express-session");
/*const fs = require("fs");
const https = require("https");
const server = https.createServer({
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./cert.pem'),
}, app);*/

/*app.set("trust proxy", 1);

var session_opt = {
    secret: "Love saves the world",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
};

app.use(session(session_opt));*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../frontend/build")));


let url = "";
let time = 0;
let chat = [];


app.get("/share",(req,res) => {
    res.json({url: url, time: time});
});

app.post("/share",(req,res) => {
    url = req.body.url;
    time = req.body.time;
    console.log("success")
});

app.post("/user",(req,res) => {
    res.cookie("name", req.body.name, {
        httpOnly: false,
        maxAge: 3 * 60 * 60 * 1000 
    })

    res.json({});
});

app.get("/chat",(req,res) => {
    res.json({chat: chat})
});

app.post("/chat",(req,res) => {
    chat.unshift({name: req.cookies.name,comment: req.body.comment});
    if(chat.length > 15){
        chat.pop();
    }
    res.json({chat: chat});
});

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend/build/index.html"));
});

app.listen(port,() => {
    console.log(`listening on *:${port}`);
})