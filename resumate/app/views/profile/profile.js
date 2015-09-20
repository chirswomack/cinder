var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var viewModule = require("ui/core/view");
var page;

var pageData = new observableModule.Observable({
    inputFields: new observableArrayModule.ObservableArray([
        { name: "name", helpText: "Jane Doe" },
        { name: "email", helpText: "example@mit.edu" },
        { name: "age", helpText: "19"},
        { name: "academic", helpText: "Highest Institution Attended"},
        { name: "jobHistory", helpText: "Intern at Google"},
        { name: "location", helpText: "Cambridge, MA"},
        { name: "bio", helpText: "Tell us about yourself"},
        { name: "industry", helpText: "Software"}
    ])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};