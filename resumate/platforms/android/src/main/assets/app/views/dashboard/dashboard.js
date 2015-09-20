var http = require("http");
var info = [];

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    var result;
	http.request({
	    url: "http://10.0.3.2:3000/dashboardInfo",
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    content: JSON.stringify({ username: "Smith", userType: "applicant" })
	}).then(function (response) {
	    result = response.content;
	    if (result === "noMoreMatches") {
	    	alert("Sorry, we can't find any matches for you at this time.");
	    } else {
	    	for (var i in result) {
	    		info.push(result[i]);
	    	}
	    	console.log(info);
	    }
	}, function (e) {
	    alert("Error occurred " + e);
	});
}