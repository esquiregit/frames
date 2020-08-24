import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Loader from '../../Extras/Loadrr';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Toastrr from '../../Extras/Toastrr';
import MUIDataTable from "mui-datatables";
import ExternalEmptyData from '../../Extras/ExternalEmptyData';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function Orders({ history }) {
    let user = useSelector(state => state.authReducer.user);

    const [orders, setOrders]     = useState([]);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);

    React.useEffect(() => {
        document.title = 'Your Orders | The Frame Shop';
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (user) {
            if(user.customer_id) {
                Axios.post(getBaseURL() + 'get_customer_orders', { customer_id: user.customer_id }, { signal: signal })
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
                history.push('/admin/unauthorized-access/');
            }
        } else {
            history.push('/login/');
        }

        return () => abortController.abort();
    }, [history, user]);

    let rowsPerPage = [];
    const columns = [
        {
            label: "Image",
            name: "image",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => <img className="table-img" src={orders.length ? getBaseURL()+orders[dataIndex].image : ''} alt={orders[dataIndex].frame} />
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
            label: "Price",
            name: "order_price",
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
            label: "Order Date",
            name: "date",
            options: {
                filter: true,
            }
        },
        {
            label: "Confirmation Date",
            name: "confirmation_date",
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
            {comError && <Toastrr message={message} severity="info" />}
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                    {
                        loading ? <Loader /> :
                        (orders && orders.length)
                        ?
                        <MUIDataTable
                            title="Your Orders"
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
