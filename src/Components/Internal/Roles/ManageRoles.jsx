import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
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
import AddRole from './AddRole';
import Breadcrumb from './../Layout/Breadcrumb';
import IconButton from '@material-ui/core/IconButton';
import EditRole from './EditRole';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function ManageRoles({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [role, setRole]         = useState(null);
    const [roles, setRoles]       = useState(true);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);
    const [showAddModal, setShowAddModal]   = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const closeModal   = () => { setShowAddModal(false); setShowEditModal(false); };
    const reload       = () => {
        closeModal();
        setLoading(true);
        setRoles(null);
    };
    const editRole = role => {
        setRole(role);
        setShowEditModal(true);
    };

    useEffect(() => {
        document.title        = 'Roles | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user && user.user_id) {
            if(permissions && (permissions.includes("Can Create Role") || permissions.includes("Can View Roles") || permissions.includes("Can View Role"))) {
                Axios.post(getBaseURL()+'get_roles', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setRoles(response.data);
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
            label: "Role",
            name: "role",
            options: {
                filter: true,
            }
        },
        {
            label: "Permissions",
            name: "permissions",
            options: {
                filter: true,
            }
        },
        {
            label: "Total Permissions",
            name: "total_permissions",
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
                print: false,
                download: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        permissions.includes("Can Edit Role") && <Tippy content={"Edit "+roles[dataIndex].frame}>
                                <IconButton onClick={() => editRole(roles[dataIndex])}>
                                    <EditOutlinedIcon color="primary" />
                                </IconButton>
                            </Tippy>
                    );
                }
            }
        },
    ];
    if (roles) {
        if (roles.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, roles.length];
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
        downloadOptions: { filename: 'Roles.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Roles Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Roles",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Roles",
            }
        }
    };
    
    return (
        <>
            { comError      && <Toastrr message={message} severity="info" /> }
            { showAddModal  && <AddRole  history={history} closeModal={closeModal} reload={reload} permissions={permissions} /> }
            { showEditModal && <EditRole history={history} closeModal={closeModal} reload={reload} permissions={permissions} role={role} /> }
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Roles" />
                {
                    loading ? <Loader /> :
                    (roles && roles.length)
                    ?
                    <MUIDataTable
                        className="roles-tbl"
                        data={roles}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Role" plural="Roles" />
                }
                {
                    !comError && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="dark-btn"
                        onClick={() => setShowAddModal(true)}>
                        <AddOutlinedIcon className="colour-white" />
                        <span className="ml-10">Add Role</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageRoles;
