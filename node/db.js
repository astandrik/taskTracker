var Sequelize = require('sequelize');
var seq = new Sequelize('whowin', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },

    });

var Match = seq.define('match', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
     autoIncrement: true
  },
  name1: {
    type: Sequelize.STRING
  },
  name2: {
    type: Sequelize.STRING
  }
});

var insertMatch = function(name1, name2) {
  return Match.create({
   name1: name1,
   name2: name2
  });
}

var getAllMatches = function() {
  return Match.findAll();
}

var createTables = () => {
  Match.sync({force: true}).then(() => {

  });
}


module.exports =  {
  dbConn: seq,
  createTables: createTables,
  insertMatch: insertMatch,
  getAllMatches: getAllMatches
}
