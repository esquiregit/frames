import authReducer from './AuthReducer';
import cartReducer from './CartReducer';
import sidebarReducer from './SidebarReducer';
import wishlistReducer from './WishlistReducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    authReducer,
    cartReducer,
    sidebarReducer,
    wishlistReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
