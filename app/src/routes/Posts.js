import React from "react";
import PostsList from "../components/PostsList";
import "./Posts.css";

export default class Home extends  React.Component {
  render() {
    const props = this.props;
    let list = [];
    return (
      <div className="flexV full-height">
        <div className="workSpace">
          <div className="who-win-list">
            <PostsList/>
          </div>
        </div>
      </div>
    );
  }
}

