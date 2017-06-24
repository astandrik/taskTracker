import React from "react";
import {updateTask, deleteTask} from "../../redux/actions/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'

class TaskElem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.objid,
      beindDragged: false,
      posX: 0,
      posY: 0
    }
    this.onChange = this.onChange.bind(this);
    this.makeDragged = this.makeDragged.bind(this);
    this.makeStatic = this.makeStatic.bind(this);
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  makeStatic() {
    this.setState({beindDragged: false});
  }
  makeDragged() {
    this.setState({beindDragged: true});
  }
  render() {
    let props = this.props;
    let style = this.state.beindDragged ? {left: this.props.posX - this.refs["task-element"].offsetWidth + 20, top: this.props.posY - 20} : {};
    return (
      <div onMouseUp={this.makeStatic}  ref="task-element" className={"task" + (this.state.beindDragged ? " dragged " : "")} style={style}>
        <div onMouseDown={this.makeDragged}>
          <ReactSVG
            path="app/src/Icons/move-arrows.svg"
            className="move-task-icon"
          />
        </div>
        <input onChange={this.onChange} value={this.state.name} name="name"/>
        <textarea onChange={this.onChange} value={this.state.text} name="text"/>
        <button onClick={props.update.bind(this, this.state)}> Обновить </button>
        <button onClick={props.delete.bind(this, this.state)}> Удалить </button>
      </div>
    );
  }
}

TaskElem.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  objid: PropTypes.number.isRequired
}

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posX: 0,
      posY: 0
    };
    this.move = this.move.bind(this);
  }
  move(e) {
    this.setState({
      posX: e.pageX,
      posY: e.pageY
    });
  }
  render() {
    let props = this.props;
    let tasks = props.tasks;
    let tasksList = tasks.map(x => <TaskElem posX={this.state.posX} posY={this.state.posY}
      key={x.id} objid={x.id} name={x.name} text={x.text} update={props.updateTask} delete={props.deleteTask}/>);
    return (
      <div className="tasks-container" onMouseMove={this.move}>
        <div className="tasks"  >
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);