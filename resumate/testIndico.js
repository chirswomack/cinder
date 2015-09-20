var indico = require('indico.io');
indico.apiKey =  '0f8bba7918b42c1375419bfa3eeff3a1';

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }
  
// single example
//  .then(response)
  //.catch(logError);
  
  var batchInput = [
    "my health is good"
  ];
indico.textTags(batchInput, {top_n:3})
  .then(response)
  .catch(logError);