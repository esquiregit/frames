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

function Orders({ history }) {
    let user    = useSelector(state => state.authReducer.user);

    const [orders, setOrders]     = useState([]); 
    const [loading, setLoading]   = useState(true); 
    const [message, setMessage]   = useState(''); 
    const [comError, setComError] = useState(false);

    React.useEffect(() => {
        document.title        = 'Your Orders | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            Axios.post(getBaseURL()+'get_customer_orders', { customer_id: user.customer_id }, { signal: signal })
                .then(response => {
                    setOrders(response.data);
                    setLoading(false);
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
            label: "Price",
            name: "order_price_raw",
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
            name: "date",
            options: {
                filter: true,
            }
        },
    ];
    if (orders) {
        if (orders.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, orders.length];
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
        downloadOptions: { filename: 'Your Orders.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Orders Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Orders",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Orders",
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
                        (orders && orders.length)
                            ?
                            <MUIDataTable
                                data={orders}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={comError} message="No Orders Made" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Orders;
