var express = require('express')
var port = process.env.PORT || 3000
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var dbUrl = 'mongodb://localhost:27017/ning'
var fs = require('fs')
var morgan = require('morgan') 

//models loading
var models_path = __dirname + '/app/models'
var walk = function(path){
    fs
        //对立面的每一层进行Foreach 
        .readdirSync(path)
        .forEach(function(file){
            //拿到一个newPath
            var newPath = path +'/'+ file
            var stat = fs.statSync(newPath)

            //如果他是一个文件 且 是一个js文件
            //就把他加载进来
            if(stat.isFile()) {
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(newPath)
                }
            }
            //否则继续遍历
            else if(stat.isDirectory()){
                walk (newPath)
            }
        })
}
walk(models_path)

app.set('views', path.join(__dirname, 'app/views/pages')) //视图根目录
app.set('view engine','pug') 
app.locals.moment = require('moment'); // 载入moment模块，格式化日期
var connect = require('connect');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)

app.use(cookieParser())
app.use(session({
    secret: 'imooc',
    store:new mongoStore({
        url: dbUrl,
        collection: "sessions"
        
    }),
    resave: false,
    saveUninitialized: true
}))

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/ning',{useMongoClient: true})

var multipart = require('connect-multiparty')
app.use(multipart())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')))
app.listen(port)

require('./config/routes')(app)
console.log('开始监听'+port)