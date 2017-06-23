import React from "react";
import ReactDOM from "react-dom";
import "./src/app.less";
import { Provider } from 'react-redux';
import {initApp} from "./redux/actions/actions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { getMatches, getProposed } from "./redux/actions/actions";
import Index from "./src/routes/Index";
import store from "./store";
import { AppContainer } from 'react-hot-loader'

store.dispatch(initApp({header: "Yet another task tracker"}));
store.dispatch(getProposed());


const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
          <Component/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Index);

if (module.hot) {
  module.hot.accept("./src/routes/Index", () => { render(Index) })
}