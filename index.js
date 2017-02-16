var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

//mensaje que se va a enviar esto tiene que enviarse desde el dispositivo
var message = { 
  app_id: "931fb13d-4c93-4ade-87be-8d6605c3b2ce",
  contents: {"en": "English Message"},
  include_player_ids: ["1030151e-ee73-47e1-aa0b-7644934ee721" , "02ab9340-28ec-466b-8c73-5ebdb723a4b7","322e1e0c-1dae-48e0-bc44-898d3d57af3e"]
};

//sendNotification(message);


var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic YzM2NDFkODEtNjJmNS00YWQwLWE1MTMtZDEzYjliM2RiODY3"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https');
  var req = https.request(options, function(res) {  
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });
  
  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  
  req.write(JSON.stringify(data));
  req.end();
};





