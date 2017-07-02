import React from "react";
import {updateTask, deleteTask} from "../../redux/actions/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'
import {getTasks, changePositions, toggleDragged, setCoords} from "../../redux/actions/actions";
import TaskElem from "./TaskElem";
import helpers from "../../helperFunctions/helpers";
import _ from "lodash";

function getOffset(parent, a, top) {
  if(!a || !parent) return null;
  if(!top && a.classList.contains("dragged")) {
    return  a.offsetTop - parent.offsetTop;
  } else if(top && a.classList.contains("dragged")) {
    return a.offsetTop - parent.offsetTop + a.offsetHeight;
  }
  else {
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

function getThresholds(refs) {
  return refs.map(x => ({top: x.offsetTop, bottom: x.offsetTop + x.offsetHeight}))
}

var isArrayEqual = function(x, y) {
  return _(x).differenceWith(y, _.isEqual).isEmpty();
}

function processScroll(parent, diff) {
  parent.scrollTop += diff;
}

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.props.initLoad();
    this.state = {
      posX: 0,
      posY: 0,
      dragged: false,
      draggedId: -1
    };
    this.move=this.move.bind(this);
  }
  resolvePositions(tasks) {
    let refs = {};
    this.props.tasks.forEach(x => refs[x.key] = this.refs["elem-"+x.key].refs["task-element"+x.key]);
    let sorted = tasks.sort((a,b) => compare(refs[a.key],refs[b.key], this.refs["tasks"]));
    sorted = sorted.map((x,i) => ({id: x.key, position: (i+1)}));
    this.props.changePositions(sorted);
  }
  makeStatic(id,e) {
    e.preventDefault();
    this.props.toggleDragged({id: id, flag: false});
    this.setState({dragged: false, draggedId: id});
  }
  makeDragged(id,e) {
    e.preventDefault();
    this.props.toggleDragged({id: id, flag: true});
    this.setState({dragged: true, draggedId: id});
  }
  move(e) {
    if(!this.state.dragged) return;
    e.preventDefault();
    this.props.setCoords({
      posX: e.pageX,
      posY: e.pageY,
      id: this.state.draggedId
    })
  }
  render() {
    let props = this.props;
    let tasks = props.tasks;
    let tasksList = tasks.allIds.map(id => {
      return <TaskElem
        ref={"elem-"+id}
        key={id}
        objid={id}
        makeDragged={this.makeDragged.bind(this,id)}
        makeStatic={this.makeStatic.bind(this,id)}
        processScroll={processScroll.bind(this, this.refs["tasks"])}
        update={props.updateTask}
        delete={props.deleteTask}/>
    });
    return (
      <div className="tasks-container" onMouseMove={this.move}>
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
    updateTask(id) {
      dispatch(updateTask(id));
    },
    deleteTask(id) {
      dispatch(deleteTask(id));
    },
    initLoad() {
      dispatch(getTasks());
    },
    changePositions(tasks) {
      let dict = {};
      tasks.forEach(x => (dict[x.id] = x.position));
      dispatch(changePositions({positions: dict}));
    },
    toggleDragged(obj) {
      dispatch(toggleDragged(obj));
    },
    setCoords(coords) {
      dispatch(setCoords(coords));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);