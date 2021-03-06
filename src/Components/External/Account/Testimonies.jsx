import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
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
import AddTestimony from '../Account/AddTestimony';
import EditTestimony from '../Account/EditTestimony';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
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
    const [testimony, setTestimony] = useState(null);
    const [testimonies, setTestimonies]     = useState([]);
    const [showAddModal, setShowAddModal]   = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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
                print: false,
                download: false,
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
        viewColumns: false,
        print: false,
        search: false,
        page: 0,
        selectableRows: 'none',
    };
    const editTestimony = testimony => {
        setTestimony(testimony);
        setShowEditModal(true);
    };
    const deleteTestimony = id => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        const abortController = new AbortController();
        const signal  = abortController.signal;
        
        if(user.customer_id) {
            Axios.post(getBaseURL() + 'remove_testimony', { id: id }, { signal: signal })
                .then(response => {
                    testimonies.forEach(testimony => {
                        if(testimony.id !== (id)) {
                            newTestimonies.push(testimony);
                        }
                    });
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
    const closeModal  = () => { setShowAddModal(false); setShowEditModal(false); };

    return (
        <div className="back_gray">
            { error         && <Toastrr message={message} severity="error"   /> }
            { warning       && <Toastrr message={message} severity="warning" /> }
            { success       && <Toastrr message={message} severity="success" /> }
            { comError      && <Toastrr message={message} severity="info"    /> }
            { showAddModal  && <AddTestimony  closeModal={closeModal}    /> }
            { showEditModal && <EditTestimony closeModal={closeModal} testimony={testimony} /> }
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
                {
                    !comError && <Fab
                        variant="extended"
                        size="medium"
                        aria-label="add"
                        className="dark-btn tr-fab"
                        onClick={() => setShowAddModal(true)}>
                        <AddOutlinedIcon className="colour-white" />
                        <span className="ml-10">Add Testimony</span>
                    </Fab>
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Testimonies;
