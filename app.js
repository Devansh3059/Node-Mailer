var express = require("express");
var app = express();
var exphps = require('express-handlebars');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')


//View Engine
app.engine('handlebars', exphps());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//

app.get("/", function (req, res) {
    res.render("contact", { layout: false });
});

app.listen(5500, function () {
    console.log("Mailer Started");
});