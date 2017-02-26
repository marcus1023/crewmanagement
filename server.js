var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config.js');
var passport = require('passport');
var massive = require('massive');
var connect = massive.connectSync({connectionString: config.connectionString});
var massiveInstance = massive.connectSync({connectionString : config.connectionString})
var app = module.exports = express();
var nodemailer = require('nodemailer');
var router = express.Router();

// controllers required
var mainController = require('./controllers/mainController.js');

app.set('db', massiveInstance);
var db = app.get('db');

var corsOptions = {
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/sayHello', router);

app.use(session({
	secret: config.sessionSecret,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge:(1000*60*60*24*7)
	}
}));

// system API routes
//	app.post('/api/createNewUser', usersCtlr.createNewUser);
//	app.post('/api/authenticate', usersCtlr.authenticate);
//	app.post('/api/addToSubscript', usersCtlr.addToSubscript);
//	app.get('/api/connectUser', usersCtlr.connectUser);
	app.post('/api/serverTest', mainController.serverTest);


	//EMAIL OUTLINE BEGIN
	app.post('/api/contactEmail', function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'marcuslogden@gmail.com', // Your email id
            pass: 'NCCode24' // Your password
        }
    });
		var message = req.body.message
		var name = req.body.name
		var email = req.body.email
		var mailOptions = {
		    from: 'marcuslogden@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'New Excell Infinity Contact!', // Subject line
		    html: '<b>New email from: </b>' + name + '<br><br>' + '<b>Message:</b> ' + message //, // plaintext body
		    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
		};
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.json({yo: 'error'});
		    }else{
		        console.log('Message sent: ' + info.response);
		        res.json({yo: info.response});
		    };
		});
});

//EMAIL OUTLINE ENDED


//CMS get call
app.get('/api/connectCMS', function (req, res) {
	res.send(cms)
})


app.listen(3000, function(){
  console.log('I\'m listening on port 3000');
})
