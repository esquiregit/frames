const initialState = {
    wishlist: []
};
const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_WISHLIST':
            return {
                ...state,
                wishlist: action.wishlist
            };
        default: return state;
    }
}

export default wishlistReducer;
