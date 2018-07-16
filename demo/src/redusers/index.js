import { combineReducers } from "redux";

import { auth } from "./auth";
import { skill } from "./skill";
import { register } from './register';
import { getSkillsList } from './getSkillsList';

const rootReducer = combineReducers({
    auth,
    skill,
    register,
    getSkillsList
});

export default rootReducer;