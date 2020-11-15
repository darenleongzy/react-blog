const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdminSchema = new Schema({
	username: String,
	password: String,
}, {timestamps: true});

AdminSchema.methods.toJSON = function() {
	return {
		_id: this._id,
		username: String,
		password: String,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	};
};

mongoose.model('Admin', AdminSchema);