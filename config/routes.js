var Index = require('../app/controllers/index')
var Admin = require('../app/controllers/admin')
var User = require('../app/controllers/user')

module.exports = function(app){
	app.use(function(req,res,next){
        var _user = req.session.user
        app.locals.user = _user
        next()
    })
	
	//Index 前台页面展示
	app.get('/', Index.index);

	//Admin  后台录入数据
	app.get('/admin/paper', User.signinRequired, User.adminRequired, Admin.paperAdd)
	app.get('/admin/patent', User.signinRequired, User.adminRequired, Admin.patentAdd)

	app.get('/admin/paper/update/:id', User.signinRequired, User.adminRequired, Admin.paperUpdate)
	app.get('/admin/patent/update/:id', User.signinRequired, User.adminRequired, Admin.patentUpdate)

	app.post('/admin/paper/new', User.signinRequired, User.adminRequired, Admin.paperPost)
	app.post('/admin/patent/new', User.signinRequired, User.adminRequired, Admin.patentPost)

	app.get('/admin/paper/list', User.signinRequired, User.adminRequired, Admin.paperList)
	app.get('/admin/patent/list', User.signinRequired, User.adminRequired, Admin.patentList)

	app.delete('/admin/paper/list', User.signinRequired, User.adminRequired, Admin.paperDelete)
	app.delete('/admin/patent/list', User.signinRequired, User.adminRequired, Admin.patentDelete)

	//User 用户注册登录
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.post('/user/signin',User.signin)
	app.post('/user/signup',User.signup)
	app.get('/logout', User.logout)
}