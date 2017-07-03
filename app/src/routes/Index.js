import {
  Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import React from "react";
import {connect} from "react-redux";
import store from "../../store";
import TaskTracker from "./TaskTracker";
import Login from "./Login";
import history from './history';
import {logout} from "../../redux/actions/actions";

let Home = (props) => {
  return (
    <h1> Дратути )))0) </h1>
  )
}

class Global extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let props = this.props;
    return (
      <div className="header">
        <div className="sub-header">
            <h3 className="global-header">{props.header}</h3>
            <button onClick={this.props.logout}>Logout</button>
        </div>
        <div className="links">
          <Link className="link-button" to="/">Домой</Link>
          <Link  className="link-button" to="/tasks">Задачи</Link>
        </div>
      </div>
    )
  }
}

function checkTokenRender(token, component, prevLocation) {
  return () => token && !~token.indexOf("Invalid") ? component : <Redirect to={"/login?location="+prevLocation}/>;
}

function globalWrapper(component) {
  return (
      <div>
        <Global header={this.props.header} logout={this.props.logout}/>
        {component}
      </div>
  )
}

let IRouter = class IndexRouter extends React.Component {
  render() {
    let props = this.props;
    let location = history.location.pathname;
    return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path='/' render={checkTokenRender(props.token, globalWrapper.bind(this)(<Home/>), location)}/>
          <Route path='/tasks'  render={checkTokenRender(props.token, globalWrapper.bind(this)(<TaskTracker/>), location)}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    header: state.Home.header,
    token: state.Home.token
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IRouter);