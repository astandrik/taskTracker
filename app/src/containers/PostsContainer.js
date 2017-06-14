import { connect } from 'react-redux';
import Posts from "../routes/Posts.js";
import {sendPost} from "../../redux/actions/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPost: (data)=> {
      dispatch(sendPost(data));
    }
  }
}

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)

export default PostsContainer;