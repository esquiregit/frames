import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Loader from '../../Extras/Loadrr';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import MUIDataTable from "mui-datatables";
import ExternalEmptyData from '../../Extras/ExternalEmptyData';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function WishList({ history }) {
    let user        = useSelector(state => state.authReducer.user);
    const classes   = styles();
    let newWishlist = [];

    const [error, setError]         = useState(false);
    const [loading, setLoading]     = useState(true);
    const [message, setMessage]     = useState('');
    const [success, setSuccess]     = useState(false);
    const [warning, setWarning]     = useState(false);
    const [backdrop, setBackdrop]   = useState(false);
    const [comError, setComError]   = useState(false);
    const [wishlists, setWishlists] = useState([]);

    React.useEffect(() => {
        document.title        = 'Your Wish List | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            if(user.customer_id) {
                Axios.post(getBaseURL()+'get_wishlist', { customer_id: user.customer_id }, { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setWishlists(response.data);
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
            history.push('/login/');
        }

        return () => abortController.abort();
    }, [history, user]);

    let rowsPerPage = [];
    const columns   = [
        {
            label: "Image",
            name: "image",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => <img className="table-img" src={wishlists.length ? getBaseURL()+wishlists[dataIndex].image : ''} alt={wishlists[dataIndex].frame} />
            }
        },
        {
            label: "Frame",
            name: "frame",
            options: {
                filter: true,
            }
        },
        {
            label: "Description",
            name: "description",
            options: {
                filter: true,
            }
        },
        {
            label: "Price",
            name: "price",
            options: {
                filter: true,
            }
        },
        {
            label: "Date Added",
            name: "date",
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
                            <Tippy content="Add To Cart">
                                <IconButton onClick={() => addToCart(wishlists[dataIndex], 'add')}>
                                    <AddShoppingCartIcon className="colour-success" />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Remove From Wish List">
                                <IconButton onClick={() => deleteItem(wishlists[dataIndex].id)}>
                                    <DeleteOutlineOutlinedIcon color="secondary" />
                                </IconButton>
                            </Tippy>
                        </>
                    );
                }
            }
        },
    ];
    if (wishlists) {
        if (wishlists.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, wishlists.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        download: false,
        filter: false,
        page: 0,
        selectableRows: 'none',
        viewColumns: false,
        print: false,
        textLabels: {
            body: {
                noMatch: "No Matching Items In Wish List Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Wish List",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Wish List",
            }
        }
    };
    const addToCart = wishlist => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        const abortController = new AbortController();
        const signal  = abortController.signal;
        
        // newWishlist = [...wishlists];
        // newWishlist.push(wishlist);
        console.log('wishlist: ', wishlist)

        const data = {
            customer_id : user.customer_id,
            product_id  : wishlist.product_id,
            quantity    : 1,
        };
        console.log('data: ', data)
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'add_item_to_cart', data, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setMessage(response.data[0].message);
                        setSuccess(true);
                    } else {
                        setError(true);
                        setMessage(response.data[0].message);
                    }
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
    };
    const deleteItem = id => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        const abortController = new AbortController();
        const signal  = abortController.signal;

        wishlists.forEach(wishlist => {
            if(wishlist.id !== (id)) {
                newWishlist.push(wishlist);
            }
        });
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'remove_from_wishlist', { id: id }, { signal: signal })
                .then(response => {
                    setWishlists(newWishlist);
                    setMessage(response.data[0].message);
                    setSuccess(true);
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
    };

    return (
        <div className="back_gray">
            { error    && <Toastrr message={message} type="error"   /> }
            { warning  && <Toastrr message={message} type="warning" /> }
            { success  && <Toastrr message={message} type="success" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop  className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Adding Item To Cart. Please Wait....</span>
            </Backdrop>
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    loading ? <Loader /> :
                        (wishlists && wishlists.length)
                            ?
                            <MUIDataTable
                                title="Your Wish List"
                                data={wishlists}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={comError} message="You Have No Items In Your Wish List" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default WishList;
