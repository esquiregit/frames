import React from 'react';
import clsx from 'clsx';
import styles from '../../Extras/styles';
import { useSelector } from 'react-redux';

const Footer = () => {
    const date        = new Date();
    const startYear   = 2020;
    const currentYear = date.getFullYear();
    const visible     = useSelector(state => state.sidebarReducer.visible);
    const classes     = styles();
    
    return (
        <footer
            id="internal"
            className={clsx(classes.contentMedium, {
                [classes.contentWide]: !visible,
            })}> 
            Copyright &copy;&nbsp;
            { startYear === currentYear
            ?
            currentYear
            :
            startYear+' - '+currentYear
            }
            &nbsp;&bull; All Rights Reserved.
        </footer>
        // <footer id="internal">
        //     <AppBar position="fixed">
        //         <Toolbar className="header">
        //             {/* <Grid container spacing={3}>
        //                 <Grid item xs={12} md={9} className="selection-display-pane"></Grid>
        //             </Grid> */}

        //             <Typography variant="h6" className="title fs-19">
        //                 <NavLink to="/">The Frame Shop Limited</NavLink>
        //             </Typography>

        //             <Typography variant="h6" className="title text-right fs-15">
        //                 Copyright &copy;&nbsp;
        //                 {startYear === currentYear
        //                     ?
        //                     currentYear
        //                     :
        //                     startYear + ' - ' + currentYear
        //                 }
        //                 &nbsp;&bull; All Rights Reserved.
        //             </Typography>
        //         </Toolbar>
        //     </AppBar>
        // </footer>
            // {/* Copyright &copy;&nbsp;
            // { startYear === currentYear
            // ?
            // currentYear
            // :
            // startYear+' - '+currentYear
            // }
            // &nbsp;&bull; All Rights Reserved. */}
    );
}

export default Footer;
