var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var applicantSchema = mongoose.Schema({
	username:String,
	password:String,
	fullName:String,
	email:String,
	age:Number,
	academics:String,
	jobHistory:String,
	location:String,
	bio:String,
	positionType:String,
	industry:String,
	companiesRejected:[String],
	companiesAccepted:[String]
});

var employerSchema = mongoose.Schema({
	username:String,
	password:String,
	companyName:String,
	description:String,
	location:String,
	email:String,
	positionType:[String],
	applicantsRejected:[String],
	applicantsAccepted:[String]
})

var applicantModel = mongoose.model("applicant",applicantSchema);
var employerModel = mongoose.model("employer",employerSchema);

exports.applicantModel = applicantModel;
exports.employerModel = employerModel;
