import React from 'react';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';
import { StyledMenu, StyledMenuItem } from '../../Extras/menuStyles';

const Header = ({ user }) => {
    const [state, setState] = React.useState({
        open    : false,
        toggle  : false,
        anchorEl: null,
    });
    const handleMenu  = (event) => {
        setState({
            ...state,
            open: !state.open
        });
        if(state.open) {
            setState({
                ...state,
                anchorEl: null
            });
        } else {
            setState({
                ...state,
                anchorEl: event.currentTarget
            });
        }
    };
    const handleClose = () => {
        setState({
            ...state,
            anchorEl: null
        });
    };
    const toggleMenu  = () => {
        setState({
            ...state,
            toggle: !state.toggle
        });
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className="header">
                    <Typography variant="h6" className="title">
                        <NavLink to="/">Frames</NavLink>
                    </Typography>

                    <div className="nav-links centre">
                        { 
                            state.toggle ? 
                            <CloseIcon
                                onClick={toggleMenu}
                                className="sm-only" /> : 
                            <MenuIcon
                                onClick={toggleMenu}
                                className="sm-only" />
                        }
                        <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                        <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
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
                        <IconButton
                            aria-label="Profile And Log Out Options"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            className="options">
                            <AccountCircle />
                        </IconButton>
                        <StyledMenu
                            className="mt-6"
                            anchorEl={state.anchorEl}
                            keepMounted
                            open={Boolean(state.anchorEl)}
                            onClose={handleClose}>
                            <NavLink to="/profile/">
                                <StyledMenuItem
                                    onClose={handleClose}>
                                    <ListItemIcon>
                                        <AccountCircle fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </StyledMenuItem>
                            </NavLink>
                            <Divider />
                            <StyledMenuItem>
                                <ListItemIcon>
                                    <PowerSettingsNewIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </StyledMenuItem>
                        </StyledMenu>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Collapse in={state.toggle} timeout="auto" unmountOnExit className="large-menu">
                <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
            </Collapse>
        </>
    );
}

export default Header;
