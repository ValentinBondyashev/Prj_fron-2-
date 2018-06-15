let defaultState = {
    user: '',
    status: ''
};

export function register(state = defaultState, action) {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return {...state, status: 'success'};
        case 'REGISTER_ERROR': 
            return {...state, status: 'error'}
        default:
            return state;
    }
}

