import {combineReducers, createStore} from "redux";
import homeReducer from "./reducers/homeReducer";

const Posts = combineReducers({
  proposed: homeReducer.proposed
});

const Home = combineReducers({
  header: homeReducer.header
});

export default combineReducers({
  Home,
  Posts
});