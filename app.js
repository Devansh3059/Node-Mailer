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
})

app.post('/send', (req, res) => {
    var output = `
    <p>You have new request</p>
    <h3>Contact details</h3>
    <ul>
        <li>Name:${req.body.name}</li>
        <li>Company:${req.body.company}</li>
        <li>Email:${req.body.email}</li>
        <li>Phone:${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    async function main() {

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Devil" <devanshbindlish999@gmail.com>', // sender address
        to: "devanshbindlish9@gmail.com", // list of receivers
        subject: "Contact Details", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('contact',{msg:'email has been sent'})
}
main().catch(console.error);
})

app.listen(5500, function () {
    console.log("Mailer Started");
});