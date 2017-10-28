var mongoose = require('mongoose')
var User = require('../models/user')

exports.signin = function(req,res){
	var _user = req.body.user;

	var name = _user.name;
	var password = _user.password;
	
	User.findOne({name:name},function(err,user){
		if (err)
			console.log(err)
		if(!user){
			return res.redirect('/signup')
		}
		
		user.comparePassword(password,function(err,isMatch){
			if (err)
				console.log(err)
			if(isMatch){
				console.log('isMatch')
				req.session.user = user;
				return res.redirect('/')
			}else{
				return res.redirect('/signin')
			}
		})
	})
}

exports.signup = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if (err)
			console.log(err)
		if(user){
			return res.redirect('/signin')
		}

		var user = new User(_user);
		user.save(function(err,user){
			if(err)
				console.log(err)
			res.redirect('/')
		})
	})
}

exports.showSignin = function(req,res){
	res.render('signin')
}

exports.showSignup = function(req,res){
	res.render('signup')
}

exports.logout = function(req,res){
	delete req.session.user
	res.redirect('/')
}

//查看用户权限
exports.signinRequired = function(req, res, next){
    var user = req.session.user

    if(!user){
        return res.redirect('/signin')
    }
    next()//进行下一步操作
}

exports.adminRequired = function(req, res, next){
    var user = req.session.user

    if(user.role <= 10){
        return res.redirect('/signin')
    }
    next()
}