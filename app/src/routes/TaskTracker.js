import React from "react";
import TasksList from "../components/TasksList";
import "./TasksList.less";

export default class Home extends  React.Component {
  render() {
    const props = this.props;
    let list = [];
    return (
      <div className="flexV full-height">
            <TasksList/>
      </div>
    );
  }
}

