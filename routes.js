var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
	var users = require('./controllers/users_controller.js');
	app.use('/static',express.static('./static')).
	use('/lib',express.static('../lib'));

	app.get('/',function(req,res){
		if(req.session.user){
			res.render('index',{username: req.session.username,msg: req.session.msg});
		}else{
			req.session.msg = "Access Denied!!!!";
			res.redirect('/login');
		}
	});

	app.get('/user',function(req,res){
		if(req.session.user){
			res.render('user',{msg:req.session.msg,username: req.session.username,email:req.session.email,color:req.session.color});
		}else{
			req.session.msg = 'Access Denied!!!!';
			res.redirect('/login');
		}
	});

	app.get('/signup',function(req,res){
		if(req.session.user){
			res.redirect('/');
		}
		res.render('signup',{msg: req.session.msg});
	});

	app.get('/login',function(req,res){
		if(req.session.user){
			res.redirect('/');
		}
		res.render('login',{msg: req.session.msg});
	});

	app.get('/logout',function(req,res){
		req.session.destroy(function(err){
			console.log('Session Destroyed');
		});
			res.redirect('/login');
	});
	app.post('/signup',users.signup);
	app.post('/user/update',users.updateUser);
	app.post('/user/delete',users.deleteUser);
	app.post('/login',users.login);
	app.get('/user/profile/',users.getUserProfile);
}