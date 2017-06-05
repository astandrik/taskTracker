import {combineReducers, createStore} from "redux";
import homeReducer from "./reducers/homeReducer";

const Home = combineReducers({
  header: homeReducer.header,
  matches: homeReducer.matches
});

export default combineReducers({
  Home
});