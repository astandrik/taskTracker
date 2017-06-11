import React from "react";
import { connect } from 'react-redux';

let Post = (props) => {
  return (
    <div className="column">
        <span className="time">props.time</span>
        <span className="post">props.text</span>
    </div>
  )
};


class Posts extends React.Component {
  render() {
    let props = this.props,
        jsonData = props.posts,
        list = jsonData.map(x => <Post id={x.id} time={x.time} text={x.text}/>);
    return <div className="column">
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