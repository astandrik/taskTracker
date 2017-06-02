import {createStore} from 'redux';
import React from "react";
import ReactDom from "react-dom";
import "./src/app.css";
import { Provider } from 'react-redux';
import Home from "./src/containers/HomeContainer";
import reducer from "./redux/reducer";
import {initApp} from "./redux/actions/actions";

const store = createStore(reducer);
store.dispatch(initApp({header: "Who will win?"}));


ReactDom.render(
   <Provider store={store}>
     <Home/>
    </Provider>,
  document.getElementById("root")
);