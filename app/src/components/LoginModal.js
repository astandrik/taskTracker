import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Admin",
      password: ""
    }
  }
  handleChange(event) {
    let v = event.target.value;
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.tryLogin(this.state);
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
          <h1> Введите сообщение </h1>
          <form action="/api/form" onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Имя
              <input name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </label>
            <label>
              Пароль:
              <input name="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Modal;