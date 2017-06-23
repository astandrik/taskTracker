import React from "react";
import {updateTask, deleteTask} from "../../redux/actions/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class TaskElem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.objid
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    let props = this.props;
    return (
      <div className="task">
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
    this.state = {};
  }
  render() {
    let props = this.props;
    let tasks = props.tasks;
    let tasksList = tasks.map(x => <TaskElem key={x.id} objid={x.id} name={x.name} text={x.text} update={props.updateTask} delete={props.deleteTask}/>);
    return (
      <div>
        <div className="tasks">
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