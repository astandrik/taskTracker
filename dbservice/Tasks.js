
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
      let updatedObject =
              {
                name: task.name || undefined,
                text: task.text || undefined,
                active: task.active || undefined,
                position: task.position || undefined
              };
      Task.update(updatedObject, {where: {id: task.id}}).then((data) => {
        res.send(JSON.stringify(data.id));
      });
    } else {
      let makePromise =  (max) => {
        Task.create({
          name: task.name,
          text: task.text,
          active: true,
          position: max
        }).then((data) => {
          res.send(JSON.stringify(data.id));
        });
      }
      Task.findAll().then(data => makePromise(data.length + 1));
    };
  });
  return Task;
}