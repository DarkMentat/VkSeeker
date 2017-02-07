import {combineReducers} from "redux";
import auth from "./authReducer";
import api from "./apiReducer";


export default combineReducers({
    api, auth
})
