var config = require("../config");
var express = require("express"),
    app = express(),
    port = config.ports.dbservice;
var jwt    = require('jsonwebtoken'),
    Tasks = require("./Tasks");

app.listen(port, () => {
  console.log("db service listening on " + port);
});
var Sequelize = require('sequelize');

var seq = new Sequelize('whowin', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

    });

var sequelize = seq;

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



var User = seq.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});



var Token = seq.define("token", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: Sequelize.STRING
  }
});


var insertToken = function(token) {
  return Token.create( {
    token
  });
}

var checkT = function(token) {
  return Token.findAll({
    where: {
      token: token
    }
  })
}

var getAllPosts = function() {
  return Post.findAll();
}

var createTables = () => {
  Post.sync({force: true}).then(() => {

  });
  User.sync({force: true}).then(() => {
    User.create({
      name: "Admin",
      password: "123"
    })
  });
  Token.sync({force: true}).then(() => {

  });
  Task.sync({force: true}).then(() => {

  });
}

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

Tasks(seq, app);


app.get("/dbcreate", function(req, res) {
  createTables();
  res.send("ok");
});


app.post("/checkToken", function(req,res) {
  var token = req.body.token;
  checkT(token).then((data) => {
    if(data.length > 0) {
      res.send("valid");
    } else {
      res.send("invalid");
    }
  })
})

app.post("/verifyLogin", function(req,res) {
  let user = req.body;
  User.findAll({
    where: {
      name: user.name,
    },
    attributes: ["password"]
  }).then(data => {
    if(data.length == 1) {
      if(data[0].password == user.password) {
        const payload = {
          name: user.name
        }
        const token = jwt.sign(payload, "kokojaja"); //здесь создается JWT
        insertToken(token);
        res.send(token);
      } else {
        res.send("Invalid password");
      }
    } else {
      res.send("Invalid login");
    }
  })
})

testConnection(sequelize);
