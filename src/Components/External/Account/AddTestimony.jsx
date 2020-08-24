import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import ConfirmDialogue from '../../Extras/ConfirmDialogue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../../Extras/Dialogue';
import * as Yup from 'yup';
import 'tippy.js/dist/tippy.css';

const validationSchema = Yup.object().shape({
    testimony : Yup
        .string()
        .required('Please Enter Testimony'),
});

function AddTestimony({ closeModal }) {
    const classes = styles();
    const user    = useSelector(state => state.authReducer.user);
    
    const initialValues = {
        type        : 'Front',
        testimony   : '',
        customer_id : user ? user.customer_id : '',
    };

    const [open, setOpen]         = useState(true);
    const [error, setError]       = useState(false);
    const [values, setValues]     = useState([]);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [showDialogue, setShowDialogue] = useState(false);

    const handleClose  = () => {
        setOpen(true);
        closeModal();
    };
    const closeConfirm = result => {
        setShowDialogue(false);
        result.toLowerCase() === 'yes' && onSubmit();
    };
    const onConfirm    = values => {
        setValues(values);
        setShowDialogue(true);
    };
    const onSubmit     = () => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);
        
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'add_testimony', values, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setOpen(false);
                    setSuccess(true);
                    setTimeout(() => closeModal(), 1500);
                } else if(response.data[0].status.toLowerCase() === 'warning') {
                    setWarning(true);
                } else {
                    setError(true);
                }
                setMessage(response.data[0].message);
                setBackdrop(false);
            })
            .catch(error => {
                setMessage('Network Error. Server Unreachable....');
                setComError(true);
                setBackdrop(false);
            });

        return () => abortController.abort();
    };

    return (
        <>
            { error        && <Toastrr message={message} severity="error"   /> }
            { success      && <Toastrr message={message} severity="success" /> }
            { warning      && <Toastrr message={message} severity="warning" /> }
            { comError     && <Toastrr message={message} severity="info"    /> }
            { showDialogue && <ConfirmDialogue message={'Are You Sure You Want To Add Testimony?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Adding Testimony. Please Wait....</span>
            </Backdrop>
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="customized-dialog-testimony"
                open={open}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onConfirm} >
                    {({ isValid, dirty, resetForm }) => (
                        <Form>
                            <DialogTitle id="customized-dialog-testimony" onClose={handleClose}>
                                Add Testimony
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            multiline
                                            rows={5}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="testimony"
                                            label="Testimony"
                                            placeholder="Testimony"
                                            name="testimony" />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Tippy content="Reset Form">
                                    <Button
                                        onClick={resetForm}
                                        color="secondary">
                                        Reset
                                    </Button>
                                </Tippy>
                                <Tippy content="Add Testimony">
                                    <Button
                                        type="submit"
                                        disabled={!(isValid && dirty)}
                                        color="primary">
                                        submit
                                    </Button>
                                </Tippy>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
}

export default AddTestimony;
