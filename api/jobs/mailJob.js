const nodemailer = require("nodemailer");
const path = require('path');
const moment = require('moment-timezone');
moment.tz.setDefault("Europe/Berlin");

const dbParams = require('./../services/databaseConnector');
let collection;

moment.locale('de');
//let time = moment('21/02/2021 14:18:00', "DD/MM/YYYY hh:mm:ss").format();
let time = moment().add(5, "seconds").format();

(async function () {
    // Use connect method to connect to the server
    await dbParams.client.connect();
    const db = dbParams.client.db(dbParams.dbName)
    collection = await db.collection('participants');
})();


setInterval(async function () {
    if(time == moment().format()){
        await sendMail();
    }
}, 998);

async function sendMail () {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    let data = await collection.find({}).toArray();
    data.forEach(async (recipient)=>{
        if(recipient.email && recipient.email.length > 0){
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false, // true for 465, false for other ports
                auth: {
                user: '936c8c256dc1fa', // generated ethereal user
                pass: 'eeab8dca74eb56', // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: recipient.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: message, // plain text body
                html: htmlMessage, // html body
                tls:{
                    rejectUnauthorized: false
                }
            });
        }
    })
}

let htmlMessage = `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
      <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
      <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
      <p>Now send your email using our fake SMTP server and integration of your choice!</p>
      <p>Good luck! Hope it works.</p>
    </div>
    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`

let message = `Congrats for sending test email with Mailtrap!

Inspect it using the tabs above and learn how this email can be improved.
Now send your email using our fake SMTP server and integration of your choice!

Good luck! Hope it works.`
