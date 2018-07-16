let defaultState = [];

export function getSkillsList(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_SKILL_LIST':
      return action.payload

    default:
      return state;
  }
}

