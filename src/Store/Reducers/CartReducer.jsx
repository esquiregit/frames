const initialState = {
    cart: []
};
let newCart = [];
const cartReducer = (state = initialState, action) => {
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
        default: return state;
    }
}

export default cartReducer;
