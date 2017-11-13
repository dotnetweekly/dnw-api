var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var memberNameValidator = [
    function (val) {
        return (val.length > 0 && val.toLocaleLowerCase() != 'none')
    },
    // Custom error text...
    'Select a valid member name.' ];

var requiredStringValidator = [
    function (val) {
        var testVal = val.trim();
        return (testVal.length > 0)
    },
    // Custom error text...
    '{PATH} cannot be empty' ];

var linkSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    content: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    url: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    image: {
        type: String,
        required: true,
        validate: requiredStringValidator },
    upvotes: {
        type: Number,
        required: true,
        default: 0 },
    createdOn: { type: Date, default: Date.now }
});

// Export model...
module.exports = mongoose.model( 'Link', linkSchema );
