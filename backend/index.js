const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

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