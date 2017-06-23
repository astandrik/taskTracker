
var Sequelize = require('sequelize');

module.exports = function(seq, app) {
   var Task = seq.define("task", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    position: {
      type: Sequelize.INTEGER
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    name: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    }
  });

  app.get("/tasks", function(req, res) {
    Task.findAll({order: '"position" DESC' }).then(data => {
      res.send(JSON.stringify(data));
    });
  });

  app.delete("/task/:id", function(req,res) {
    let id = req.params.id;
      Task.destroy({
        where: {id: id}
      }).then(data => {
        res.send(JSON.stringify(id + " deleted"));
      });
  });

  app.post("/task", function(req, res)  {
    console.log(req.body);
    let task = req.body.task;
    let promise;
    if(task.id) {
      Task.update({
          name: task.name,
          text: task.text,
          active: task.active
        },{where: {id: task.id}}).then((data) => {
        res.send(JSON.stringify(data.id));
      });
    } else {
      let makePromise =  (max) => {
        Task.create({
          name: task.name,
          text: task.text,
          active: true
        }).then((data) => {
          res.send(JSON.stringify(data.id));
        });
      }
      Task.findAll().then(data => makePromise(data.length + 1));
    };
  });
}