import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Loader from '../../Extras/Loadrr';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Toastrr from '../../Extras/Toastrr';
import ExternalEmptyData from '../../Extras/ExternalEmptyData';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function WishList({ history }) {
    let user    = useSelector(state => state.authReducer.user);

    const [loading, setLoading]   = useState(true); 
    const [message, setMessage]   = useState(''); 
    const [comError, setComError] = useState(false);
    const [wishlist, setWishlist] = useState([]); 

    React.useEffect(() => {
        document.title        = 'Your Wish List | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            Axios.post(getBaseURL()+'get_wishlist', { customer_id: user.customer_id }, { signal: signal })
                .then(response => {
                    setLoading(false);
                    setWishlist(response.data);
                })
                .catch(error => {
                    setLoading(false);
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                });
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [history, user]);

    let rowsPerPage = [];
    const columns   = [
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
            label: "Date",
            name: "date",
            options: {
                filter: true,
            }
        },
    ];
    if (wishlist) {
        if (wishlist.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, wishlist.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        download: false,
        filter: false,
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Wish List Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Wish List",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Wish List",
            }
        }
    };

    return (
        <div className="back_gray">
            { comError && <Toastrr message={message} type="info" /> }
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    loading ? <Loader /> :
                        (wishlist && wishlist.length)
                            ?
                            <MUIDataTable
                                title="Your Wish List"
                                data={wishlist}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={comError} message="You Have No Items Saved" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default WishList;
