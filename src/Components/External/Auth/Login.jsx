import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import styles from '../../Extras/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Toastrr from '../../Extras/Toastrr';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { logIn } from '../../../Store/Actions/AuthActions';
import { getBaseURL } from '../../Extras/server';
import { Form, Formik } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    email_address : '',
    password : ''
}
const validationSchema = Yup.object().shape({
    email_address: Yup
            .string()
            .required('Please Enter Your Username or Email Address')
            .test("Empty Strings Not Allowed", "Empty Strings Not Allowed", (value) => {
                return value && value.trim().length;
            }),
    password: Yup
            .string()
            .required('Please Enter Your Password')
            .min(8, 'Password Must Be At Least 8 Characters Long')
});

const Login = ({ history }) => {
    const classes    = styles();
    const dispatch   = useDispatch();
    
    const [state, setState] = useState({
        error    : false,
        message  : '',
        success  : false,
        warning  : false,
        backdrop : false,
        comError : false,
    });
    
    useEffect(() => {
        document.title = 'Login | Frames';
    }, [history]);

    const onSubmit = (values, { resetForm }) => {
        setState({
            ...state,
            error    : false,
            success  : false,
            warning  : false,
            backdrop : true,
            comError : false,
        });

        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        Axios.post(getBaseURL()+'login', { htrfdes: values.email_address, fdswaq: md5(values.password) }, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    resetForm();
                    setState({
                        ...state,
                        success : true,
                        message : response.data[0].message,
                    });
                    dispatch(logIn(response.data[0].user, response.data[0].permissions));
                    setTimeout(() => history.push('/dashboard/'), 2000);
                } else {
                    setState({
                        ...state,
                        error   : true,
                        message : response.data[0].message,
                    });
                }
                setState({
                    ...state,
                    backdrop : false,
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    message  : 'Network Error. Server Unreachable....',
                    backdrop : false,
                    comError : true,
                });
            });

        return () => abortController.abort();
    }

    return (
        <>
            { state.error    && <Toastrr message={state.message} type="error"   /> }
            { state.success  && <Toastrr message={state.message} type="success" /> }
            { state.warning  && <Toastrr message={state.message} type="warning" /> }
            { state.comError && <Toastrr message={state.message} type="info"    /> }
            <Backdrop className={classes.backdrop} open={state.backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Logging In. Please Wait....</span>
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
                            <Button
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className='text-capitalise mt-20'
                                disableElevation>
                                Log In
                            </Button>
                            <p>
                                are you a new customer?&nbsp;
                                <Link to="/sign-up/" variant="body2">
                                sign up
                                </Link>
                            </p>
                            <Link to="/password-recovery/" variant="body2">
                                Forgot password?
                            </Link>
                        </Form>
                    </div>
                )}
            </Formik>
            <Footer />
        </>
    );
}

export default Login;
