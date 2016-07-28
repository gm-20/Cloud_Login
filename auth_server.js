var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
require('./models/users_model.js');
//var conn = mongoose.createConnection('mongodb://localhost/myapp');
mongoose.connect('mongodb://gm:gm@ds027165.mlab.com:27165/test20');
var app = express();
app.engine('.html',require('ejs').__express);
app.set('views',__dirname + '/views');
app.set('view engine','html');
app.use(bodyParser());
app.use(function(req,res,next){
	res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
	next();
});
app.use(cookieParser());
app.use(session({
	secret: 'SECRET',
	cookie: {maxAge: 60*60*1000},
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'sessions'
		
	})
}));
require('./routes.js')(app);
var port = process.env.PORT || 8080;
app.listen(port);
