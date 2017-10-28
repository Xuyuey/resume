var mongoose = require('mongoose')
var Paper = require('../models/paper.js')
var Patent = require('../models/patent.js')

//index page
exports.index = function(req,res){
	Paper.fetch(function(err,papers){
		if (err)
			console.log(err)
		Patent.fetch(function(err,patents){
			if (err)
				console.log(err)
			res.render('index',{
				y:3000,
				bio1:'I am a Professor and Associate Dean of School of University of Science and Technology Beijing (USTB), IEEE Senior Member, Founder and Chair of Cybermatics and Cyberspace International Science and Technology Cooperation Base, Co-Founder and Co-Chair of IEEE Systems, Man, and Cybernetics Society Technical Committee on Cybermatics, Co-Founder and Vice Chair of IEEE Computational Intelligence Society Emergent Technologies Technical Committee Task Force on Smart Word. ',
				bio2:'My research interests include Cybermatics, Internet of Things, Cyber-Physical Social Systems. I received the PhD. degree  from Beihang University in 2001. From 2002 to 2003, I worked in Aisino Co. From 2004 to 2013, I worked as a post-PhD, and then an associate professor in School of Electronic and Information Engineering, Beihang University. From 2013, I worked as a professor and vice dean in School of Computer & Communication Engineering, University of Science & Technology Beijing. ',
				bio3:'I has presided over many research projects including Natural Science Foundation of China (NSFC: 60879025, 61079019, 6131030602, 61471035), National High Technology Research and Development Program of China (863 Project), etc. I has published more than 70 journal/conference papers at Computer, IEEE Transactions on Parallel and Distributed Systems, IEEE Intelligent Systems, IEEE Transactions on Information Forensics and Security, IEEE Transactions on Industrial Informatics, IEEE Transactions on Smart Grid, IEEE Communications Letters, and IEEE Sensors Journal, etc. I has authored 2 books on Internet of Things.',
				bio4:'I serves as an associate editor of IEEE Systems Journal(2013-), IEEE Internet of Things Journal(2014-), and International Journal of Communication Systems(2013-),  KSII Transactions on Internet and Information Systems(2016); Guest Editor for Computer Journal, Science China Information Science, Journal of Universal Computer Science and IEEE Sensors Journal, IEEE Internet of Things Journal, and IEEE Access.',
				papers: papers,
				patents: patents
			})
		})
	})
}