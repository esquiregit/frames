import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Loader from '../../Extras/Loadrr';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExternalEmptyData from '../../Extras/ExternalEmptyData';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function Testimonies({ history }) {
    const user         = useSelector(state => state.authReducer.user);
    const classes      = styles();
    let newTestimonies = [];

    const [error, setError]         = useState(false);
    const [loading, setLoading]     = useState(true);
    const [message, setMessage]     = useState('');
    const [success, setSuccess]     = useState(false);
    const [warning, setWarning]     = useState(false);
    const [backdrop, setBackdrop]   = useState(false);
    const [comError, setComError]   = useState(false);
    const [testimonies, setTestimonies] = useState([]);

    React.useEffect(() => {
        document.title        = 'Your Testimonies | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            if(user.customer_id) {
                Axios.post(getBaseURL()+'get_customer_testimonies', { customer_id: user.customer_id }, { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setTestimonies(response.data);
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
    const columns   = [
        {
            label: "Testimonies",
            name: "testimony",
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
        {
            name: "Action",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        <>
                            <Tippy content="Edit Testimony">
                                <IconButton onClick={() => editTestimony(testimonies[dataIndex])}>
                                    <EditOutlinedIcon className="colour-success" />
                                </IconButton>
                            </Tippy>
                            <Tippy content="Delete Testimony">
                                <IconButton onClick={() => deleteTestimony(testimonies[dataIndex].id)}>
                                    <DeleteOutlineOutlinedIcon color="secondary" />
                                </IconButton>
                            </Tippy>
                        </>
                    );
                }
            }
        },
    ];
    if (testimonies) {
        if (testimonies.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, testimonies.length];
        }
    } else {
        rowsPerPage = [10, 25, 50, 100];
    }
    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        download: false,
        filter: false,
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Testimonies Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Testimonies",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Testimonies",
            }
        }
    };
    const editTestimony = testimony => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        const abortController = new AbortController();
        const signal  = abortController.signal;
        
        // newTestimonies = [...testimonies];
        // newTestimonies.push(testimony);
        console.log('testimony: ', testimony)

        const data = {
            customer_id : user.customer_id,
            product_id  : testimony.product_id,
            quantity    : 1,
        };
        console.log('data: ', data)
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'add_item_to_cart', data, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        setMessage(response.data[0].message);
                        setSuccess(true);
                    } else {
                        setError(true);
                        setMessage(response.data[0].message);
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                    setBackdrop(false);
                });
        } else {
            history.push('/admin/unauthorized-access/');
        }

        return () => abortController.abort();
    };
    const deleteTestimony = id => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        const abortController = new AbortController();
        const signal  = abortController.signal;

        newTestimonies = testimonies.map(item => item.id !== id);

        // testimonies.map(item => {
        //     if(item.id !== (id)) {
        //         newTestimonies.push(item);
        //     }
        // });
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'remove_from_wishlist', { id: id }, { signal: signal })
                .then(response => {
                    setTestimonies(newTestimonies);
                    setMessage(response.data[0].message);
                    setSuccess(true);
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setComError(true);
                    setBackdrop(false);
                });
        } else {
            history.push('/admin/unauthorized-access/');
        }

        return () => abortController.abort();
    };

    return (
        <div className="back_gray">
            { error    && <Toastrr message={message} type="error"   /> }
            { warning  && <Toastrr message={message} type="warning" /> }
            { success  && <Toastrr message={message} type="success" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop  className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>{message}. Please Wait....</span>
            </Backdrop>
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    loading ? <Loader /> :
                        (testimonies && testimonies.length)
                            ?
                            <MUIDataTable
                                title="Your Testimonies"
                                data={testimonies}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={comError} message="You Have No Testimonies" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Testimonies;
