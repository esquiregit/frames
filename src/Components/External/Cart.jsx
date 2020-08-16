import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import { useSelector } from 'react-redux';

function Cart() {
    useEffect(() => {
        document.title = 'Your Cart | The Frame Shop';
    }, []);
    const user = useSelector(state => state.authReducer.user);

    return (
        <div className="back_gray">
            <Header user={user} />
            <main id="external">
                <Card variant="outlined" style={{height: 100}}>
                    
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Cart;
