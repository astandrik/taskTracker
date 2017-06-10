var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000
  ,https = require('https'),
  http = require('http'),
  fs= require('fs');
  var path = require('path');
const sequelize = require("./db.js");
const bodyParse = require('./bodyParse');

function testConnection(sequelize) {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

https.createServer({
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem')
 }, app).listen(port,function () {
   console.log('Listening on port ', port)
 });


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

app.post("/api/matches", function(req,res) {
  if(!req.body.name1 || !req.body.name2) res.send("Incorrect data");
  sequelize.insertMatch(req.body.name1,req.body.name2);
  res.send("Inserted");
});


app.get('/api/2chposts', function(req, ress) {
  var req = https.get('https://2ch.hk/b/', function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));

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

app.get("/api/insertRandom", function(req,res) {
  sequelize.insertMatch(randomString(20),randomString(20));
  res.send("Inserted");
});

app.get("/api/matches", function(req,res) {
  sequelize.getAllMatches().then(result => res.send(result));
});

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/api/dbcreate', function(req,res) {
  sequelize.createTables();
  res.send("ok");
});



testConnection(sequelize.dbConn);
