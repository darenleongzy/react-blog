const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesSchema = new Schema({
	image_data: { data: Buffer, contentType : String}
}, {timestamps: true});

mongoose.model('Images', ImagesSchema);