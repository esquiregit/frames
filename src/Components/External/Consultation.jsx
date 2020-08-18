import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styles from '../Extras/styles';
import Toastrr from '../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import ConfirmDialogue from '../Extras/ConfirmDialogue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBaseURL } from '../Extras/server';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../Extras/Dialogue';
import { getMinBookingDate, isPrefixValid } from '../Extras/Functions';
import * as Yup from 'yup';
import 'tippy.js/dist/tippy.css';

const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Please Enter Your Name'),
    email_address: Yup
        .string()
        .required('Please Enter Your Email Address')
        .email('Invalid Email Address Format Entered'),
    phone_number: Yup
        .string()
        .required('Please Enter Your Phone Number')
        .test('non-numeric', 'Phone Number Must Contain ONLY Digits', function(value) {
            return /^[0-9]+$/.test(value);
        })
        .min(10, 'Phone Number MUST Contain 10 Digits')
        .max(10, 'Phone Number MUST Contain 10 Digits')
        .test('invalid-prefix', 'Invalid Phone Number Prefix', value => value && isPrefixValid(value.substring(0, 3))),
    phone_number_two: Yup
        .string()
        .test('non-numeric', 'Alternate Phone Number Must Contain ONLY Digits', function(value) {
            if(value === undefined) {
                return true
            } else {
                return /^[0-9]+$/.test(value);
            }
        })
        .min(10, 'Alternate Phone Number MUST Contain 10 Digits')
        .max(10, 'Alternate Phone Number MUST Contain 10 Digits')
        .test('invalid-prefix', 'Invalid Alternate Phone Number Prefix', value => {
            if(value === undefined) {
                return true
            } else {
                return isPrefixValid(value.substring(0, 3))
            }
        }),
    date: Yup
        .string()
        .required('Please Enter Date You Will Be Available'),
    time: Yup
        .string()
        .required('Please Enter Time You Will Be Available'),
});

function Consultation({ closeModal }) {
    const classes = styles();
    const user    = useSelector(state => state.authReducer.user);

    const initialValues = {
        customer_id      : user ? user.customer_id : '',
        name             : user ? user.name : '',
        email_address    : user ? user.email_address : '',
        phone_number     : user ? user.phone_number : '',
        phone_number_two : user ? user.phone_number_two : '',
        date             : '',
        time             : '',
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

        Axios.post(getBaseURL()+'add_booking', values, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setOpen(false);
                    setMessage(response.data[0].message);
                    setSuccess(true);
                    setTimeout(() => closeModal(), 1000);
                } else if(response.data[0].status.toLowerCase() === 'warning') {
                    setMessage(response.data[0].message);
                    setWarning(true);
                } else {
                    setError(true);
                    setMessage(response.data[0].message);
                }
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
            { error        && <Toastrr message={message} type="error"   /> }
            { success      && <Toastrr message={message} type="success" /> }
            { warning      && <Toastrr message={message} type="warning" /> }
            { comError     && <Toastrr message={message} type="info"    /> }
            { showDialogue && <ConfirmDialogue message={'Are You Sure You Want To Book?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Booking Consultation. Please Wait....</span>
            </Backdrop>
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth='sm'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onConfirm} >
                    {({ isValid, dirty, resetForm }) => (
                        <Form id="consultation_form">
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Book Consultation
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            disabled={user ? true : false}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            placeholder="Your Name Here...."
                                            name="name" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            disabled={user ? true : false}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email_address"
                                            label="Email Address"
                                            placeholder="Your Email Address Here...."
                                            name="email_address" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            disabled={user ? true : false}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number"
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                            name="phone_number" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            disabled={user ? true : false}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number_two"
                                            label="Alternate Phone Number - Optional"
                                            placeholder="Alternate Phone Number - Optional"
                                            name="phone_number_two" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            InputProps={{ inputProps: { min: getMinBookingDate() } }}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="date"
                                            label="Date"
                                            placeholder="Date You Will Be Available"
                                            name="date"
                                            type="date"
                                            helperText={'* Date Must Be At Least 1 Week Away'} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="time"
                                            label="Time"
                                            placeholder="Time You Will Be Available"
                                            name="time"
                                            type="time" />
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
                                <Tippy content="Book Consultation">
                                    <Button
                                        type="submit"
                                        disabled={!(isValid && dirty)}
                                        color="primary">
                                        Book
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

export default Consultation;
