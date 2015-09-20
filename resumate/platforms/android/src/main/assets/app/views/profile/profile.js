var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var viewModule = require("ui/core/view");
var page;

var pageData = new observableModule.Observable({
    inputFields: new observableArrayModule.ObservableArray([
        { name: "Full Name", helpText: "Jane Doe" },
        { name: "Email", helpText: "example@mit.edu" },
        { name: "Age", helpText: "19"},
        { name: "Academic", helpText: "Highest Institution Attended"},
        { name: "Last Job", helpText: "Intern at Google"},
        { name: "Location", helpText: "Cambridge, MA"},
        { name: "Bio", helpText: "Tell us about yourself"},
        { name: "Industry", helpText: "Software"}
    ])
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};