import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import quizzSetting from "./quizzSetting"

export default combineReducers({ alert, auth, quizzSetting });
