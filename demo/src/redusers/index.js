import { combineReducers } from "redux";

import { auth } from "./auth";
import { skill } from "./skill";
import { register } from './register';
import { getSkillsList } from './getSkillsList';
import { getMatchedUsers } from './getMatchedUsers';
import { getUserById } from './getUserById';

const rootReducer = combineReducers({
    auth,
    skill,
    register,
    getSkillsList,
    getMatchedUsers,
    getUserById
});

export default rootReducer;