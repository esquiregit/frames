export const logIn = user => {
    return {
        type: 'LOG_IN',
        user: user,
    };
}

export const isLoggedIn = () => {
    return { type: 'IS_LOGGED_IN' }
}

export const update = user => {
    return {
        type: 'UPDATE',
        user: user
    }
}
