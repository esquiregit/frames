import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import clsx from 'clsx';
import Axios from 'axios';
import styles from './../../Extras/styles';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Loader from './../../Extras/LoadrrInnerRow';
import Toastrr from './../../Extras/Toastrr';
import Sidebar from './../Layout/Sidebar';
import EmptyData from './../../Extras/EmptyData';
import AddProduct from './AddProduct';
import Breadcrumb from './../Layout/Breadcrumb';
import ViewProduct from './ViewProduct';
import MUIDataTable from "mui-datatables";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { getBaseURL } from './../../Extras/server';
import { useSelector } from 'react-redux';

function ManageProducts({ history }) {
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const permissions = useSelector(state => state.authReducer.permissions);

    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);
    const [products, setProducts] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const closeModal  = () => { setShowModal(false); };
    const reload      = () => {
        closeModal();
        setLoading(true);
    };

    useEffect(() => {
        document.title        = 'Products | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            if(permissions && (permissions.includes("Can View Products") || permissions.includes("Can View Product"))) {
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
            } else {
                history.push('/admin/unauthorized-access/');
            }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [user, permissions, history, loading, showModal]);

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
        renderExpandableRow: (rowData, rowMeta) => <ViewProduct
                                                        history={history}
                                                        length={rowData.length}
                                                        product={products[rowMeta.dataIndex]}
                                                        reload={reload}
                                                        permissions={permissions} />,
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
            { comError  && <Toastrr message={message} type="info" /> }
            { showModal && <AddProduct history={history} closeModal={closeModal} reload={reload} permissions={permissions} /> }
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
                        onClick={() => setShowModal(true)}>
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
