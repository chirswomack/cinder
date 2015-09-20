var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var viewModule = require("ui/core/view");
var frameModule = require("ui/frame");
var fetchModule = require("fetch");
var http = require("http");
var username;
var password;
var userType;

var pageData = new observableModule.Observable();
pageData.set("index", 0);
pageData.set("userTypes", ["Applicant", "Employer"]);

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = pageData;
    username = viewModule.getViewById(page, "username");
	password = viewModule.getViewById(page, "password");
};

exports.signUp = function(args) {
	var topmost = frameModule.topmost();
	var selectedIndex = pageData.get("index");
	var userType;
	if (selectedIndex === 0) {
		userType = "applicant";
	} else {
		userType = "employer";
	}
	var result;
	http.request({
	    url: "http://10.0.3.2:3000/signUp",
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    content: { username: username.text, password: password.text, userType: userType }
	}).then(function (response) {
	    result = response.content;
	    if (result === "signUpFailure") {
	    	alert("An error occurred. Please try again.");
	    } else {
	    	topmost.navigate("views/profile/profile");
	    }
	}, function (e) {
	    alert("Error occurred " + e);
	});
};