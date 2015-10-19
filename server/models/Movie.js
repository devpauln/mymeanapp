// Initialize
var mongoose 	= require('mongoose');

// Create the Movie Schema
var MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

// Export the Model Schema
module.exports = MovieSchema;