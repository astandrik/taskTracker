import React from "react";
import ReactDom from "react-dom";
import "./src/app.css";
import { Provider } from 'react-redux';
import {initApp} from "./redux/actions/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { getMatches, getProposed } from "./redux/actions/actions";
import Index from "./src/routes/Index";
import store from "./store";

store.dispatch(initApp({header: "Who will win?"}));
store.dispatch(getProposed());


ReactDom.render(
   <Provider store={store}>
     <Index/>
    </Provider>,
  document.getElementById("root")
);

