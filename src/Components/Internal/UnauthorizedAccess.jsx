import React from 'react';
import clsx from 'clsx';
import styles from '../Extras/styles';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

import Sidebar from './Layout/Sidebar';
import { useSelector } from 'react-redux';
import DesktopAccessDisabledOutlinedIcon from '@material-ui/icons/DesktopAccessDisabledOutlined';

function UnauthorizedAccess() {
    const staff   = useSelector(state => state.authReducer.staff);
    const classes = styles();
    const visible = useSelector(state => state.sidebarReducer.visible);

    return (
        <>
            <Header staff={staff} />
            <Sidebar roleName={staff && staff.role_name} />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <div className="unauthorized-access">
                    <DesktopAccessDisabledOutlinedIcon />
                    <span className="text-centre">
                        <strong>Unauthorized Access!</strong> &nbsp;you are not allowed to view requested resource
                        <br />contact the administrator if you think this is a mistake
                    </span>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default UnauthorizedAccess;
