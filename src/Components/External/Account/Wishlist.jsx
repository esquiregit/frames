import React from 'react';
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

function WishList({ history }) {
    const user    = useSelector(state => state.authReducer.user);
    const user_id = '123'; 

    const [state, setState] = React.useState({
        wishlist : [],
        loading  : true,
        message  : '',
        comError : false,
    })

    React.useEffect(() => {
        document.title        = 'Your Wish List | The Frame Shop Accra';
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        // if(user) {
            Axios.post(getBaseURL()+'get_wishlist', { user_id: user_id }, { signal: signal })
            // Axios.post(getBaseURL()+'get_wishlist', { user_id: user.user_id }, { signal: signal })
                .then(response => {
                    setState({
                        ...state,
                        wishlist : response.data,
                        loading  : false,
                    });
                })
                .catch(error => {
                    setState({
                        ...state,
                        loading  : false,
                        message  : 'Network Error. Server Unreachable....',
                        comError : true,
                    });
                });
        // } else {
        //     history.push('/');
        // }

        return () => abortController.abort();
    }, [history, state, user]);

    let rowsPerPage = [];
    const columns   = [
        {
            label: "Frame",
            name: "frame",
            options: {
                filter: true,
            }
        },
        {
            label: "Image",
            name: "image",
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
    if (state.wishlist) {
        if (state.wishlist.length < 100) {
            rowsPerPage = [10, 25, 50, 100];
        } else {
            rowsPerPage = [10, 25, 50, 100, state.wishlist.length];
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
        downloadOptions: { filename: 'Your Wish List.csv', separator: ', ' },
        page: 0,
        selectableRows: 'none',
        textLabels: {
            body: {
                noMatch: "No Matching Wish List Found. Change Keywords and Try Again....",
                columnHeaderTooltip: column => `Sort By ${column.label}`
            },
            toolbar: {
                search: "Search Wish List",
                viewColumns: "Show/Hide Columns",
                filterTable: "Filter Wish List",
            }
        }
    };

    return (
        <div className="back_gray">
            { state.comError && <Toastrr message={state.message} type="info" /> }
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                {
                    state.loading ? <Loader /> :
                        (state.wishlist && state.wishlist.length)
                            ?
                            <MUIDataTable
                                data={state.wishlist}
                                columns={columns}
                                options={options} />
                            : <ExternalEmptyData error={state.comError} single="Wish List" plural="Wish List" />
                }
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default WishList;
