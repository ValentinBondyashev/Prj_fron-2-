let defaultState = {
    token: '',
    status: '',
    checkAdmin: false,
    photo: '',
};

export function auth(state = defaultState, action) {
    switch (action.type) {
        case 'CHECK_AUTH':
            return {...state, token: action.payload.token};
        case 'LOGIN_SUCCESS':
            return {...state, token: action.payload.token, status: 'success'};
        case 'LOGIN_GOOGLE_SUCCESS':
            return {...state, token: action.payload.token, photo: action.payload.photo, status: 'success'};
        case 'LOGIN_ERROR': 
            return {...state, status: 'error'};
        case 'CHECK_ADMIN': 
            return {...state, checkAdmin: action.payload};    
        default:
            return state;
    }
}

