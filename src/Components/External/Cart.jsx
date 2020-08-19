import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loader from '../Extras/Loadrr';
import styles from '../Extras/styles';
import AddIcon from '@material-ui/icons/Add';
import Toastrr from '../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import ExternalEmptyData from '../Extras/ExternalEmptyData';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { getBaseURL } from '../Extras/server';
import { populate_cart } from '../../Store/Actions/CartActions';
import { update_quantity } from '../../Store/Actions/CartActions';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function Cart({ history }) {
    const user     = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const classes  = styles();
    let newCart    = [];

    const [cart, setCart]         = useState([]);
    const [error, setError]       = useState(false);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);

    React.useEffect(() => {
        document.title = 'Your Cart | The Frame Shop';
        const abortController = new AbortController();
        const signal = abortController.signal;

        if(user) {
            if(user.customer_id) {
                Axios.post(getBaseURL() + 'get_cart', { customer_id: user ? user.customer_id : '' }, { signal: signal })
                    .then(response => {
                        setCart(response.data);
                        dispatch(populate_cart(response.data));
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            } else {
                history.push('/admin/unauthorized-access/');
            }
        } else {
            setLoading(false);
        }

        return () => abortController.abort();
    }, [history, user, dispatch]);
    
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
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => <img className="table-img" src={cart.length ? getBaseURL()+cart[dataIndex].image : ''} alt={cart[dataIndex].frame} />
            }
        },
        {
            label: "Price",
            name: "cart_price",
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
                                <IconButton onClick={() => updateCart(cart[dataIndex].id, 'add')}>
                                    <AddIcon className="colour-success" />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Decrease Quantity">
                                <IconButton onClick={() => updateCart(cart[dataIndex].id, null)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Remove From Cart">
                                <IconButton onClick={() => deleteItem(cart[dataIndex].id)}>
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
    const deleteItem = id => {
        setSuccess(false);
        setBackdrop(true);
        const abortController = new AbortController();
        const signal  = abortController.signal;

        cart.map(item => {
            if(item.id !== (id)) {
                newCart.push(item);
            }
        });
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'remove_from_cart', { id: id }, { signal: signal })
                .then(response => {
                    setCart(newCart);
                    setMessage(response.data[0].message);
                    setSuccess(true);
                    dispatch(populate_cart(newCart));
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                    setBackdrop(false);
                });
        } else {
            history.push('/admin/unauthorized-access/');
        }

        return () => abortController.abort();
    }
    const updateCart = (id, action) => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        const abortController = new AbortController();
        const signal  = abortController.signal;
        let item;
        let total;
        let quantity;
        let product_id;

        cart.map(element => {
            if(element.id === id) {
                item       = element;
                product_id = element.product_id;
                quantity   = element.quantity;
                quantity   = action === 'add' ? element.quantity + 1 : element.quantity - 1;
            }
        });  
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'update_cart_item', { id: item.id, quantity: item.quantity, product_id: item.product_id, action }, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setSuccess(true);
                        cart.map(item => {
                            if(item.id === id) {
                                item.quantity  = quantity;
                                total          = item.quantity * item.cart_price_raw;
                                item.total     = 'GHS '+total;
                                item.total_raw = total;
                            }
                            newCart.push(item);
                        });
                    } else if(response.data[0].status.toLowerCase() === 'warning') {
                        setWarning(true);
                    } else {
                        setError(true);
                    }
                    setMessage(response.data[0].message);
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                    setBackdrop(false);
                });
        } else {
            history.push('/admin/unauthorized-access/');
        }

        return () => abortController.abort();
    }
    const checkout = () => {

    };

    return (
        <div className="back_gray">
            { error    && <Toastrr message={message} type="error"   /> }
            { warning  && <Toastrr message={message} type="warning" /> }
            { success  && <Toastrr message={message} type="success" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop  className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Removing Item. Please Wait....</span>
            </Backdrop>
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
                {
                    user &&
                    <Button
                        variant="contained"
                        color="primary">
                        Check Out
                    </Button>
                }
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
