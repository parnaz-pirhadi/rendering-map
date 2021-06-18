import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import throttle from "redux-throttle";
import reducers from "../reducers";



const defaultThrottleOption = {
  leading: true,
  trailing: false
};

const throttleMiddleWare = throttle(500, defaultThrottleOption);

const reduxStore = createStore(
  reducers, applyMiddleware(thunk, throttleMiddleWare)
);
export default reduxStore;
