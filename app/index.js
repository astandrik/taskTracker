import {createStore} from 'redux';
import React from "react";
import ReactDom from "react-dom";
import "./src/app.css";
import { Provider } from 'react-redux';
import Home from "./src/components/Home";

ReactDom.render(<Home/>, 
  document.getElementById("root")
);