export const populate_cart = cart => {
    return {
        type: 'POPULATE_CART',
        cart: cart
    };
}

export const add_item = item => {
    return {
        type: 'ADD_ITEM',
        item: item
    }
};
