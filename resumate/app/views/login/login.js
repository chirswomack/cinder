var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var http = require("http");
var page;
var loginUsername;
var loginPassword;

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/signup/signup");
};

exports.login= function() {
	var topmost = frameModule.topmost();
    var result;
	http.request({
	    url: "http://10.0.3.2:3000/login",
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    content: { username: loginUsername.text, password: loginPassword.text }
	}).then(function (response) {
	    result = response.content.toJSON();
	    var userType;
	    var navigationEntry;
	    if (!result.isUser) {
	    	alert("Something wrong. Don't have an account? Sign Up")
	    } else {
	    	userType = result.userType;
	    	navigationEntry = {
	    		moduleName: "views/dashboard/dashboard",
	    		context: {username: loginUsername.text, userType: userType}
	    	};
	    	topmost.navigate(navigationEntry);
	    }
	}, function (e) {
	    alert("Error occurred" + e);
	});
};

exports.loaded = function(args) {
	page = args.object;
	loginUsername = viewModule.getViewById(page, "login-username");
	loginPassword = viewModule.getViewById(page, "login-password");	
}