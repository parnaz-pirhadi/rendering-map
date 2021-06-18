import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore";
import { BrowserRouter } from "react-router-dom";
import Content from "../src/component/common/Content";
import ApiInterceptor from "./api/ApiInterceptor";
import "./content/style/generalCss.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

ApiInterceptor.setupInterceptors(reduxStore);
const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Content className="main" />
      </BrowserRouter>
    </Provider>,
    rootElement
);


