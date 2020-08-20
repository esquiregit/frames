export const logIn = (user, permissions) => {
    return {
        type: 'LOG_IN',
        user: user,
        permissions: permissions,
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
