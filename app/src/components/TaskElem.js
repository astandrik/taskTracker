import React from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import {connect} from "react-redux";

function getOffset(elem, parent, isAbsolute) {
  if(!isAbsolute) {
    return elem.offsetTop - parent.offsetTop;
  } else {
    return elem.offsetTop - parent.offsetTop + elem.offsetHeight;
  }
}

function getScrollDiff(elem, parent) {
  let curOffset = getOffset(elem, parent);
  let curOffsetTop = getOffset(elem, parent, true);
  let diff = 0;
  if(curOffset < 0) {
    diff = curOffset * 2;
  } else if(curOffsetTop > parent.offsetHeight) {
    diff = (curOffsetTop - parent.offsetHeight)  * 2;
  }
  return diff;
}

class TaskElem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      text: undefined
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  render() {
    let props = this.props;
    if(props.obj.beindDragged) {
      props.processScroll(getScrollDiff(this.refs["task-element"+props.objid], props.parent));
    }
    let style = {},
        shadowClone = null;
    if( props.obj.beindDragged) {
      style = {left: (props.obj.posX - this.refs["task-element"+props.obj.id].offsetWidth + 20)|| 0,
                                            top: (props.obj.posY - this.refs["task-element"+props.obj.id].offsetHeight/2 + 20) || 0};
      shadowClone = (
        <div ref="shadow" className="task shadow">
          <div>
            <ReactSVG
              path="app/src/Icons/move-arrows.svg"
              className="move-task-icon"
            />
          </div>
          <input readOnly value={this.state.name === undefined ? this.props.obj.name : this.state.name} name="name"/>
          <textarea readOnly value={this.state.text === undefined ? this.props.obj.text : this.state.text} name="text"/>
          <button> Обновить </button>
          <button> Удалить </button>
        </div>
      )
    }
    return (
      <div onMouseUp={this.props.makeStatic}>
        <div ref={"task-element"+ props.obj.id} className={"task" + (props.obj.beindDragged ? " dragged " : "")} style={style}>
          <div onMouseDown={this.props.makeDragged}>
            <ReactSVG
              path="app/src/Icons/move-arrows.svg"
              className="move-task-icon"
            />
          </div>
          <input onChange={this.onChange} value={this.state.name === undefined ? this.props.obj.name : this.state.name} name="name"/>
          <textarea onChange={this.onChange} value={this.state.text === undefined ? this.props.obj.text : this.state.text} name="text"/>
          <button onClick={props.update.bind(this, Object.assign({},this.state, {id: props.obj.id}))}> Обновить </button>
          <button onClick={props.delete.bind(this, props.obj.id)}> Удалить </button>
        </div>
        {shadowClone}
      </div>
    );
  }
}

let makeMapStateToProps = function(initialState, initialOwnProps) {
  const mapStateToProps = function(state) {
    return {
      obj: state.Tasks.tasks.byId[initialOwnProps.objid] || {name: '', text: '', beindDragged: false, posY: -1, posX: -1}
    };
  };
  return mapStateToProps;
}

export default connect(makeMapStateToProps, null, null, { withRef: true })(TaskElem);