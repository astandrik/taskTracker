import { connect } from 'react-redux';
import Posts from "../routes/Posts.js";
import {tryLogin} from "../../redux/actions/actions";

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (data)=> {
      dispatch(tryLogin(data));
    }
  }
}

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)

export default PostsContainer;