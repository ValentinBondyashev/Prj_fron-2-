let defaultState = [];

export function getMatchedUsers(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_MATCHED_USERS':
      return action.payload

    default:
      return state;
  }
}

