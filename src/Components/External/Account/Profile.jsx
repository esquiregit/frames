import React from 'react';
import md5 from 'md5';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Footer from './../Layout/Footer';
import Header from './../Layout/Header';
import styles from '../../Extras/styles';
import Button from '@material-ui/core/Button';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import ConfirmDialogue from '../../Extras/ConfirmDialogue';
import CircularProgress from '@material-ui/core/CircularProgress';
import { update } from '../../../Store/Actions/AuthActions';
import { getBaseURL } from '../../Extras/server';
import { Form, Formik } from 'formik';
import { isPrefixValid, toCapitalCase, getRegions } from '../../Extras/Functions';
import { FormikTextField } from 'formik-material-fields';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import 'tippy.js/dist/tippy.css';

const validationSchema = Yup.object().shape({
    first_name: Yup
        .string()
        .required('Please Enter Your First Name'),
    last_name: Yup
        .string()
        .required('Please Enter Your First Name'),
    email_address: Yup
        .string()
        .email('Invalid Email Address Format')
        .required('Please Enter Your First Name'),
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
        .test('invalid-prefix', 'Invalid Phone Number Prefix', value => {
            if(value === undefined) {
                return true
            } else {
                return isPrefixValid(value.substring(0, 3))
            }
        }),
    address: Yup
        .string()
        .required('Please Enter Your Address'),
    // district: Yup
    //     .string()
    //     .required('Please Enter Your Address'),
    city: Yup
        .string()
        .required('Please Enter Your Address'),
    region: Yup
        .string()
        .required('Please Enter Your Address'),
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
        id               : user ? user.id : '',
        user_id          : user ? user.user_id : '',
        first_name       : user ? user.first_name : '',
        last_name        : user ? user.last_name : '',
        email_address    : user ? user.email_address : '',
        phone_number     : user ? user.phone_number : '',
        phone_number_two : user ? user.phone_number_two : '',
        address          : user ? user.address : '',
        city             : user ? user.city : '',
        district         : user ? user.district : '',
        region           : user ? user.region : '',
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
        document.title = 'Your Profile | The Frame Shop';
    }, []);
    
    const closeConfirm = result => {
        setState({
            ...state,
            showConfirm : false,
        });
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
            password         : state.values.password.trim() ? md5(state.values.password) : '',
            confirm_password : state.values.confirm_password.trim() ? md5(state.values.confirm_password) : '',
        };
        console.log('data: ', data)
        if(user) {
            Axios.post(getBaseURL()+'update_customer', data, { signal: signal })
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        let first_name = toCapitalCase(state.values.first_name);
                        let last_name  = toCapitalCase(state.values.last_name);

                        const newStaff = {
                            ...user,
                            first_name       : first_name,
                            last_name        : last_name,
                            email_address    : state.values.email_address.toLowerCase(),
                            phone_number     : state.values.phone_number,
                            phone_number_two : state.values.phone_number_two,
                            name             : first_name+' '+last_name
                        };
                        setState({
                            ...state,
                            message : response.data[0].message,
                            success : true,
                            backdrop: false,
                        });
                        dispatch(update(newStaff));
                    } else if(response.data[0].status.toLowerCase() === 'warning') {
                        setState({
                            ...state,
                            message : response.data[0].message,
                            warning : true,
                            backdrop: false,
                        });
                    } else {
                        setState({
                            ...state,
                            error   : true,
                            message : response.data[0].message,
                            backdrop: false,
                        });
                    }
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
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onConfirm} >
                        {({ isValid, dirty }) => (
                            <Form>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="first_name"
                                            label="First Name"
                                            placeholder="First Name"
                                            name="first_name" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="last_name"
                                            label="Last Name"
                                            placeholder="Last Name"
                                            name="last_name" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="email_address"
                                            label="Email Address"
                                            placeholder="Email Address"
                                            name="email_address" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
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
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="phone_number_two"
                                            label="Alternate Phone Number"
                                            placeholder="Alternate Phone Number - Optional"
                                            name="phone_number_two" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            placeholder="Address"
                                            name="address" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="district"
                                            label="District"
                                            placeholder="District"
                                            name="district" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="city"
                                            label="City"
                                            placeholder="City"
                                            name="city" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            select
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            label="Region"
                                            id="region"
                                            name="region">
                                            {getRegions().map((region, index) => (
                                                <MenuItem key={index} value={region}>
                                                    {region}
                                                </MenuItem>
                                            ))}
                                        </FormikTextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            placeholder="Password"
                                            name="password" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormikTextField
                                            size="small"
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
        </div>
    )
}

export default Profile;
