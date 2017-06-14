var config = require("../config");
var express = require("express"),
    app = express(),
    port = config.ports.dbservice;

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

var insertPost = function(name, text) {
  return Post.create({
   name: name,
   text: text
  });
}

var getAllPosts = function() {
  return Post.findAll();
}

var createTables = () => {
  Post.sync({force: true}).then(() => {

  });
}

app.get("/dbcreate", function(req, res) {
  createTables();
  res.send("ok");
})

testConnection(sequelize);
