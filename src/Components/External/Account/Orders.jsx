import React from 'react';
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
    const user    = useSelector(state => state.authReducer.user);
    const user_id = '123'; 

    const [state, setState] = React.useState({
        orders   : [],
        loading  : true,
        message  : '',
        comError : false,
    })

    React.useEffect(() => {
        document.title        = 'Your Orders | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        // if(user) {
            Axios.post(getBaseURL()+'get_orders', { user_id: user_id }, { signal: signal })
            // Axios.post(getBaseURL()+'get_orders', { user_id: user.user_id }, { signal: signal })
                .then(response => {
                    setState({
                        ...state,
                        orders   : response.data,
                        loading  : false,
                    });
                })
                .catch(error => {
                    setState({
                        ...state,
                        loading  : false,
                        message  : 'Network Error. Server Unreachable....',
                        comError : true,
                    });
                });
        // } else {
        //     history.push('/');
        // }

        return () => abortController.abort();
    }, [history, state, user]);

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
            label: "Price",
            name: "price",
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
    if (state.orders) {
        if (state.orders.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, state.orders.length];
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
            { state.comError && <Toastrr message={state.message} type="info" /> }
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    state.loading ? <Loader /> :
                        (state.orders && state.orders.length)
                            ?
                            <MUIDataTable
                                data={state.orders}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={state.comError} single="Order" plural="Orders" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Orders;
