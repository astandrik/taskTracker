import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import React from "react";
import ReactDom from "react-dom";
import "./src/app.css";
import { Provider } from 'react-redux';
import Home from "./src/containers/HomeContainer";
import reducer from "./redux/reducer";
import {initApp} from "./redux/actions/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { getMatches } from "./redux/actions/actions";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.dispatch(initApp({header: "Who will whar?"}));
store.dispatch(getMatches());


ReactDom.render(
   <Provider store={store}>
     <Home/>
    </Provider>,
  document.getElementById("root")
);