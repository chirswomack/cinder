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
					companyName:"",
					description:"",
					location:"",
					email:"",
					industry:"",
					positionType:[],
					applicantsRejected:[],
					applicantsAccepted:[]
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

router.post("/updateProfileApplicant",function(req,res,next){
	applicantModel.findOneAndUpdate({username:req.body.username
							},{fullName:req.body.fullName,
								email:req.body.email,
								age:req.body.age,
								academics:req.body.academics,
								jobHistory:req.body.jobHistory,
								location:req.body.location,
								bio:req.body.bio,
								positionType:req.body.positionType,
								industry:req.body.industry
							},{upsert:true},function(error,data){
								res.send("updateProfileApplicantSuccess")
							});
});

router.post("/updateProfileCompany",function(req,res,next){
	employerModel.findOneAndUpdate({username:req.body.username
							},{
								companyName:req.body.companyName,
								industry:req.body.industry,
								description:req.body.description,
								location:req.body.location,
								email:req.body.email,
								positionType:req.body.positionType
						},{upsert:true},function(error){
							res.send("updateProfileCompanySuccess");
						});
});

router.post("/dashboardInfo",function(req,res,next){
	if (req.body.userType==="applicant"){
		applicantModel.findOne({username:req.body.username},function(error,applicantData){
			// employerModel.find({industry:applicantData.industry,
			// 						positionType:applicantData.positionType},function(err,data){
			// 	console.log(data);
			// })
			employerModel.findOne({industry:applicantData.industry,
									positionType:applicantData.positionType
								}).nin("username",applicantData.companiesRejected)
									.nin("username",applicantData.companiesAccepted)
									.exec(function(error,userData){
				if (userData){
					var employerInfo = {companyName:userData.companyName,
										industry:userData.companyName,
										description:userData.description,
										location:userData["location"],
										positionType:userData.positionType
										}
					res.send(employerInfo);
				}
				else {
					res.send("noMoreMatches");
				}
			});
		});
	}
	else {
		employerModel.findOne({username:req.body.username},function(error,employerData){
			applicantModel.findOne({industry:employerData.industry,
									positionType:{$in:employerData.positionType}
								}).nin("username",employerData.applicantsAccepted)
									.nin("username",employerData.applicantsRejected)
									.exec(function(error,userData){
				if (userData){
					var applicantInfo = {academic:userData.academic,
											jobHistory:userData.jobHistory,
											location:userData["location"],
											bio:userData.bio,
											positionType:userData.positionType,
											industry:userData.industry
										}
					res.send(applicantInfo);
				}
				else {
					res.send("noMoreMatches");
				}
			});
		});
	}
});

router.post("/dashboardSwipeLeft",function(req,res,next){
	if (req.body.userType==="applicant"){
		applicantModel.findOneAndUpdate({username:req.body.username
											},{$push:{companiesRejected:req.body.matchName}
											},function(error){
												res.send("swipeLeftSuccess");
											});
	}
	else {
		employerModel.findOneAndUpdate({username:req.body.username},
										{$push:{applicantsRejected:req.body.matchName}},
										function(error){
											res.send("swipeLeftSuccess");
										});
	}
});

router.post("/dashboardSwipeRight",function(req,res,next){
	if (req.body.userType==="applicant"){
		applicantModel.findOneAndUpdate({username:req.body.username},{
			$push:{companiesAccepted:req.body.matchName}
		},function(error,applicantData){
			employerModel.findOne({username:req.body.username},function(error,matchData){
				if (matchData.applicantsAccepted.indexOf(req.body.username)>-1){
					res.send("emailsSent");
				}
				else {
					res.send("noEmailsSent");
				}
			});
		});
	}
	else {
		employerModel.findOneAndUpdate({username:req.body.username},{
			$push:{applicantsAccepted:req.body.matchName}
		},function(error,employerData){
			applicantModel.findOne({username:matchName},function(error,matchData){
				if (matchData.companiesAccepted.indexOf(req.body.username)>-1){
					res.send("emailsSent");
				}
				else {
					res.send("noEmailsSent");
				}
			})
		});
	}
})

module.exports = router;
