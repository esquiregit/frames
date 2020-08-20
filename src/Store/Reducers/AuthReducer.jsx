const initialState = {
    user: null,
    permissions: null,
    isLoggedIn: false,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                user: action.user,
                permissions: action.permissions,
                isLoggedIn: true,
            };
        case 'IS_LOGGED_IN':
            return state.user ? true : false;
        case 'UPDATE':
            return {
                ...state,
                user: action.user
            };
        default: return state;
    }
}

export default authReducer;
