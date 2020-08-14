import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        height: '94.7vh',
        width: '100wh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#334455',
        animationDuration: '550ms',
        position: 'absolute',
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function DashboardLoader(props) {
    const classes = styles();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100} />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props} />
        </div>
    );
}

export default DashboardLoader;
