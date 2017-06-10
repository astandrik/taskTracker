import React from "react";

let Post = (props) => {
  return (
    <div>
        <span className="time">props.time</span>
        <span className="post">props.text</span>
    </div>
  )
};


export default class Posts extends React.Component {
  render() {
    let props = this.props,
        jsonData = props.posts,
        list = jsonData.map(x => <Post id={x.id} time={x.time} text={x.text}/>);
    return <div className="postsList">
            {list}
           </div>

  }
}