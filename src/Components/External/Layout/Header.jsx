import React, { useState } from 'react';
import Axios from 'axios';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { logOut } from '../../../Store/Actions/RootAction';
import { getBaseURL } from '../../Extras/server';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledMenu, StyledMenuItem } from '../../Extras/menuStyles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Header = () => {
    const user     = useSelector(state => state.authReducer.user);
    const cart     = useSelector(state => state.cartReducer.cart);
    
    const classes  = useStyles();
    const history  = useHistory();
    const dispatch = useDispatch();

    const [open, setOpen]         = useState(false);
    const [toggle, setToggle]     = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [backdrop, setBackdrop] = useState(false);

    const handleMenu  = (event) => {
        setOpen(!open);

        if(open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleMenu  = () => {
        setToggle(!toggle);
    };
    const signOut     = () => {
        setAnchorEl(null);
        setBackdrop(true);

        const data = { customer_id : user.user_id }
        Axios.post(getBaseURL()+'logout', data)
            .then(() => {
                setTimeout(() => {
                    dispatch(logOut());
                    setBackdrop(false);
                    history.push('/login/');
                }, Math.floor(Math.random() * 2000));
            })
            .catch(error => {
                dispatch(logOut());
                setTimeout(() => {
                    setBackdrop(false);
                    history.push('/login/');
                }, Math.floor(Math.random() * 2000));
            });
    }

    return (
        <>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Logging Out. Please Wait....</span>
            </Backdrop>

            <AppBar position="fixed">
                <Toolbar className="header">
                    <Typography variant="h6" className="title">
                        <NavLink to="/">The Frame Shop</NavLink>
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
                        <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                        <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
                    </div>

                    <div className="nav-links">
                        {
                            user === null ? <NavLink to="/login/">Login</NavLink> :
                            <>
                                <IconButton
                                    title="Your Account"
                                    aria-label="Profile And Log Out Options"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    className="options">
                                        <Typography variant="h6" className="title sm-only">
                                            {user.first_name}
                                        </Typography>
                                        <AccountCircleOutlined className="ml-5" />
                                </IconButton>
                                <StyledMenu
                                    className="mt-6"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}>
                                    <NavLink to="/account/profile/">
                                        <StyledMenuItem
                                            onClose={handleClose}>
                                            <ListItemIcon>
                                                <AccountCircleOutlined fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Profile" />
                                        </StyledMenuItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/account/orders/">
                                        <StyledMenuItem
                                            onClose={handleClose}>
                                            <ListItemIcon>
                                                <ShoppingBasketOutlinedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Orders" />
                                        </StyledMenuItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/account/wish-list/">
                                        <StyledMenuItem
                                            onClose={handleClose}>
                                            <ListItemIcon>
                                                <FavoriteBorderOutlinedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Wish List" />
                                        </StyledMenuItem>
                                    </NavLink>
                                    <Divider />
                                    <NavLink to="/account/testimonies/">
                                        <StyledMenuItem
                                            onClose={handleClose}>
                                            <ListItemIcon>
                                                <RateReviewOutlinedIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Testimonies" />
                                        </StyledMenuItem>
                                    </NavLink>
                                    <Divider />
                                    <StyledMenuItem onClick={signOut}>
                                        <ListItemIcon>
                                            <PowerSettingsNewIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="SIgn Out" />
                                    </StyledMenuItem>
                                </StyledMenu>
                            </>
                        }
                        <NavLink to="/cart/" id="cart">
                            <Badge
                                max={99}
                                showZero
                                badgeContent={cart ? cart.length : 0}
                                color="primary">
                                <ShoppingCartOutlinedIcon className="fs-20" />
                            </Badge>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
            
            <Collapse in={toggle} timeout="auto" unmountOnExit className="large-menu">
                <NavLink to="/start-a-frame/">Start A Frame</NavLink>
                <NavLink to="/gallery-wall/">Gallery Wall</NavLink>
            </Collapse>
        </>
    );
}

export default Header;
