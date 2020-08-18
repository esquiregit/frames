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
import { getBack } from '../../Extras/GoBack';
import { getBaseURL } from '../../Extras/server';
import { Form, Formik } from 'formik';
import { populate_cart } from '../../../Store/Actions/CartActions';
import { FormikTextField } from 'formik-material-fields';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
    // email_address : 'bismark@bediako.com.gh',
    email_address : 'esquire',
    password : 'qwertyui'
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
    const user = useSelector(state => state.authReducer.user);
    
    useEffect(() => {
        //user && getBack(history);
        document.title = 'Login | The Frame Shop';
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

        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        Axios.post(getBaseURL()+'login', { htrfdes: values.email_address, fdswaq: md5(values.password) }, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    resetForm();
                    setSuccess(true);//console.log('response.data[0]: ', response.data[0])
                    setMessage(response.data[0].message);
                    setTimeout(() => {
                        dispatch(logIn(response.data[0].user));
                        dispatch(populate_cart(response.data[0].cart));
                        if(response.data[0].type === '000') {
                            // history.push('/');
                            getBack(history);
                        } else {
                            history.push('/admin/dashboard');
                        }
                    }, 2000);
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
            { error    && <Toastrr message={message} type="error"   /> }
            { success  && <Toastrr message={message} type="success" /> }
            { warning  && <Toastrr message={message} type="warning" /> }
            { comError && <Toastrr message={message} type="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Logging In. Please Wait....</span>
            </Backdrop>

            <Header />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ isValid, dirty, isSubmitting }) => (   
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
                                // disabled={isSubmitting || !(isValid && dirty)}
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
