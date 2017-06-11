import React from "react";



export default class MatchForm extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className="match-form">
        <div className="left">
        {props.name1}
        </div>
        <div className="right">
        {props.name2}
        </div>
      </div>
    )
  }
}