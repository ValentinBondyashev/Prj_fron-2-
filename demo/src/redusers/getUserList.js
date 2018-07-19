let defaultState = null;

export function getUserList(state = defaultState, action) {
  switch (action.type) {
    case 'SUCCES_GET_USER_LIST':
      return action.payload

    default:
      return state;
  }
}

