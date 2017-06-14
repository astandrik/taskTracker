import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import React from "react";
import Posts from "../containers/PostsContainer";
import {connect} from "react-redux";

let Home = (props) => {
  return (
    <h1> Дратути )))0) </h1>
  )
}

class Global extends React.Component {
  render() {
    let props = this.props;
    return (
      <div className="header">
        <h3>{props.header}</h3>
      </div>
    )
  }
}

let IRouter = class IndexRouter extends React.Component {
  render() {
    let props = this.props;
    return (
    <div>
    <Global header={this.props.header}/>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/postslist' component={Posts} />
      </Switch>
    </Router>
    </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    header: state.Home.header
  }
}

export default connect(mapStateToProps)(IRouter);