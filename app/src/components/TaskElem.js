import React from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg'

class TaskElem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      text: props.text,
      id: props.objid,
      beindDragged: false,
      posX: 0,
      posY: 0
    }
    this.onChange = this.onChange.bind(this);
    this.makeDragged = this.makeDragged.bind(this);
    this.makeStatic = this.makeStatic.bind(this);
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  makeStatic(e) {
    e.preventDefault();
    this.setState({beindDragged: false});
  }
  makeDragged(e) {
    e.preventDefault();
    this.setState({beindDragged: true});
  }
  render() {
    let props = this.props;
    let getOffset = props.getOffset;
    let curOffset = getOffset(this.refs["task-element"+props.objid]);
    let curOffsetTop = getOffset(this.refs["task-element"+props.objid], 1);
    if(curOffset < 0) {
      props.parent.scrollTop += curOffset * 5;
    } else if(curOffsetTop > props.parent.offsetHeight && this.state.beindDragged) {
      props.parent.scrollTop += (curOffsetTop - props.parent.offsetHeight)  * 5;
    }
    let style = this.state.beindDragged ?
                {left: this.props.posX - this.refs["task-element"+props.objid].offsetWidth + 12, top: this.props.posY - 30}
                : {};
    let shadowClone = null;
    if(this.state.beindDragged) {
      shadowClone = (
        <div className="task shadow">
          <div>
            <ReactSVG
              path="app/src/Icons/move-arrows.svg"
              className="move-task-icon"
            />
          </div>
          <input readOnly value={this.state.name} name="name"/>
          <textarea readOnly value={this.state.text} name="text"/>
          <button> Обновить </button>
          <button> Удалить </button>
        </div>
      )
    }
    return (
      <div onMouseUp={this.makeStatic} >
        <div ref={"task-element"+props.objid}
        className={"task" + (this.state.beindDragged ? " dragged " : "")} style={style}>
          <div onMouseDown={this.makeDragged}>
            <ReactSVG
              path="app/src/Icons/move-arrows.svg"
              className="move-task-icon"
            />
          </div>
          <input onChange={this.onChange} value={this.state.name} name="name"/>
          <textarea onChange={this.onChange} value={this.state.text} name="text"/>
          <button onClick={props.update.bind(this, this.state)}> Обновить </button>
          <button onClick={props.delete.bind(this, this.state)}> Удалить </button>
        </div>
        {shadowClone}
      </div>
    );
  }
}

TaskElem.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  objid: PropTypes.number.isRequired
}

export default TaskElem;