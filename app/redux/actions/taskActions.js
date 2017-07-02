import * as ac from "./actionCreator";
export const SET_TASKS = "SET_TASKS";
export const CHANGE_POSITIONS = "CHANGE_POSITIONS";
export const TOGGLE_DRAGGED = "TOGGLE_DRAGGED";
export const SET_COORDS = "SET_COORDS";
export const setTasks = ac.Action(SET_TASKS);
export const changePositions = ac.Action(CHANGE_POSITIONS);
export const toggleDragged = ac.Action(TOGGLE_DRAGGED);
export const setCoords = ac.Action(SET_COORDS);

export const getTasks = function() {
  const callback = (dispatch, data) => {
    let tasks = JSON.parse(data).sort((a,b) => a.position - b.position).map(x => Object.assign({}, x, {beindDragged: false}));
    dispatch(setTasks({data: tasks}));
  }
  return ac.FetchAsync("/api/tasks", callback);
}

export const updateTask = function(data) {
  const callback = (dispatch, data) => {
    dispatch(getTasks());
  }
  return ac.FetchPostAsync("/api/task", data, callback);
}

export const deleteTask = function(data) {
  const callback = (dispatch) => {
    dispatch(getTasks());
  }
  return ac.FetchDeleteAsync("/api/task", {id: data}, callback);
}

export const addTask = function(data) {
  const callback = (dispatch, data) => {
    dispatch(getTasks());
  }
  return ac.FetchPostAsync("/api/task", data ,callback);
}