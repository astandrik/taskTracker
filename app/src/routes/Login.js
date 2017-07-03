import React from "react";
import "./Login.less";
import {tryLogin} from "../../redux/actions/actions";
import {connect} from "react-redux";
import history from "./history";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Admin",
      password: "",
      error: false
    }
  }
  handleChange(event) {
    let v = event.target.value;
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.tryLogin(this.state).then((data) => {
      if(data) {
        let search = history.location.search;
        if(search) {
          let location = search.match(/\?location=(.+)/)[1];
          if(location) {
            history.push(location);
          } else {
            history.push("/");
          }
        } else {
          history.push("/");
        }
      }
    }, () => { this.setState({error: true}) });
  }
  render() {
    let props = this.props;
    return (
        <div className="login-window">
          <h1> Авторизуйтесь </h1>
          {this.state.error ? <h2> Неверные логин или пароль </h2> : null}
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Имя
              <input name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </label>
            <label>
              Пароль:
              <input name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </label>
            <input type="submit" value="Войти" />
          </form>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin(data) {
      return new Promise((resolve, reject) => dispatch(tryLogin(data, resolve, reject)));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login);