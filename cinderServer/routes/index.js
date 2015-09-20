var express = require('express');
var router = express.Router();
var models = require("../models/cinder_models.js");
var applicantModel = models.applicantModel;
var employerModel = models.employerModel;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signUp', function(req, res, next) {
	console.log(typeof req.body);
	applicantModel.findOne({username:req.body.username},function(error,userData){
		if (userData) {
			res.send("signUpFailure");
		}
		else {
			if (req.body.userType==="applicant") {
				var newApplicantModel = new applicantModel({
					username:req.body.username,
					password:req.body.password,
					fullName:"",
					email:"",
					age:0,
					academics:"",
					jobHistory:"",
					location:"",
					bio:"",
					positionType:"",
					industry:"",
					companiesRejected:[],
					companiesAccepted:[]
				});
				newApplicantModel.save(function(error){
					res.send("signUpSuccess");
				});
			}
			else {
				var newEmployerModel = new employerModel({
					username:req.body.username,
					password:req.body.password,
					companyName:String,
					description:String,
					location:String,
					email:String,
					positionType:[String],
					applicantsRejected:[String],
					applicantsAccepted:[String]
				});
				newEmployerModel.save(function(error){
					res.send("signUpSuccess");
				});
			}
		}
	})
})

router.post("/login",function(req,res,next){
	applicantModel.findOne({username:req.body.username,password:req.body.password},function(error,applicantData){
		employerModel.findOne({username:req.body.username,password:req.body.password},function(error,employerData){
			if (applicantData){
				res.send({isUser:true,userType:"applicant"});
			}
			else if (employerData){
				res.send({isUser:true,userType:"employer"});
			}
			else {
				res.send({isUser:false,userType:""});
			}
		});
	});
});
module.exports = router;
