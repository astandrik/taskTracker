import React from "react";
import "./Home.css";

export default class Home extends  React.Component{
  render() {
    const props = this.props;
    return (
      <div className="flexV full-height">
        <div className="header">
          <h3>{props.header}</h3>
        </div>
        <div className="workSpace">
          <button className="add_button" onClick={props.addMatch}/>
        </div>
      </div>
    );
  }
}