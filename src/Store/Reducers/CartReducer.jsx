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
        case 'UPDATE_QUANTITY':
            if(state.cart.length) {
                state.cart.map(item => {
                    if(item.id === action.id) {
                        console.log('item.id: ', item.id)
                        console.log('action.id: ', action.id)
                        item.quantity = action.action === 'add' ? item.quantity + 1 : item.quantity - 1;
                    }
                    return state;
                });
            }
            return state;
        case 'REMOVE_ITEM':
            if(state.cart.length) {
                state.cart.map(item => item.id !== action.id);
            }
            return state;
        default: return state;
    }
}

export default cartReducer;
