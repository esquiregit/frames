import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
// import Grid from '@material-ui/core/Grid';
// import Axios from 'axios';
// import Chart from './Chart';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Loadrr from '../../Extras/DashboardLoadrr';
import styles from '../../Extras/styles';
import Sidebar from '../Layout/Sidebar';
// import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';

function Dashboard({ history }) {
    const staff   = useSelector(state => state.authReducer.staff);
    const classes = styles();
    const visible = useSelector(state => state.sidebarReducer.visible);
    
    const [state, setState] = useState(
        { 
            stats   : '',
            loading : true,
            message : '',
            comError: false,
        }
    );

    useEffect(() => {
        document.title = 'Dashboard | The Frame Shop';

        // if(staff) {
        //     Axios.post(getBaseURL() + 'get_dashboard_stats')
        //         .then(response => {
        //             setState({
        //                 ...state,
        //                 stats: response.data[0],
        //                 loading: !state.loading
        //             });
        //         })
        //         .catch(error => {
        //             setState({
        //                 ...state,
        //                 loading : !state.loading,
        //                 message : 'Network Error. Server Unreachable....',
        //                 comError: true,
        //             });
        //         });
        // } else {
        //     history.push('/');
        // }
    }, [staff, history]);
    
    return (
        <>
            <Header staff={staff} />
            <Sidebar />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                {
                    state.loading ? <Loadrr /> :
                    <>
                        {/* <Grid container spacing={3} className="mt-48">
                            <Grid item sm={12}>
                                <Chart stats={stats} />
                            </Grid>
                        </Grid> */}
                    </>
                }
            </main>
            <Footer />
        </>
    )
}

export default Dashboard;
