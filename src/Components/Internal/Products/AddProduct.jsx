import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
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
    category_id : Yup
        .string()
        .required('Please Select Product Category'),
    name : Yup
        .string()
        .required('Please Enter Product Name'),
    description : Yup
        .string()
        .required('Please Enter Description'),
    price : Yup
        .string()
        .required('Please Price Per Unit'),
    quantity : Yup
        .number()
        .required('Please Quantity')
        .min(1, 'Quantity Cannot Be Less Than 1'),
    interior_width : Yup
        .number()
        .required('Please Interior Width')
        .min(1, 'Quantity Cannot Be Less Than 1 Inche'),
    interior_height : Yup
        .number()
        .required('Please Interior Height')
        .min(1, 'Quantity Cannot Be Less Than 1 Inche'),
    exterior_width : Yup
        .number()
        .required('Please Exterior Width')
        .min(1, 'Quantity Cannot Be Less Than 1 Inche'),
    exterior_height : Yup
        .number()
        .required('Please Exterior Height')
        .min(1, 'Quantity Cannot Be Less Than 1 Inche'),
    image : Yup
        .string()
        .required('Please Upload Image'),
});

function AddProduct({ closeModal }) {
    const classes = styles();
    const user    = useSelector(state => state.authReducer.user);
    
    const initialValues = {
        user_id : user.user_id,
        category_id : '',
        name : '',
        description : '',
        price : '',
        quantity : '',
        interior_width : '',
        interior_height : '',
        exterior_width : '',
        exterior_height : '',
        image : '',
    };

    const [open, setOpen]         = useState(true);
    const [error, setError]       = useState(false);
    const [values, setValues]     = useState([]);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [categories, setCategories]     = useState([]);
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
            
        let formData = new FormData();
        formData.append('user_id',         values.user_id);
        formData.append('category_id',     values.category_id);
        formData.append('name',            values.name);
        formData.append('description',     values.description);
        // formData.append('image',           imageObject);
        formData.append('price',           values.price);
        formData.append('quantity',        values.quantity);
        formData.append('interior_width',  values.interior_width);
        formData.append('interior_height', values.interior_height);
        formData.append('exterior_width',  values.exterior_width);
        formData.append('exterior_height', values.exterior_height);

        Axios.post(getBaseURL()+'add_product', formData, { signal: signal })
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
            { error        && <Toastrr message={message} type="error"   /> }
            { success      && <Toastrr message={message} type="success" /> }
            { warning      && <Toastrr message={message} type="warning" /> }
            { comError     && <Toastrr message={message} type="info"    /> }
            { showDialogue && <ConfirmDialogue message={'Are You Sure You Want To Book?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Adding Product. Please Wait....</span>
            </Backdrop>
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth='md'
                onClose={handleClose}
                aria-labelledby="customized-dialog-product"
                open={open}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onConfirm} >
                    {({ isValid, dirty, resetForm }) => (
                        <Form>
                            <DialogTitle id="customized-dialog-product" onClose={handleClose}>
                                Add Product
                            </DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={5}>
                                        
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="name"
                                                label="Name"
                                                placeholder="Name"
                                                name="name" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                select
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="categories"
                                                label="Title"
                                                name="categories">
                                                {categories.map((category, index) => (
                                                    <MenuItem key={index} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </FormikTextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="description"
                                                label="Description"
                                                placeholder="Description"
                                                name="description" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="price"
                                                label="Price Per Unit"
                                                placeholder="Price Per Unit"
                                                name="price" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                placeholder="Quantity"
                                                name="quantity"
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, step: 0.5 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="interior_width"
                                                label="Interior Width (In Inches)"
                                                placeholder="Interior Width"
                                                name="interior_width"
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, step: 0.5 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="interior_height"
                                                label="Interior Height (In Inches)"
                                                placeholder="Interior Height"
                                                name="interior_height"
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, step: 0.5 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="exterior_width"
                                                label="Exterior Width (In Inches)"
                                                placeholder="Exterior Width"
                                                name="exterior_width"
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, step: 0.5 } }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikTextField
                                                size="small"
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="exterior_height"
                                                label="Exterior Height (In Inches)"
                                                placeholder="Exterior Height"
                                                name="exterior_height"
                                                type="number"
                                                InputProps={{ inputProps: { min: 1, step: 0.5 } }} />
                                        </Grid>
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
                                <Tippy content="Add Product">
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

export default AddProduct;
