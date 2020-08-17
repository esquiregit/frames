import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Loader from '../../Extras/Loadrr';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import Toastrr from '../../Extras/Toastrr';
import ExternalEmptyData from '../../Extras/ExternalEmptyData';
import MUIDataTable from "mui-datatables";
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function Testimonies({ history }) {
    const user    = useSelector(state => state.authReducer.user);

    const [loading, setLoading]         = useState(true); 
    const [message, setMessage]         = useState(''); 
    const [comError, setComError]       = useState(false);
    const [testimonies, setTestimonies] = useState([]);

    React.useEffect(() => {
        document.title        = 'Your Testimonies | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
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
            history.push('/');
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
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        pagination: true,
        rowsPerPageOptions: rowsPerPage,
        resizableColumns: false,
        downloadOptions: { filename: 'Your Testimonies.csv', separator: ', ' },
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

    return (
        <div className="back_gray">
            { comError && <Toastrr message={message} type="info" /> }
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    loading ? <Loader /> :
                        (testimonies && testimonies.length)
                            ?
                            <MUIDataTable
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
