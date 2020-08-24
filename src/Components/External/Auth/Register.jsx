import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { logIn } from '../../../Store/Actions/AuthActions';
import { getBack } from '../../Extras/GoBack';
import { getBaseURL } from '../../Extras/server';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    first_name : '',
    last_name : '',
    email_address : '',
    password : '',
    confirm_password : ''
}
const validationSchema = Yup.object().shape({
    first_name: Yup
            .string()
            .required('Please Enter Your First Name'),
    last_name: Yup
            .string()
            .required('Please Enter Your Last Name'),
    email_address: Yup
            .string()
            .required('Please Enter Your Username or Email Address')
            .test("Empty Strings Not Allowed", "Empty Strings Not Allowed", (value) => {
                return value && value.trim().length;
            }),
    password: Yup
            .string()
            .required('Please Enter Your Password')
            .min(8, 'Password Must Be At Least 8 Characters Long'),
    confirm_password: Yup
            .string()
            .required('Re-enter Your Password')
            .test("passwords-mismatch", "Passwords Don't Match", function(value) {
                return this.parent.password === value
            })
});

const Register = ({ history }) => {
    const user = useSelector(state => state.authReducer.user);
    
    useEffect(() => {
        user && getBack(history);
        document.title = 'Register | The Frame Shop';
    }, [history, user]);

    const classes  = styles();
    const dispatch = useDispatch();
    
    const [error, setError]       = useState(false);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    
    const onSubmit = (values, { resetForm }) => {
        setError(false);
        setSuccess(false);
        setWarning(false);
        setBackdrop(true);
        setComError(false);

        const data = {
            f : values.first_name,
            l : values.last_name,
            e : values.email_address,
            p : md5(values.password),
            cp: md5(values.confirm_password)
        };

        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        Axios.post(getBaseURL()+'add_customer', data, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    resetForm();
                    setSuccess(true);
                    setMessage(response.data[0].message);
                    dispatch(logIn(response.data[0].user));
                    setTimeout(() => history.push('/'), 2000);
                } else {
                    setError(true);
                    setMessage(response.data[0].message);
                }
                setBackdrop(false);
            })
            .catch(error => {
                setBackdrop(false);
                setComError(true);
                setMessage('Network Error. Server Unreachable....');
            });

        return () => abortController.abort();
    }

    return (
        <>
            { error    && <Toastrr message={message} severity="error"   /> }
            { success  && <Toastrr message={message} severity="success" /> }
            { warning  && <Toastrr message={message} severity="warning" /> }
            { comError && <Toastrr message={message} severity="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Creating Account. Please Wait....</span>
            </Backdrop>
            <Header />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {() => (   
                    <div className='form-div'>
                        <Form className="form">
                            <FormikTextField
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="first_name"
                                label="First Name"
                                placeholder="First Name"
                                name="first_name" />
                            <FormikTextField
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                placeholder="Last Name"
                                name="last_name" />
                            <FormikTextField
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email_address"
                                label="Email Address"
                                placeholder="Email Address"
                                name="email_address"
                                autoComplete="email address" />
                            <FormikTextField
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="password"
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type="password" />
                            <FormikTextField
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="confirm_password"
                                label="Confirm Password"
                                placeholder="Re-enter Password"
                                name="confirm_password"
                                type="password" />
                            <Button
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className='text-capitalise mt-20'
                                disableElevation>
                                Create Account
                            </Button>
                            <p>
                                already a customer?&nbsp;
                                <Link to="/login/" variant="body2">
                                login
                                </Link>
                            </p>
                        </Form>
                    </div>
                )}
            </Formik>
            <Footer />
        </>
    );
}

export default Register;
