let defaultState = {
    skills: [],
    id: [],
    allSkills: [],
    userSkill: false,
    userId: '',
    editSkill: false,
    mark: false,
};

export function skill(state = defaultState, action) {
    switch (action.type) {
        case 'SUCCES_GET_ALL_SKILLS': 
            return {...state, allSkills: action.payload};
        case 'SUCCES_GET_USER_SKILL':
            return {...state, userSkill: action.payload.data, userId: action.payload.id};
        case 'SUCCES_GET_SKILLS':
            return {...state, skills: action.payload};
        case 'SUCCES_PUT_SKILLS':
            return {...state };
        case 'GET_ID_SKILLS':
            return {...state, id: action.payload};
        case 'EDIT_USER_SKILL_ADMIN':
            return {...state, editSkill: action.payload.editSkill, mark:action.payload.mark };
        default:
            return state;
    }
}

