
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

  app.post("/task/position", (req, res) => {
    let id = req.body.id,
        position = (req.body.position-1);
    Task.findAll().then(data => {      
      let sorted = data.sort((a,b) => a.position - b.position).filter(x => x.id !== id);
      let newPositionedIds = [];
      let i = 0;
      for(; i < position; i++) {
        newPositionedIds.push(sorted[i].id);
      }
      newPositionedIds.push(id);
      for(; i < sorted.length; i++) {
        newPositionedIds.push(sorted[i].id);
      }
      let updateQueue = [];
      for(let j = 0; j < newPositionedIds.length; j++) {
        let updatedObject = {
          position: j+1,
          id: newPositionedIds[j]
        };
        updateQueue.push(updatedObject);
      }
      function updateTasks() {
        if(updateQueue.length > 0) {
          let up = updateQueue.pop();
          Task.update({position: up.position}, {where: {id: up.id}}).then((data) => {
            updateTasks();
          });
        } else {
          updateIsOk();
        }
      }
      function updateIsOk() {
        res.send(JSON.stringify("Positions updated"));
      }
      updateTasks();
    });
  })

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