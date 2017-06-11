import React from "react";
import { connect } from 'react-redux';
import "./Post.css";

let Post = (props) => {
  return (
    <div className="column single-post" key={props.id}>
        <span className="time">{props.time}</span>
        <span className="post">{props.text}</span>
    </div>
  )
};


class Posts extends React.Component {
  render() {
    let props = this.props,
        jsonData = props.posts,
        list = jsonData.map((x,i) => <Post key={i} time={x.time} text={x.text}/>);
    return <div className="column align-center">
            {list}
           </div>

  }
}

let mapStateToProps = (state, ownProps) => {
  return {
      posts: state.Posts.proposed
  }
}

let PostsContainer = connect(mapStateToProps)(Posts);
export default PostsContainer;