import { combineReducers } from "redux";

import { auth } from "./auth";
import { skill } from "./skill";
import { register } from './register';
const rootReducer = combineReducers({
    auth,
    skill,
    register
});

export default rootReducer;