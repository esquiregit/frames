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
import EmptyData from './../../Extras/EmptyData';
import ViewOrder from './ViewOrder';
import Breadcrumb from './../Layout/Breadcrumb';
import IconButton from '@material-ui/core/IconButton';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MUIDataTable from "mui-datatables";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function ManageOrders({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [order, setOrder]       = useState(null);
    const [orders, setOrders]     = useState(true);
    const [comError, setComError] = useState(false);

    useEffect(() => {
        document.title        = 'Orders | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user && user.user_id) {
            // if(permissions && (permissions.includes("Can View Orders") || permissions.includes("Can View Order") || permissions.includes("Can View Order"))) {
                Axios.post(getBaseURL()+'get_admin_orders', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setOrders(response.data);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            // } else {
            //     history.push('/admin/unauthorized-access/');
            // }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [user, permissions, history, loading]);

    const confirmOrder = order => {

    };

    let rowsPerPage = [];
    const columns   = [
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
            label: "Customer",
            name: "name",
            options: {
                filter: true,
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
            label: "Total Cost",
            name: "total",
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
        // {
        //     name: "Action",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         print: false,
        //         download: false,
        //         customBodyRenderLite: (dataIndex) => {
        //             return (
        //                 <Tippy content="Confirm Order">
        //                     <IconButton onClick={() => confirmOrder(orders[dataIndex])}>
        //                         <DoneAllIcon color="primary" />
        //                     </IconButton>
        //                 </Tippy>
        //             );
        //         }
        //     }
        // },
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
        responsive: 'vertical',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        expandableRows: permissions && (permissions.includes("Can View Order") || permissions.includes("Can View Orders")) ? true : false,
        renderExpandableRow: (rowData, rowMeta) => <ViewOrder length={rowData.length} order={orders[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Orders.csv', separator: ', ' },
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
        <>
            { comError      && <Toastrr message={message} severity="info" /> }
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Orders" />
                {
                    loading ? <Loader /> :
                    (orders && orders.length)
                    ?
                    <MUIDataTable
                        className="orders-tbl"
                        data={orders}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Order" plural="Orders" />
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageOrders;
