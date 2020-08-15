import React from 'react';
import md5 from 'md5';
import Card from '@material-ui/core/Card';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import styles from '../Extras/styles';
import Button from '@material-ui/core/Button';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
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
    const user     = useSelector(state => state.authReducer.user);
    const classes  = styles();
    const dispatch = useDispatch();

    const initialValues = {
        id               : user && user.id,
        user_id          : user && user.user_id,
        first_name       : user && user.first_name,
        other_name       : user && user.other_name,
        last_name        : user && user.last_name,
        email_address    : user && user.email_address,
        phone_number     : user && user.phone_number,
        phone_number_two : user && user.phone_number_two,
        username         : user && user.username,
        password         : '',
        confirm_password : '',
    };

    const [state, setState] = React.useState({
        values      : {},
        error       : false,
        message     : '',
        success     : false,
        warning     : false,
        backdrop    : true,
        comError    : false,
        showConfirm : false,
    });

    React.useEffect(() => {
        document.title = 'Your Profile | The Frame Shop Accra';
    }, []);
    
    const closeConfirm = result => {
        setShowConfirm(false);
        result.toLowerCase() === 'yes' && onSubmit();
    };
    const onConfirm    = values => {
        setState({
            ...state,
            values,
            showConfirm : true,
        });
    };
    const onSubmit     = () => {
        setState({
            ...state,
            error    : false,
            success  : false,
            warning  : false,
            backdrop : true,
            comError : false
        });

        const abortController = new AbortController();
        const signal          = abortController.signal;

        const data = {
            ...state.values,
            password         : values.password.trim() ? md5(values.password) : '',
            confirm_password : values.confirm_password.trim() ? md5(values.confirm_password) : '',
        };
        
        if(user) {
            Axios.post(getBaseURL()+'update_customer', data, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        let first_name = toCapitalCase(values.first_name);
                        let last_name  = toCapitalCase(values.last_name);

                        const newStaff = {
                            ...user,
                            first_name       : first_name,
                            last_name        : last_name,
                            email_address    : values.email_address.toLowerCase(),
                            phone_number     : values.phone_number,
                            phone_number_two : values.phone_number_two,
                            name             : first_name+' '+last_name
                        };
                        setState({
                            ...state,
                            message : response.data[0].message,
                            success : true,
                        });
                        dispatch(update(newStaff));
                    } else if(response.data[0].status.toLowerCase() === 'warning') {
                        setState({
                            ...state,
                            message : response.data[0].message,
                            warning : true,
                        });
                    } else {
                        setState({
                            ...state,
                            error   : true,
                            message : response.data[0].message,
                        });
                    }
                    setBackdrop(false);
                })
                .catch(error => {
                    setState({
                        ...state,
                        message     : 'Network Error. Server Unreachable....',
                        backdrop    : false,
                        comError    : true,
                    });
                });
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    };

    return (
        <div className="back_gray">
            { state.error       && <Toastrr message={state.message} type="error"   /> }
            { state.success     && <Toastrr message={state.message} type="success" /> }
            { state.warning     && <Toastrr message={state.message} type="warning" /> }
            { state.comError    && <Toastrr message={state.message} type="info"    /> }
            { state.showConfirm && <ConfirmDialogue message={'Are You Sure You Want To Update Your Profile?'} closeConfirm={closeConfirm} /> }
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                    
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Profile;
