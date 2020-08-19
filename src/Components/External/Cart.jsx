import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loader from '../Extras/Loadrr';
import AddIcon from '@material-ui/icons/Add';
import Toastrr from '../Extras/Toastrr';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import MUIDataTable from "mui-datatables";
import ExternalEmptyData from '../Extras/ExternalEmptyData';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { getBaseURL } from '../Extras/server';
import { update_quantity } from '../../Store/Actions/CartActions';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function Cart({ history }) {
    const user     = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();

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
                            <Tippy content="Increase Quantity">
                                <IconButton onClick={() => updateCart(dataIndex, cart[dataIndex].quantity, 'add')}>
                                    <AddIcon className="colour-success" />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Decrease Quantity">
                                <IconButton onClick={() => updateCart(dataIndex, cart[dataIndex].quantity)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Remove From Cart">
                                <IconButton onClick={() => deleteItem(dataIndex)}>
                                    <DeleteOutlineOutlinedIcon color="secondary" />
                                </IconButton>
                            </Tippy>
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
    const deleteItem = dataIndex => {
        console.log('dataIndex: ', dataIndex)
        console.log('item id: ', cart[dataIndex].id)
    }
    const updateCart = (dataIndex, quantity, type) => {
        dispatch(update_quantity(dataIndex, type));
        // console.log('newQty: ', newQty)
    }
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
                        view more frames
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Cart;
