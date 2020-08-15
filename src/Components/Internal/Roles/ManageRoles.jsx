import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Axios from 'axios';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loader from '../../Extras/Loadrr';
import styles from '../../Extras/styles';
import AddRole from './AddRole';
import Toastrr from '../../Extras/Toastrr';
import Sidebar from '../Layout/Sidebar/Sidebar';
import ViewRole from './ViewRole';
import EmptyData from '../../Extras/EmptyData';
import Breadcrumb from '../Layout/Breadcrumb';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function ManageRoles({ history }) {
    const staff   = useSelector(state => state.authReducer.staff);
    const classes = styles();
    const visible = useSelector(state => state.sidebarReducer.visible);

    const [roles, setRoles]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [message, setMessage]     = useState('');
    const [success, setSuccess]     = useState(false);
    const [comError, setComError]   = useState(false);
    const [showModal, setShowModal] = useState(false);

    const closeExpandable = message => {
        setLoading(true);
        setMessage(message);
        setSuccess(true);
        setShowModal(false);
        setTimeout(() => { setLoading(false); }, 2000);
    };
    const closeAddModal = () => {
        setShowModal(false);
    };

    React.useEffect(()    => {
        document.title        = 'Roles | Liberty Medical Labs';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(staff) {
            if(staff && staff.role_name.toLowerCase() === 'administrator') {
                Axios.post(getBaseURL()+'get_roles', { signal: signal })
                    .then(response => {
                        setRoles(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            } else {
                history.push('/unauthorized-access/');
            }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [staff, history, loading]);
    
    let rowsPerPage = [];
    const columns   = [
        {
            label: "Role",
            name: "name",
            options: {
                filter: true,
            }
        },
        {
            label: "Total Permissions",
            name: "total",
            options: {
                filter: true,
            }
        }
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
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        expandableRows: staff && staff.role_name.toLowerCase() === 'administrator' ? true : false,
        renderExpandableRow: (rowData, rowMeta) => <ViewRole
                                                        staff={staff}
                                                        length={rowData.length}
                                                        role={roles[rowMeta.dataIndex]}
                                                        closeExpandable={closeExpandable} />,
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
            { success   && <Toastrr message={message} type="success" /> }
            { showModal && <AddRole history={history} closeAddModal={closeAddModal} closeExpandable={closeExpandable} /> }
            <Header staff={staff} />
            <Sidebar roleName={staff && staff.role_name} />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Roles" />
                {
                    loading ? <Loader /> :
                        (roles && roles.length)
                            ?
                            <MUIDataTable
                                data={roles}
                                columns={columns}
                                options={options} />
                            :
                            <EmptyData error={comError} single="Role" plural="Roles" />
                }
                {
                    !comError && staff && staff.role_name.toLowerCase() === 'administrator' && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="dark-btn"
                        onClick={() => setShowModal(true)}>
                        <AddOutlinedIcon className="white" />
                        <span className="ml-10">Add Role</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageRoles;
