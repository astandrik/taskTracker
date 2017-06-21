import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import React from "react";
import Posts from "../containers/PostsContainer";
import {connect} from "react-redux";
import { getMatches, getProposed } from "../../redux/actions/actions";
import store from "../../store";
import Modal from "../components/LoginModal.js"

let Home = (props) => {
  return (
    <h1> Дратути )))0) </h1>
  )
}

class Global extends React.Component {
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
    let props = this.props;
    return (
      <div className="header">
        <h3>{props.header}</h3>
        <Link to="/">Домой</Link>
        <Link to="/postslist">Список Постов</Link>
        <button className="add_button" onClick={this.showModal}>Login</button>
        <Modal visible={this.state.ModalVisible} hideModal={this.hideModal} tryLogin={this.props.tryLogin}/>
      </div>
    )
  }
}

let IRouter = class IndexRouter extends React.Component {
  render() {
    let props = this.props;
    return (
    <Router>
      <div>
      <Global header={this.props.header}/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/postslist' render={() => {store.dispatch(getProposed()); return <Posts/>}}/>
        </Switch>
      </div>
    </Router>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    header: state.Home.header
  }
}

export default connect(mapStateToProps)(IRouter);