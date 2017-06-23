let express = require("express"),
    app = express(),
    config = require("../config"),
    httpHelper = require("../httpHelper");

app.listen(config.ports.auth, function() {
  console.log("Auth service listening on " + config.ports.auth);
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/checkToken", function(req,ress) {
  var token = req.body.token;
  let options = {
    port: config.ports.dbservice,
    headers: {
      "Content-Type": "application/json"
    },
    path: "/checkToken",
    method: "POST"
  }
  httpHelper.makeRequest(options,{token}).then(data => {
      ress.send(data.toString());
  });
})


app.post("/login", function(req, ress) {
  let body = req.body;
  let options = {
    port: config.ports.dbservice,
    headers: {
      "Content-Type": "application/json"
    },
    path: "/verifyLogin",
    method: "POST"
  };
  httpHelper.makeRequest(options, body).then(data => {
      ress.send(data.toString());
  })
})