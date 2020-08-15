import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logOut } from '../../../Store/Actions/RootAction';
import { getBaseURL } from '../../Extras/server';
import { makeStyles } from '@material-ui/core/styles';
import { toggleSidebar } from '../../../Store/Actions/SidebarActions';
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

const Header = (props) => {
    const { staff } = props;
    const classes   = useStyles();
    const history   = useHistory();
    const visible   = useSelector(state => state.sidebarReducer.visible);
    const dispatch  = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen]         = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    const handleDrawerOpen = () => { dispatch(toggleSidebar()); };
    const handleClose      = () => { setAnchorEl(null); };
    const handleMenu       = (event) => {
        setOpen(!open);
        if(open) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const signOut          = () => {
        setAnchorEl(null);
        setBackdrop(true);
        const data = { staff_id : staff && staff.staff_id }
        Axios.post(getBaseURL()+'logout', data)
            .then(() => {
                dispatch(logOut());
                setBackdrop(false);
                history.push('/');
            })
            .catch(error => {
                dispatch(logOut());
                setBackdrop(false);
                history.push('/');
            });;
    }

    useEffect(()  => {
        return () => { setBackdrop(false); }
    }, []);
    
    return (
        <>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Logging Out. Please Wait....</span>
            </Backdrop>

            <div id="internal-header" className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar className="header">
                        <IconButton
                            title={visible ? 'Minimize' : "Maximize"}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}>
                            { visible ? <ArrowBackIosIcon className="cursor-pointer" /> : <ArrowForwardIosIcon className="cursor-pointer" />}
                        </IconButton>
                        <Typography variant="h6" className="title">
                            <NavLink to="/dashboard/">The Frame Shop</NavLink>
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="Profile And Log Out Options"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                className="options">
                                <Typography variant="h6" className={classes.title}>
                                    {staff ? staff.name : 'Esquire'}
                                </Typography>
                                <AccountCircle  className="ml-10" />
                            </IconButton>

                            <StyledMenu
                                className="mt-6"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
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
                                <StyledMenuItem onClick={signOut}>
                                    <ListItemIcon>
                                        <PowerSettingsNewIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary="Log Out" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    );
}

export default Header;
