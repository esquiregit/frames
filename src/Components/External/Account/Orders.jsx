import React from 'react';
import Card from '@material-ui/core/Card';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import { useSelector } from 'react-redux';

function Orders() {
    React.useEffect(() => {
        document.title = 'Your Orders | The Frame Shop Accra';
    }, []);
    const user = useSelector(state => state.authReducer.user);

    return (
        <div className="back_gray">
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                    
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Orders;
