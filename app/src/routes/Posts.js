import React from "react";
import PostsList from "../components/PostsList";
import "./Posts.css";
import Modal from "../components/Modal.js"

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

