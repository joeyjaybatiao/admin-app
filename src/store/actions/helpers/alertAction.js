import { TOGGLE_ALERT } from '../../types';
import axios from 'axios';


export const ToggleAlert = (type, msg, val) => dispatch => {
  console.log("::::::");
  dispatch({
    type: TOGGLE_ALERT,
    resType: type,
    msg: msg,
    value: val
  })
}

export const Nigate = () => getState => {
  const store = getState();

  store.alert.toggle = false;
}

export const Delay = (cb, time = 1000) => {
  var timer = setTimeout(() => {

    cb();

    clearTimeout(timer);
  }, time);
}

export const ConfirmAction = (cb, msg = "Proceed?") => dispatch => {
  dispatch({
    type: TOGGLE_ALERT,
    resType: "confirmation",
    msg: msg,
    value: true,
    callback: cb
  })
}
