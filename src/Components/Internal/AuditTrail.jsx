import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Axios from 'axios';
import styles from '../Extras/styles';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loader from '../Extras/LoadrrInnerRow';
import Toastrr from '../Extras/Toastrr';
import Sidebar from './Layout/Sidebar';
import EmptyData from '../Extras/EmptyData';
import Breadcrumb from './Layout/Breadcrumb';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../Extras/server';
import { useSelector } from 'react-redux';

function AuditTrail({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [logs, setLogs]         = useState(null);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);

    useEffect(() => {
        document.title        = 'Activities | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user && user.user_id) {
            Axios.post(getBaseURL()+'get_activity_logs', { signal: signal })
                .then(response => {
                    setLogs(response.data);
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
    }, [user, permissions, history, loading]);

    let rowsPerPage = [];
    const columns   = [
        {
            label: "User ID",
            name: "user_id",
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
            label: "Role",
            name: "role_name",
            options: {
                filter: true,
            }
        },
        {
            label: "Activity",
            name: "activity",
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
    if (logs) {
        if (logs.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, logs.length];
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
        downloadOptions: { filename: 'Logs.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Logs Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Logs",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Logs",
            }
        }
    };
    
    return (
        <>
            { comError      && <Toastrr message={message} type="info" /> }
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Activities" />
                {
                    loading ? <Loader /> :
                    (logs && logs.length)
                    ?
                    <MUIDataTable
                        className="activities-tbl"
                        data={logs}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Activity Logs" plural="Activity Logs" />
                }
            </main>
            <Footer />
        </>
    );
}

export default AuditTrail;
