import React from "react";
import TasksList from "../components/TasksList";
import TaskModal from "../components/Modals/TaskModal";
import "./TaskTracker.less";
import {addTask} from "../../redux/actions/actions";
import {connect} from "react-redux";
import ReactSVG from 'react-svg';
import history from "./history";

class TaskTracker extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {ModalVisible: false};
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  showModal() {
    this.setState({ModalVisible: true})
  }
  hideModal() {
    this.setState({ModalVisible: false})
  }
  render() {
    const props = this.props;
    let list = [];
    return (
      <div className="flexV full-height">
          <div className="tasks-area">
            <div onClick={this.showModal}>
              <ReactSVG
                path="app/src/Icons/plus.svg"
                className="add-task-plus"
              />
            </div>
          </div>
            <TaskModal visible={this.state.ModalVisible} hideModal={this.hideModal} addTask={this.props.addTask}/>
            <TasksList/>
      </div>
    );
  }
}

var mapDispatchToProps = (dispatch) => {
  return {
    addTask: function(data) {
      dispatch(addTask(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(TaskTracker);
