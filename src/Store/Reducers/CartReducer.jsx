const initialState = {
    cart: null
};
let newCart = [];
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POPULATE_CART':
            return {
                ...state,
                cart: action.cart
            };
        case 'ADD_ITEM':
            newCart = [...state];
            newCart.push(action.item);
            return newCart;
            // return {
            //     ...state,
            //     action.item
            // };
        case 'REMOVE_ITEM':
            newCart = state.map(item => item.id !== action.id);
            return newCart;
            // return {
            //     ...state,
            //     action.item
            // };
        default: return state;
    }
}

export default authReducer;
