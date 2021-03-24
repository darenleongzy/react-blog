const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesSchema = new Schema({
	imagePath: String,
}, {timestamps: true});

ImagesSchema.methods.toJSON = function() {
	return {
		_id: this._id,
		imagePath: this.imagePath,
	};
};
mongoose.model('Images', ImagesSchema);