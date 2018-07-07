let defaultState = {
    skills: [], // скыллы юзера
    listTechnologies: [], // список технологий 
    listUsers: [], // список юзеров
    userSkill: false, // скиллы юзера, которые получил админ 
    userId: false, // айди юзер(у админа для получения нужных скиллов)
    editSkill: false, 
    mark: false, 
    changedSkills: [], // список измененных скиллов полученных по сокету 
};

export function skill(state = defaultState, action) {
    switch (action.type) {
        case 'SUCCES_GET_ALL_SKILLS': 
            return {...state, listUsers: action.payload};
        case 'SUCCES_GET_USER_SKILL':
            return {...state, userSkill: action.payload.data, userId: action.payload.id};
        case 'SUCCES_GET_SKILLS':
            return {...state, skills: action.payload};
        case 'SUCCES_PUT_SKILLS':
            return {...state };
        case 'GET_ID_SKILLS':
            return {...state, listTechnologies: action.payload};
        case 'EDIT_USER_SKILL':
            return {...state, editSkill: action.payload.editSkill, mark:action.payload.mark };
        case 'GET_CHANGED_SKILLS':
            return {...state, changedSkills: JSON.parse(action.payload)}
        default:
            return state;
    }
}

