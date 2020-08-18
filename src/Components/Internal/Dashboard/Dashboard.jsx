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
import { getBack } from '../../Extras/GoBack';

function Dashboard({ history }) {
    const user    = useSelector(state => state.authReducer.user);
    const classes = styles();
    const visible = useSelector(state => state.sidebarReducer.visible);

    const [stats, setStats]       = useState(true);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [comError, setComError] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard | The Frame Shop';

        if(user) {
            if(user.user_id) {
                // Axios.post(getBaseURL() + 'get_dashboard_stats')
                //     .then(response => {
                //         setState({
                //             ...state,
                //             stats: response.data[0],
                //             loading: !loading
                //         });
                //     })
                //     .catch(error => {
                //         setState({
                //             ...state,
                //             loading : !loading,
                //             message : 'Network Error. Server Unreachable....',
                //             comError: true,
                //         });
                //     });
            } else {
                getBack(history);
                // history.push('/unauthorized-access/');
            }
        } else {
            history.push('/');
        }
    }, [user, history]);
    
    return (
        <>
            <Header user={user} />
            <Sidebar />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                {
                    loading ? <Loadrr /> :
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
