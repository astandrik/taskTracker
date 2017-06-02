var express = require('express')
  , app = express()
  , port = process.env.PORT || 3000;
  var path = require('path');

app.use(express.static(path.join(__dirname + '/../dist')));

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/../index.html'));
})

app.listen(port, function () {
  console.log('Listening on port ', port)
})