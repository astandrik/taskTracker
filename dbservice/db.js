var config = require("../config");
var express = require("express"),
    app = express(),
    port = config.ports.dbservice;
var jwt    = require('jsonwebtoken');

app.listen(port, () => {
  console.log("db service listening on " + port);
});
var Sequelize = require('sequelize');

var seq = new Sequelize('whowin', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,

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


var Post = seq.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  }
});

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

var Task = seq.define("task", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  }
})

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

var insertPost = function(name, text) {
  return Post.create({
   name: name,
   text: text
  });
}

var insertToken = function(token) {
  return Token.create( {
    token
  });
}

var checkT = function(token) {
  console.log(token);
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

app.get("/dbcreate", function(req, res) {
  createTables();
  res.send("ok");
});

app.get("/tasks", function(req, res) {
  Task.findAll().then(data => {
    res.send(JSON.stringify(data));
  })
})

app.post("/task", function(req, res)  {
  let task = req.body.task;
  Task.create({
    name: task.name,
    text: task.text
  }).then((data) => {
    res.send(JSON.stringify(data.id));
  });
})

app.post("/checkToken", function(req,res) {
  var token = req.body.token;
  console.log("checking token on request: dbservice");
  console.log(token);
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
  console.log("asking db to auth ", user);
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
