const initialState = {
    cart: []
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
        case 'UPDATE_QUANTITY':
            if(state.length) {
                newCart = state.map(item => {
                    if(item.id === action.id) {
                        item.quantity = action.quantity
                    }
                });
                return newCart;
            } else {
                return state;
            }
        case 'REMOVE_ITEM':
            if(state.length) {
                newCart = state.map(item => item.id !== action.id);
                return newCart;
            } else {
                return state;
            }
        default: return state;
    }
}

export default authReducer;
