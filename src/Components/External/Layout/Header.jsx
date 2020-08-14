import React from 'react';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [toggle, setToggle] = React.useState(false);
    const toggleMenu = () => { setToggle(!toggle) };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className="header">
                    <Typography variant="h6" className="title">
                        <NavLink to="/">Frames</NavLink>
                    </Typography>

                    <div className="nav-links centre">
                        { 
                            toggle ? 
                            <CloseIcon
                                onClick={toggleMenu}
                                className="sm-only" /> : 
                            <MenuIcon
                                onClick={toggleMenu}
                                className="sm-only" />
                        }
                        {/* <NavLink to="/print/">Print</NavLink> */}
                        <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                        <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
                        {/* <NavLink to="/shop/">Shop</NavLink>
                        <NavLink to="/trade/">Trade</NavLink>
                        <NavLink to="/about/">About</NavLink>
                        <NavLink to="/blog/">Blog</NavLink>
                        <NavLink to="/refer-a-friend/">Refer a friend</NavLink> */}
                    </div>

                    <div className="nav-links">
                        <NavLink to="/login/">Login</NavLink>
                        <NavLink to="/cart/">
                            <Badge
                                max={99}
                                showZero
                                badgeContent={0}
                                color="primary">
                                <ShoppingCartOutlinedIcon className="fs-20" />
                            </Badge>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Collapse in={toggle} timeout="auto" unmountOnExit className="large-menu">
                {/* <NavLink to="/print/">Print</NavLink> */}
                <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
                {/* <NavLink to="/shop/">shop</NavLink>
                <NavLink to="/trade/">trade</NavLink>
                <NavLink to="/about/">About</NavLink>
                <NavLink to="/blog/">Blog</NavLink>
                <NavLink to="/refer-a-friend/">Refer a friend</NavLink> */}
            </Collapse>
        </>
    );
}

export default Header;
