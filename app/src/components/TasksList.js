import React from "react";

class TaskElem extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    return (
    <div className="task">
      <input value={{props.name}}/>
      <textarea value={{props.text}}/>
    </div>);
  }
}

class TasksList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    let tasks = props.tasks;
    if(tasks.length === 0) return null;
    let tasksList = tasks.map(x => <TaskElem name={{x.name}} text={{x.text}}/>);
    return (
      <div>
        <div className="tasks-area">
          <button className="add-task-button"/>
        </div>
        <div className="tasks">
          {{tasksList}}
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