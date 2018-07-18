let defaultState =  null;

export function getUserById(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_USER_BY_ID':
      return action.payload
    default:
      return state;
  }
}

