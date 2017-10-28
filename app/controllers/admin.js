var mongoose = require('mongoose')
var Paper = require('../models/paper.js')
var Patent = require('../models/patent.js')
var _underscore = require('underscore')

//admin paper page app.get('/admin/paper')
exports.paperAdd = function(req,res){
	res.render('adminPaper',{
		paper:{
			author: '',
			topic: '',
			year:'',
			journal: '',
			volume: '',
			address:''
		}
	})
}

//admin patent page app.get('/admin/patent')
exports.patentAdd = function(req,res){
	res.render('adminPatent',{
		patent:{
			author: '',
			topic: '',
			note: ''
		}
	})
}

//admin update paper app.get('/admin/paper/update/:id')
exports.paperUpdate = function(req, res){
	var id = req.params.id
	if(id){
		Paper.findById(id, function(err, paper){
			res.render('adminPaper',{
				paper: paper
			})
		})
	}
}

//admin update patent app.get('/admin/patent/update/:id')
exports.patentUpdate = function(req, res){
	var id = req.params.id
	if(id){
		Patent.findById(id, function(err, patent){
			res.render('adminPatent',{
				patent: patent
			})
		})
	}
}

//admin post paper app.post('/admin/paper/new'),
exports.paperPost = function (req, res) {
    var id = req.body.paper._id;
    var paperObj = req.body.paper;
    var _paper = null;
    if (id != '') { // 已经存在的电影数据
        Paper.findById(id, function (err, paper) {
            if (err) 
                console.log(err);
            _paper = _underscore.extend(paper, paperObj); 
            _paper.save(function (err, paper) {
                if (err) 
                    console.log(err);
                res.redirect('/admin/paper/list');
            });
        });
    } else {  // 新加的电影
    	console.log(paperObj);
        _paper = new Paper({
            author: paperObj.author,
            topic: paperObj.topic,
            year: paperObj.year,
            journal: paperObj.journal,
            volume: paperObj.volume,
            address: paperObj.address
        });
        _paper.save(function (err, paper) {
            if (err) 
                console.log(err);
            res.redirect('/admin/paper/list');
        });
    }
}

//admin post patent app.post('/admin/patent/new')
exports.patentPost = function (req, res) {
    var id = req.body.patent._id;
    var patentObj = req.body.patent;
    var _patent = null;
    if (id!= '') { // 已经存在的电影数据
        Patent.findById(id, function (err, patent) {
            if (err) 
                console.log(err);
            _patent = _underscore.extend(patent, patentObj); 
            _patent.save(function (err, patent) {
                if (err) 
                    console.log(err);
                res.redirect('/admin/patent/list');
            });
        });
    } else {  // 新加的电影
        _patent = new Patent({
            author: patentObj.author,
            topic: patentObj.topic,
            note: patentObj.note
        });
         _patent.save(function (err, patent) {
            if (err) 
                console.log(err);
            res.redirect('/admin/patent/list');
        });
    }
}

//list page app.get('/admin/paper/list')
exports.paperList = function(req,res){
	Paper.fetch(function(err,papers){
		if (err)
			console.log(err)

		res.render('listPaper',{
			papers: papers,
		})
	})
}

//list page app.get('/admin/patent/list')
exports.patentList = function(req,res){	
	Patent.fetch(function(err,patents){
		if (err)
			console.log(err)
		res.render('listPatent',{
			patents: patents
		})
	})
}

//list page delete app.get('/admin/paper/list')
exports.paperDelete = function(req,res){
	var id = req.query.id

	if(id)
		Paper.remove({_id:id},function(err,paper){
			if(err)
				console.log(err)
			res.json({success:1})
		})
}

//list page delete app.get('/admin/patent/list')
exports.patentDelete = function(req,res){
	var id = req.query.id

	if(id)
		Patent.remove({_id:id},function(err,patent){
			if(err)
				console.log(err)
			res.json({success:1})
		})
}