import React from 'react';
// import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
// import { MenuItems } from '../Layout/Links';

const Footer = () => {
    const date        = new Date();
    const startYear   = 2020;
    const currentYear = date.getFullYear();

    return (
        <footer id="external">
            <AppBar position="fixed">
                <Toolbar className="header">
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12} md={9} className="selection-display-pane"></Grid>
                    </Grid> */}

                    <Typography variant="h6" className="title fs-19">
                        <NavLink to="/">Frames Limited</NavLink>
                    </Typography>

                    <Typography variant="h6" className="title text-right fs-15">
                        Copyright &copy;&nbsp;
                        {startYear === currentYear
                            ?
                            currentYear
                            :
                            startYear + ' - ' + currentYear
                        }
                        &nbsp;&bull; All Rights Reserved.
                    </Typography>
                </Toolbar>
            </AppBar>
        </footer>
    );
}

export default Footer;
