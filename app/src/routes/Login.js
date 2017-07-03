import React from "react";
import {tryLogin} from "../../redux/actions/actions";
import {connect} from "react-redux";

class Login extends React.Component {
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
  }
  render() {
    let props = this.props;
    return (
        <div className="login-window">
          <h1> Авторизуйтесь </h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin(data) {
      dispatch(tryLogin(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);