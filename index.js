const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
const serviceAccount = require("./auth-key.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crmwebform-546ae.firebaseio.com"
});

const db = firebaseApp.firestore();

const app = express();
app.use(bodyParser());
app.use(cors());

app.get('/', function (req, res) {
  res.send("Hello world");
})

app.post('/addContact', (req, res) => {

  const collectionRef = db.collection(req.body.formName);

  const insertData = collectionRef.doc(req.body.Email).set(req.body);

  insertData.then(result => {

    //send mail 
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '587',
      auth: {
        user: 'dalvikcache369@gmail.com',
        pass: 'chintanzxc2'
      },
      secureConnection: 'false',
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

      }
    });

    var mailOptions = {
      from: 'dalvikcache369@gmail.com',
      to: req.body.Email,
      subject: 'Thanks, form submitted successfully',
      text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send('success');
  }).catch((err) => {
    throw (err);
  })

})

app.listen('3001', () => {
  console.log("server is listenting to port 3001");
})