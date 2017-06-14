var config = require("../config");
var express = require('express')
  , app = express()
  , port = config.ports.app
  ,https = require('https'),
  http = require('http'),
  fs= require('fs');
  var path = require('path');
const bodyParse = require('./bodyParse');

app.listen(port, () => {
  console.log("listening on " + port);
})

var fs = require("fs");

app.get("/getfile", (req,res) => {
  let content = fs.readFileSync(path.join(__dirname + "/db.js")).toString();
  res.send(content);
})


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

function randomString(len) {
 var str = [];
 return Array.apply(null, new Array(len)).map(x => String.fromCharCode((Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)+1) + 'a'.charCodeAt(0)))).join('');
}

app.use(express.static(path.join(__dirname + '/../dist')));


app.post("/api/post", function(req, res) {
  console.log(req.body);
  res.send("sosi");
})


app.get('/api/proposed', function(req, ress) {
  var req = https.get('https://2ch.hk/b/', function(res) {
    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      var posts = bodyParse(body.toString());
      ress.send(posts);
      // ...and/or process the entire body here.
    })
  });
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
});



app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/api/dbcreate', function(req,ress) {
  http.get("http://127.0.0.1:" + config.ports.dbservice + "/dbcreate", function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      console.log(body);
      ress.send("db created\n");
    });
    res.on("error", function(e) {
      ress.send(e);
    })
  });
});


