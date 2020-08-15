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
// import { useSelector } from 'react-redux';
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
    date: Yup
        .string()
        .required('Please Enter Date You Will Be Available'),
    time: Yup
        .string()
        .required('Please Enter Time You Will Be Available'),
});

function Consultation({ closeModal, closeExpandable }) {
    const classes = styles();
    // const user    = useSelector(state => state.authReducer.user);
    const rand = Math.random();
    let user = {};
// console.log('rand: ', rand)
    if(rand < 0.5) {
        user = {
            name: 'Solomon Danso',
            email_address: 'solo@danso.com',
            phone_number: '0271243514',
        };
    }

    const initialValues = {
        name          : user.name || '',
        email_address : user.email_address || '',
        phone_number  : user.phone_number || '',
        date          : '',
        time          : '',
    };

    const [state, setState] = useState({
        open         : true,
        error        : false,
        values       : [],
        message      : '',
        warning      : false,
        backdrop     : false,
        comError     : false,
        showDialogue : false
    });

    const handleClose  = () => {
        setState({
            ...state,
            open : false,
        });
        closeModal();
    };
    const closeConfirm = result => {
        setState({
            ...state,
            showDialogue : false
        });
        result.toLowerCase() === 'yes' && onSubmit();
    };
    const onConfirm    = values => {
        setState({
            ...state,
            values       : values,
            showDialogue : true
        });
    };
    const onSubmit     = () => {
        setState({
            ...state,
            error    : false,
            warning  : false,
            backdrop : true,
            comError : false,
        });
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'book_consultation', state.values, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setState({
                        ...state,
                        open    : false,
                        message : response.data[0].message,
                        success : true,
                        backdrop: false
                    });
                    closeModal();
                } else if(response.data[0].status.toLowerCase() === 'warning') {
                    setState({
                        ...state,
                        message : response.data[0].message,
                        warning : true,
                        backdrop: false
                    });
                } else {
                    setState({
                        ...state,
                        error   : true,
                        message : response.data[0].message,
                        backdrop: false
                    });
                }
            })
            .catch(error => {
                setState({
                    ...state,
                    message : 'Network Error. Server Unreachable....',
                    backdrop: false,
                    comError: true,
                });
            });

        return () => abortController.abort();
    };

    return (
        <>
            { state.error        && <Toastrr message={state.message} type="error"   /> }
            { state.warning      && <Toastrr message={state.message} type="warning" /> }
            { state.comError     && <Toastrr message={state.message} type="info"    /> }
            { state.showDialogue && <ConfirmDialogue message={'Are You Sure You Want To Book?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={state.backdrop}>
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
                open={state.open}>
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
                                            disabled={user.name ? true : false}
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
                                            disabled={user.name ? true : false}
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
                                            disabled={user.name ? true : false}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number"
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                            name="phone_number" />
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
