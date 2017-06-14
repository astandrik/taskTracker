import { connect } from 'react-redux';
import Home from "../components/Home.js";
import {sendPost} from "../../redux/actions/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    header: state.Home.header
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPost: (data)=> {
      dispatch(sendPost(data));
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer;