let express = require("express"),
    app = express(),
    config = require("../config"),
    http = require("http");

app.listen(config.ports.auth, function() {
  console.log("Auth service listening on " + config.ports.auth);
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post("/checkToken", function(req,ress) {
  console.log("checking token on request: auth");
  var token = req.body.token;
  console.log(token);
  let options = {
    port: config.ports.dbservice,
    headers: {
      "Content-Type": "application/json"
    },
    path: "/checkToken",
    method: "POST"
  }
  console.log("request db for token check");
  let request = http.request(options, function(res) {
    let chunks = "";
    if(res.statusCode !== 200) {
      ress.status(500).send("Error");
    }
    res.on("data", function(chunk) {
      chunks+=chunk;
    });
    res.on("end", function() {
      ress.send(chunks.toString());
    })
  });
  request.write(JSON.stringify({token}));
  request.end();
})


app.post("/login", function(req, ress) {
  let body = req.body;
  console.log("trying to auth ", body);
  let options = {
    port: config.ports.dbservice,
    headers: {
      "Content-Type": "application/json"
    },
    path: "/verifyLogin",
    method: "POST"
  }
  let request = http.request(options, function(res) {
    let chunks = "";
    res.on("data", function(chunk) {
      chunks+=chunk;
    });
    res.on("end", function() {
      ress.send(chunks.toString());
    })
  });
  request.write(JSON.stringify(body));
  request.end();
})