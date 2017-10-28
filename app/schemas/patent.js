var mongoose = require('mongoose');

var PatentSchema = new mongoose.Schema({
	author: String,
	topic: String,
	note: String,
	meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        },
    }
})

PatentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

PatentSchema.statics ={
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(id,cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
};

module.exports = PatentSchema