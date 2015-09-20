var fetchModule = require("fetch");
var observableModule = require("data/observable");

function User(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new observableModule.Observable({
		username: info.username || "",
		password: info.password || "",
		userType: info.userType || ""
	});

	viewModel.signUp = function() {
		return fetchModule.fetch("localhost:3000/signUp", {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify({
		    	username: viewModel.get('username'),
		    	password: viewModel.get('password'),
		    	//userType: viewModel.get('userType')
		    });
		}).then(function (r) { return r.json(); }).then(function (r) {
		    alert(result);
		}, function (e) {
		    alert("Error occurred " + e);
		});
	};
};