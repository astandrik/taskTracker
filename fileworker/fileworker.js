let express = require("express"),
  app = express(),
  fs = require("fs"),
  config = require("../config"),
  port = config.ports.fileworker;

app.listen(port, function() {
  console.log("fileworker listening on port " + port);
});

app.get("/dir", function(req, res) {
  fs.readdir("./", (err, files) => {
    if(err) {
      res.status(500);
      res.send(err);
    } else {
      res.send(files.toString());
    }
  });
});

app.get("/dir/:filename", function(req, res) {
  fs.readFile(req.params.filename, "utf8", (err, data) => {
    if(err) {
      res.status(500);
      res.send(err);
    } else {
      res.send(data.toString());
    }
  })
});