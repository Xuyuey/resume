var mongoose = require('mongoose')

var PaperSchema = new mongoose.Schema({
	author: String,
	topic: String,
	year: String,
	journal: String,
	volume: String,
	address: String,
	// meta 更新或录入数据的时间记录
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

PaperSchema.pre('save', function (next) {
	 if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

PaperSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort({'year':'-1'})
		.exec(cb)
	},
	findById: function(id,cb){
		return this
		.findOne({_id: id})
		.exec(cb)
	}
}

module.exports = PaperSchema