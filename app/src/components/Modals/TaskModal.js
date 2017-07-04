import React from "react";
import "../Modal.less";
import ReactSVG from 'react-svg';

let initState = {
  name: "",
  text: ""
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({},initState);
    this.close = this.close.bind(this);
  }
  handleChange(event) {
    let v = event.target.value;
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state);
    this.close();
  }
  close() {
    this.setState(Object.assign({},initState));
    this.props.hideModal();
  }
  render() {
    let props = this.props;
    if(!props.visible) {
      return null;
    }
    return (
      <div className="backdrop">
        <div className="modal-window">
          <div className="close-icon-container"  onClick={this.close}>
            <ReactSVG
              path="app/src/Icons/cancel.svg"
              className="close-icon"
            />
          </div>
          <h1> Создание задачи </h1>
          <form className="create-task-form" onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Название:
              <input name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </label>
            <label>
              Описание:
              <textarea name="text" value={this.state.message} onChange={this.handleChange.bind(this)}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Modal

