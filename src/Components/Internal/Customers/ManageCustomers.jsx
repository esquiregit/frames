import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import styles from './../../Extras/styles';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Loader from './../../Extras/LoadrrInnerRow';
import Toastrr from './../../Extras/Toastrr';
import Sidebar from './../Layout/Sidebar';
import Backdrop from '@material-ui/core/Backdrop';
import BlockIcon from '@material-ui/icons/Block';
import EmptyData from './../../Extras/EmptyData';
import Breadcrumb from './../Layout/Breadcrumb';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewCustomer from './ViewCustomer';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function ManageCustomers({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [error, setError]       = useState(false);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [customers, setCustomers] = useState(true);
    const [backdropMessage, setBackdropMessage] = useState('');

    const customerAction     = (customer, action) => {
        setBackdrop(true);
        setError(false);
        setSuccess(false);
        setComError(false);
        setBackdropMessage(action+'ing '+customer.name);
        const data = {
            customer_id: customer.customer_id,
            name: customer.name,
            action,
            user_id: user.user_id
        };

        Axios.post(getBaseURL() + 'customer_action', data)
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setSuccess(true);
                    setMessage(response.data[0].message);
                } else {
                    setError(true);
                    setMessage(response.data[0].message);
                }
                setBackdrop(false);
            })
            .catch(error => {
                setMessage('Network Error. Server Unreachable....');
                setBackdrop(false);
                setComError(true);
            });
    };

    useEffect(() => {
        document.title        = 'Customers | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            if(permissions && (permissions.includes("Can View Customers") || permissions.includes("Can View Customer"))) {
                Axios.post(getBaseURL()+'get_customers', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setCustomers(response.data);
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
            history.push('/');
        }

        return () => abortController.abort();
    }, [user, permissions, history, loading]);

    let rowsPerPage = [];
    const columns   = [
        {
            label: "Customer ID",
            name: "customer_id",
            options: {
                filter: true,
            }
        },
        {
            label: "Name",
            name: "name",
            options: {
                filter: true,
            }
        },
        {
            label: "Email Address",
            name: "email_address",
            options: {
                filter: true,
            }
        },
        {
            label: "Phone Numbers",
            name: "phone_numbers",
            options: {
                filter: true,
            }
        },
        {
            label: "Address",
            name: "address_long",
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
                customBodyRenderLite: (dataIndex) => {
                    return (
                        <>
                            <span className={customers[dataIndex].status === 'Inactive' ? 'hide' : 'show' }>
                                <Tippy content={"Block "+customers[dataIndex].first_name}>
                                    <IconButton onClick={() => customerAction(customers[dataIndex], 'Block')}>
                                        <BlockIcon color="secondary" />
                                    </IconButton>
                                </Tippy>
                            </span>
                            <span className={customers[dataIndex].status === 'Active' ? 'hide' : 'show' }>
                                <Tippy content={"Unblock "+customers[dataIndex].first_name}>
                                    <IconButton onClick={() => customerAction(customers[dataIndex], 'Unblock')}>
                                        <RefreshIcon className="colour-success" />
                                    </IconButton>
                                </Tippy>
                            </span>
                        </>
                    );
                }
            }
        },
    ];
    if (customers) {
        if (customers.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, customers.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        expandableRows: permissions && (permissions.includes("Can View Customers") || permissions.includes("Can View Customer")) ? true : false,
        renderExpandableRow: (rowData, rowMeta) => <ViewCustomer length={rowData.length} customer={customers[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Customers.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Customers Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Customers",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Customers",
            }
        }
    };
    
    return (
        <>
            { error    && <Toastrr message={message} type="error"   /> }
            { success  && <Toastrr message={message} type="success" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>{backdropMessage}. Please Wait....</span>
            </Backdrop>
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Customers" />
                {
                    loading ? <Loader /> :
                    (customers && customers.length)
                    ?
                    <MUIDataTable
                        className="customers-tbl"
                        data={customers}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Customer" plural="Customers" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageCustomers;
