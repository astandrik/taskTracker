import {combineReducers, createStore} from "redux";
import homeReducer from "./reducers/homeReducer";

const Home = combineReducers({
  header: homeReducer.header,
  token: homeReducer.token
});

const Tasks = combineReducers({
  tasks: homeReducer.tasks
});

export default combineReducers({
  Home,
  Tasks
});