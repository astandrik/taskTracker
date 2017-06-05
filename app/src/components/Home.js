import React from "react";
import "./Home.css";

export default class Home extends  React.Component{
  render() {
    const props = this.props;
    let list = [];    
    if(props.matches) list = props.matches.map(x => <div key={x.id}><span>1: {x.name1}</span> <span>2: {x.name2}</span> </div>)
    return (
      <div className="flexV full-height">
        <div className="header">
          <h3>{props.header}</h3>
        </div>
        <div className="workSpace">
          <button className="add_button" onClick={props.addMatch}/>
          {list}
        </div>
      </div>
    );
  }
}