const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stringValidate = require('../validations/strings.validate');
const crypto = require('crypto');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: stringValidate.requiredStringValidator
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	subscribed: {
		type: Boolean,
		required: true,
		default: true
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	},
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: Date.now },
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	guid: {
		type: String,
		required: true
	},
	resetEmail: {
		type: String,
		required: true
	},
	resetPassword: {
		type: String,
		required: true
	}
});

userSchema
	.virtual('password')
	.set(function(password) {
		this.salt = crypto.randomBytes(32).toString('base64');
		this.hashedPassword = this.encryptPassword(password, this.salt);
	})
	.get(function() {
		return this.hashedPassword;
	});

userSchema.methods.encryptPassword = function(password, salt) {
	return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

userSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password, this.salt) === this.hashedPassword;
};

userSchema.methods.toJSON = function() {
	let obj = this.toObject();
	delete obj.hashedPassword;
	delete obj.__v;
	delete obj.salt;
	return obj;
};

module.exports = userSchema;
