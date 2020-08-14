import React, { useState } from 'react';
import md5 from 'md5';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import styles from '../Extras/styles';
import Toastrr from '../Extras/Toastrr';
import Sidebar from './Layout/Sidebar/Sidebar';
import Backdrop from '@material-ui/core/Backdrop';
import Breadcrumb from './Layout/Breadcrumb';
import ConfirmDialogue from '../Extras/ConfirmDialogue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { update } from '../../Store/Actions/AuthActions';
import { getBaseURL } from '../Extras/server';
import { Form, Formik } from 'formik';
import { isPrefixValid, toCapitalCase } from '../Extras/Functions';
import { FormikTextField } from 'formik-material-fields';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import 'tippyjs/dist/tippy.css';

const validationSchema = Yup.object().shape({
    first_name: Yup
        .string()
        .required('Please Fill In Your First Name'),
    last_name: Yup
        .string()
        .required('Please Fill In Your First Name'),
    email_address: Yup
        .string()
        .email('Invalid Email Address Format')
        .required('Please Fill In Your First Name'),
    phone_number: Yup
        .string()
        .required('Please Fill In Your Phone Number')
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
        .test('invalid-prefix', 'Invalid Phone Number Prefix', value => {
            if(value === undefined) {
                return true
            } else {
                return isPrefixValid(value.substring(0, 3))
            }
        }),
    username: Yup
        .string()
        .required('Please Fill In Your Username'),
    password: Yup
        .string()
        .min(8, 'Password Must Contain At Least 8 Characters'),
    confirm_password: Yup
        .string()
        .test('password-mismatch', 'Passwords Don\'t Match', function(value) {
            return this.parent.password === value;
        }),
});

function Profile({ history }) {
    const staff    = useSelector(state => state.authReducer.staff);
    const classes  = styles();
    const visible  = useSelector(state => state.sidebarReducer.visible);
    const dispatch = useDispatch();

    const initialValues = {
        id               : staff && staff.id,
        staff_id         : staff && staff.staff_id,
        first_name       : staff && staff.first_name,
        other_name       : staff && staff.other_name,
        last_name        : staff && staff.last_name,
        email_address    : staff && staff.email_address,
        phone_number     : staff && staff.phone_number,
        phone_number_two : staff && staff.phone_number_two,
        username         : staff && staff.username,
        password         : '',
        confirm_password : '',
    };

    const [error, setError]         = useState(false);
    const [values, setValues]       = useState(null);
    const [message, setMessage]     = useState('');
    const [success, setSuccess]     = useState(false);
    const [warning, setWarning]     = useState(false);
    const [backdrop, setBackdrop]   = useState(false);
    const [comError, setComError]   = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    React.useEffect(() => {
        document.title = 'Profile | Frames';
    }, [staff, history, backdrop]);
    
    const closeConfirm = result => {
        setShowConfirm(false);
        result.toLowerCase() === 'yes' && onSubmit();
    };
    const onConfirm    = values => { setValues(values); setShowConfirm(true); };
    const onSubmit     = () => {
        setBackdrop(true);
        setError(false);
        setSuccess(false);
        setWarning(false);
        setComError(false);

        const abortController = new AbortController();
        const signal          = abortController.signal;

        const data = {
            id               : values.id,
            staff_id         : values.staff_id,
            first_name       : values.first_name,
            other_name       : values.other_name,
            last_name        : values.last_name,
            email_address    : values.email_address,
            phone_number     : values.phone_number,
            phone_number_two : values.phone_number_two,
            username         : values.username,
            password         : values.password.trim() ? md5(values.password) : '',
            confirm_password : values.confirm_password.trim() ? md5(values.confirm_password) : '',
        };
        
        if(staff) {
            Axios.post(getBaseURL()+'update_profile', data, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        let first_name = toCapitalCase(values.first_name);
                        let other_name = toCapitalCase(values.other_name);
                        let last_name  = toCapitalCase(values.last_name);

                        const newStaff = {
                            ...staff,
                            first_name       : first_name,
                            other_name       : other_name,
                            last_name        : last_name,
                            email_address    : values.email_address.toLowerCase(),
                            phone_number     : values.phone_number,
                            phone_number_two : values.phone_number_two,
                            username         : values.username,
                            name             : first_name+' '+other_name+' '+last_name
                        };
                        setSuccess(true);
                        setMessage(response.data[0].message);
                        dispatch(update(newStaff));
                    } else if(response.data[0].status.toLowerCase() === 'warning') {
                        setWarning(true);
                        setMessage(response.data[0].message);
                    } else {
                        setError(true);
                        setMessage(response.data[0].message);
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setMessage('Network Error. Server Unreachable....');
                    setBackdrop(false);
                    setComError(true);
                });
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    };
    
    return (
        <>
            { error       && <Toastrr message={message} type="error"   /> }
            { success     && <Toastrr message={message} type="success" /> }
            { warning     && <Toastrr message={message} type="warning" /> }
            { comError    && <Toastrr message={message} type="info"    /> }
            { showConfirm && <ConfirmDialogue message={'Are You Sure You Want To Update Your Profile?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Updating Your Details. Please Wait....</span>
            </Backdrop>
            <Header staff={staff} />
            <Sidebar roleName={staff && staff.role_name} />
            <main
                className={clsx(classes.contentMedium, {
                    [classes.contentWide]: !visible,
                })}>
                <Breadcrumb page="Profile" />
                <Card variant="outlined" className="p-40">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onConfirm} >
                        {({ isValid, dirty }) => (
                            <Form>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <FormikTextField
                                            disabled={true}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="staff_id"
                                            label="Staff ID"
                                            name="staff_id" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="first_name"
                                            label="First Name"
                                            placeholder="First Name"
                                            name="first_name" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="other_name"
                                            label="Middle Name"
                                            placeholder="Middle Name - Optional"
                                            name="other_name" />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="last_name"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            name="last_name" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email_address"
                                            label="Email Address"
                                            placeholder="Email Address"
                                            name="email_address" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number"
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                            name="phone_number" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number_two"
                                            label="Alternate Phone Number"
                                            placeholder="Alternate Phone Number - Optional"
                                            name="phone_number_two" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            placeholder="Username"
                                            name="username" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            type="password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            placeholder="Password"
                                            name="password" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormikTextField
                                            type="password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="confirm_password"
                                            label="Re-enter Password"
                                            placeholder="Re-enter Password"
                                            name="confirm_password" />
                                    </Grid>
                                    <Grid className="text-centre mb--20" item xs={12}>
                                        <Tippy content="Reset">
                                            <Button
                                                className="mr-5"
                                                type="reset"
                                                size="large"
                                                color="secondary">
                                                Reset
                                            </Button>
                                        </Tippy>
                                        <Tippy content="Update Profile">
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                className="ml-5"
                                                size="large"
                                                type="submit"
                                                color="primary">
                                                Save
                                            </Button>
                                        </Tippy>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </main>
            <Footer />
        </>
    );
}

export default Profile;
