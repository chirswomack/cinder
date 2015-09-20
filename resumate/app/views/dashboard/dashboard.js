var http = require("http");

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
    var result;
	http.request({
	    url: "http://10.0.3.2:3000/dashboardInfo",
	    method: "POST",
	    headers: { "Content-Type": "application/json" },
	    content: { username: page.navigationContext.username, userType: page.navigationContext.userType }
	}).then(function (response) {
	    result = response.content;
	    var info = [];
	    if (result === "noMoreMatches") {
	    	alert("Sorry, we can't find any matches for you at this time.");
	    } else {
	    	for (var i in result) {
	    		info.push(result[i]);
	    	}
	    }
	}, function (e) {
	    alert("Error occurred " + e);
	});
}