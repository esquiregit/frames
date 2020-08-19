import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loader from '../Extras/Loadrr';
import Toastrr from '../Extras/Toastrr';
import MUIDataTable from "mui-datatables";
import ExternalEmptyData from '../Extras/ExternalEmptyData';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { getBaseURL } from '../Extras/server';
import { useSelector } from 'react-redux';

function Cart({ history }) {
    let user = useSelector(state => state.authReducer.user);

    const [cart, setCart]     = useState([]);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);

    React.useEffect(() => {
        document.title = 'Your Cart | The Frame Shop';
        const abortController = new AbortController();
        const signal = abortController.signal;

        //if (user) {
            //if(user.customer_id) {
                Axios.post(getBaseURL() + 'get_cart', { customer_id: user ? user.customer_id : '' }, { signal: signal })
                    .then(response => {
                        setCart(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            // } else {
            //     history.push('/admin/unauthorized-access/');
            // }
        // } else {
        //     history.push('/');
        // }

        return () => abortController.abort();
    }, [history, user]);

    let rowsPerPage = [];
    const columns = [
        {
            label: "Frame",
            name: "frame",
            options: {
                filter: true,
            }
        },
        {
            label: "Image",
            name: "image",
            options: {
                filter: true,
            }
        },
        {
            label: "Price",
            name: "cart_price_raw",
            options: {
                filter: true,
            }
        },
        {
            label: "Quantity",
            name: "quantity",
            options: {
                filter: true,
            }
        },
        {
            label: "Cost",
            name: "total",
            options: {
                filter: true,
            }
        },
        {
            label: "Status",
            name: "status",
            options: {
                filter: true,
            }
        },
        {
            label: "Date",
            name: "date_added",
            options: {
                filter: true,
            }
        },
        {
            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <>
                            <Button
                                // onClick={}
                                onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}
                                variant="outlined"
                                color="primary">
                                Edit
                            </Button>
                            <Button
                                // onClick={}
                                variant="outlined"
                                color="secondary">
                                Cancel
                            </Button>
                        </>
                    );
                }
            }
        },
    ];
    if (cart) {
        if (cart.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, cart.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        download: false,
        filter: false,
        viewColumns: false,
        print: false,
        search: false,
        page: 0,
        selectableRows: 'none',
    };
    const checkout = () => {

    };

    return (
        <div className="back_gray">
            {comError && <Toastrr message={message} type="info" />}
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                    {
                        loading ? <Loader /> :
                        (cart && cart.length)
                        ?
                        <MUIDataTable
                            title="Your Cart"
                            data={cart}
                            columns={columns}
                            options={options} />
                        : <ExternalEmptyData error={comError} message="Nothing In Your Cart" />
                    }
                </Card>
                <div className="buttons-bar">
                    <Button
                        variant="contained"
                        color="primary">
                        Check Out
                    </Button>
                    <Button
                        onClick={() => history.push('/start-a-frame/')}
                        variant="contained"
                        className="btn-success">
                        more frames
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Cart;
