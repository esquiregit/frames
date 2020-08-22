import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import styles from './../../Extras/styles';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Loader from './../../Extras/Loadrr';
import Toastrr from './../../Extras/Toastrr';
import Sidebar from './../Layout/Sidebar';
import EmptyData from './../../Extras/EmptyData';
import Breadcrumb from './../Layout/Breadcrumb';
import IconButton from '@material-ui/core/IconButton';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function ManageCategories({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [loading, setLoading]             = useState(true);
    const [message, setMessage]             = useState('');
    const [comError, setComError]           = useState(false);
    const [category, setCategory]           = useState(null);
    const [categories, setCategories]       = useState(true);
    const [showAddModal, setShowAddModal]   = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const closeModal   = () => { setShowAddModal(false); setShowEditModal(false); };
    const reload       = () => {
        closeModal();
        setLoading(true);
    };
    const editCategory = category => {
        setCategory(category);
        setShowEditModal(true);
    };

    useEffect(() => {
        document.title        = 'Categories | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user && user.user_id) {
            // if(permissions && (permissions.includes("Can Create Category") || permissions.includes("Can View Categories") || permissions.includes("Can View Category"))) {
                Axios.post(getBaseURL()+'get_categories', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setCategories(response.data);
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

    let rowsPerPage = [];
    const columns   = [
        {
            label: "Category ID",
            name: "category_id",
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
            label: "Description",
            name: "description",
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
                        <Tippy content={"Edit "+categories[dataIndex].name}>
                            <IconButton onClick={() => editCategory(categories[dataIndex])}>
                                <EditOutlinedIcon color="primary" />
                            </IconButton>
                        </Tippy>
                    );
                }
            }
        },
    ];
    if (categories) {
        if (categories.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, categories.length];
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
        downloadOptions: { filename: 'Categories.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Categories Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Categories",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Categories",
            }
        }
    };
    
    return (
        <>
            { comError      && <Toastrr message={message} type="info" /> }
            { showAddModal  && <AddCategory  history={history} closeModal={closeModal} reload={reload} permissions={permissions} /> }
            { showEditModal && <EditCategory history={history} closeModal={closeModal} reload={reload} permissions={permissions} category={category} /> }
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Categories" />
                {
                    loading ? <Loader /> :
                    (categories && categories.length)
                    ?
                    <MUIDataTable
                        className="categories-tbl"
                        data={categories}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Category" plural="Categories" />
                }
                {
                    !comError && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="dark-btn"
                        onClick={() => setShowAddModal(true)}>
                        <AddOutlinedIcon className="colour-white" />
                        <span className="ml-10">Add Category</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageCategories;
