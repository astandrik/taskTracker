import React from "react";
import {updateTask, deleteTask} from "../../redux/actions/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'
import {getTasks, changePositions} from "../../redux/actions/actions";
import TaskElem from "./TaskElem";
import helpers from "../../helperFunctions/helpers";

function getOffset(parent, a) {
  if(!a || !parent) return null;
  if(a.classList.contains("dragged")) {
    return  parent.scrollTop + a.offsetTop;
  } else {
    return a.offsetTop;
  }
}

function compare(a, b, parent) {
  if(a.classList.contains("dragged")) {
    var aOffset = parent.scrollTop + a.offsetTop + a.offsetHeight,
        bOffset = b.offsetTop;
        if(aOffset > bOffset) return 1;
        else return -1;
  } else if(b.classList.contains("dragged")) {
    var aOffset = a.offsetTop + a.offsetHeight,
        bOffset = parent.scrollTop + b.offsetTop;
        if(aOffset > bOffset) return 1;
        else return -1;
  } else {
    var aOffset = a.offsetTop + a.offsetHeight,
        bOffset = b.offsetTop;
        if(aOffset > bOffset) return 1;
        else return -1;
  }
}

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.props.initLoad();
    this.state = {
      posX: 0,
      posY: 0
    };
    this.move = this.move.bind(this);
    this.resolvePositions = helpers.debounce(this.resolvePositions.bind(this), 100);
  }
  move(e) {
    this.setState({
      posX: e.pageX,
      posY: e.pageY
    });
  }
  resolvePositions(tasks) {
    let refs = {};
    tasks.forEach(x => refs[x.key] = this.refs["elem-"+x.key].refs["task-element"+x.key]);
    let sorted = tasks.sort((a,b) => compare(refs[a.key],refs[b.key], this.refs["tasks"]));
    sorted = sorted.map((x,i) => ({id: x.key, position: (i+1)}));
    this.props.changePositions(sorted);
  }
  render() {
    let props = this.props;
    let tasks = props.tasks;
    let tasksList = tasks.map(x => <TaskElem posX={this.state.posX} posY={this.state.posY} ref={"elem-"+x.id}
      key={x.id} objid={x.id} name={x.name} text={x.text} getOffset={getOffset.bind(this, this.refs["tasks"])}
      update={props.updateTask} delete={props.deleteTask}/>);
    return (
      <div className="tasks-container" onMouseMove={(e) => {this.move(e); this.resolvePositions(tasksList);}}>
        <div className="tasks" ref="tasks">
          {tasksList}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    tasks: state.Tasks.tasks
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateTask(task) {
      dispatch(updateTask(task));
    },
    deleteTask(task) {
      dispatch(deleteTask(task));
    },
    initLoad() {
      dispatch(getTasks());
    },
    changePositions(tasks) {
      let dict = {};
      tasks.forEach(x => (dict[x.id] = x.position));
      dispatch(changePositions({positions: dict}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);