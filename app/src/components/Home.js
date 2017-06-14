import React from "react";
import PostsList from "./PostsList";
import "./Home.css";
import Modal from "./Modal.js"

export default class Home extends  React.Component{
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
        <div className="header">
          <h3>{props.header}</h3>
          <button onClick={this.showModal.bind(this)}>Sosi</button>
        </div>
        <div className="workSpace">
          <Modal visible={this.state.ModalVisible} hideModal={this.hideModal} sendPost={this.props.sendPost}/>
          <button className="add_button" onClick={props.addMatch}/>
          <div className="who-win-list">
            <PostsList/>
          </div>
        </div>
      </div>
    );
  }
}

