import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import drawerStyles from '../../Extras/drawerStyles';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import WcOutlinedIcon from '@material-ui/icons/WcOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import BurstModeOutlinedIcon from '@material-ui/icons/BurstModeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const menuItems   = [
    {
        label: 'Dashboard',
        icon : <DashboardOutlinedIcon />,
        url  : '/dashboard/'
    },
    {
        type: 'divider',
        key : 1
    },
    {
        label: 'Products',
        icon : <WallpaperIcon />,
        url  : '/products/'
    },
    {
        type: 'divider',
        key : 2
    },
    {
        label: 'Orders',
        icon : <ListAltOutlinedIcon />,
        url  : '/orders/'
    },
    {
        type: 'divider',
        key : 3
    },
    {
        label: 'Categories',
        icon : <BurstModeOutlinedIcon />,
        url  : '/categories/'
    },
    {
        type: 'divider',
        key : 4
    },
    {
        label: 'Users',
        icon : <WcOutlinedIcon />,
        url  : '/users/'
    },
    {
        type: 'divider',
        key : 5
    },
    {
        label: 'Admin',
        icon : <PeopleAltOutlinedIcon />,
        url  : '/admin/'
    },
    {
        type: 'divider',
        key : 6
    },
    {
        label: 'Roles',
        icon : <BuildOutlinedIcon />,
        url  : '/roles/'
    },
    {
        type: 'divider',
        key : 7
    },
    {
        label: 'Report',
        icon : <InsertChartOutlinedOutlinedIcon />,
        url  : '/report/'
    },
    {
        type: 'divider',
        key : 8
    },
    {
        label: 'Activities',
        icon : <VisibilityOutlinedIcon />,
        url  : '/activities/'
    },
    {
        type: 'divider',
        key : 9
    }
];

const Sidebar     = () => {
    const classes = drawerStyles();
    const visible = useSelector(state => state.sidebarReducer.visible);
    
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: visible,
                    [classes.drawerClose]: !visible,
                }),
            }}>
            <Divider />
            <List>
                {menuItems.map((menuItem) => (
                    menuItem.type
                    ?
                    <Divider key={menuItem.key} />
                    :
                    visible ?
                        <NavLink key={menuItem.label} to={menuItem.url}>
                            <ListItem button>
                                <ListItemIcon>
                                    {menuItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItem>
                        </NavLink>
                        :
                        <NavLink key={menuItem.label} to={menuItem.url} title={menuItem.label}>
                            <ListItem button>
                                <ListItemIcon>
                                    {menuItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItem>
                        </NavLink>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
