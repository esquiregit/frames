import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ message, closeConfirm }) {
    const [open, setOpen] = React.useState(true);
    const handleClose     = result => {
        setOpen(false);
        closeConfirm(result);
    };

    return (
        <div>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle id="alert-dialog-slide-title">Confirm Action</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose('No')} color="secondary">
                        No
                    </Button>
                    <Button autoFocus onClick={() => handleClose('Yes')} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}