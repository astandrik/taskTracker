import React from "react";
import {connect} from "react-redux";

class TaskElem extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;
    return (
      <div className="task">
        <input value={props.name}/>
        <textarea value={props.text}/>
      </div>
    );
  }
}

class TasksList extends React.Component {
  render() {
    let props = this.props;
    let tasks = props.tasks;
    let tasksList = tasks.map(x => <TaskElem name={x.name} text={x.text}/>);
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

export default connect(mapStateToProps)(TasksList);