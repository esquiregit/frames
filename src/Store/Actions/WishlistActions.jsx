export const populate_wishlist = wishlist => {
    return {
        type: 'POPULATE_WISHLIST',
        wishlist: wishlist
    };
}

export const add_item = item => {
    return {
        type: 'ADD_ITEM',
        item: item
    }
};
