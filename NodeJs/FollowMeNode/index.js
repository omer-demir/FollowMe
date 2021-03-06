var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var config = require("./config");
var mongoose = require("mongoose");

var app = express();

var http = require("http").Server(app);

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.set("superSecret", config.secret);

app.use(express.static(__dirname + "/public"));

var api = require("./app/api")(app, express);

app.use("/api", api);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/app/views/index.html");
});

http.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port " + config.port);
    }
});
 