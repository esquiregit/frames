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
import AddProduct from './AddProduct';
import Breadcrumb from './../Layout/Breadcrumb';
import IconButton from '@material-ui/core/IconButton';
import EditProduct from './EditProduct';
import ViewProduct from './ViewProduct';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';

function ManageProducts({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [product, setProduct]   = useState(null);
    const [comError, setComError] = useState(false);
    const [products, setProducts] = useState(true);
    const [showAddModal, setShowAddModal]   = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const closeModal   = () => { setShowAddModal(false); setShowEditModal(false); };
    const reload       = () => {
        closeModal();
        setLoading(true);
        setProducts(null);
    };
    const editProduct = product => {
        setProduct(product);
        setShowEditModal(true);
    };

    useEffect(() => {
        document.title        = 'Products | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user && user.user_id) {
            // if(permissions && (permissions.includes("Can Create Product") || permissions.includes("Can View Products") || permissions.includes("Can View Product"))) {
                Axios.post(getBaseURL()+'get_products', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setProducts(response.data);
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
            label: "Image",
            name: "image",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => <img className="table-img" src={products.length ? getBaseURL()+products[dataIndex].image : ''} alt={products[dataIndex].frame} />
            }
        },
        {
            label: "Product ID",
            name: "product_id",
            options: {
                filter: true,
            }
        },
        {
            label: "Name",
            name: "frame",
            options: {
                filter: true,
            }
        },
        {
            label: "Category",
            name: "category",
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
            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,
                print: false,
                download: false,
                customBodyRenderLite: (dataIndex) => {
                    return (
                        permissions.includes("Can Edit Product") && <Tippy content={"Edit "+products[dataIndex].frame}>
                                <IconButton onClick={() => editProduct(products[dataIndex])}>
                                    <EditOutlinedIcon color="primary" />
                                </IconButton>
                            </Tippy>
                    );
                }
            }
        },
    ];
    if (products) {
        if (products.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, products.length];
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
        expandableRows: permissions && (permissions.includes("Can View Product") || permissions.includes("Can Edit Product")) ? true : false,
        renderExpandableRow: (rowData, rowMeta) => <ViewProduct length={rowData.length} product={products[rowMeta.dataIndex]} />,
        downloadOptions: { filename: 'Products.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Products Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Products",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Products",
            }
        }
    };
    
    return (
        <>
            { comError      && <Toastrr message={message} severity="info" /> }
            { showAddModal  && <AddProduct  history={history} closeModal={closeModal} reload={reload} permissions={permissions} /> }
            { showEditModal && <EditProduct history={history} closeModal={closeModal} reload={reload} permissions={permissions} product={product} /> }
            <Header user={user} />
            <Sidebar roleName={user && user.role_name} />
            <main
                id="internal"
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Products" />
                {
                    loading ? <Loader /> :
                    (products && products.length)
                    ?
                    <MUIDataTable
                        className="products-tbl"
                        data={products}
                        columns={columns}
                        options={options} />
                    : <EmptyData error={comError} single="Product" plural="Products" />
                }
                {
                    !comError && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="dark-btn"
                        onClick={() => setShowAddModal(true)}>
                        <AddOutlinedIcon className="colour-white" />
                        <span className="ml-10">Add Product</span>
                    </Fab>
                }
            </main>
            <Footer />
        </>
    );
}

export default ManageProducts;
