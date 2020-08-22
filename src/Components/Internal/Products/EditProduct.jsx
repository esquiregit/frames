import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Loader from './../../Extras/Loadrr';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
        .string(),
        // .required('Please Select Product Category'),
    name : Yup
        .string()
        .required('Please Enter Product Name'),
    description : Yup
        .string()
        .required('Please Enter Description'),
    price : Yup
        .number()
        .required('Please Price Per Unit')
        .min(1, 'Price Cannot Be Less Than 1'),
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

function EditProduct({ product, history, closeModal, reload, permissions }) {
    const classes    = styles();
    const user       = useSelector(state => state.authReducer.user);
    const displayImg = getBaseURL()+product.image;
    
    const initialValues = {
        user_id : user.user_id,
        id: product.id,
        product_id: product.product_id,
        category_id: product.category_id,
        name: product.frame,
        description: product.description,
        price: product.price_raw,
        quantity: product.quantity,
        interior_width: product.interior_width,
        interior_height: product.interior_height,
        exterior_width: product.exterior_width,
        exterior_height: product.exterior_height,
        image: product.image,
    };

    const [open, setOpen]         = useState(true);
    const [error, setError]       = useState(false);
    const [values, setValues]     = useState([]);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('');
    const [success, setSuccess]   = useState(false);
    const [warning, setWarning]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [categories, setCategories]     = useState([]);
    const [imageObject, setImageObject]   = useState('');
    const [imagePreview, setImagePreview] = useState(displayImg);
    const [showDialogue, setShowDialogue] = useState(false);
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        if(user) {
            if(permissions && (permissions.includes("Can Edit Product"))) {
                Axios.post(getBaseURL()+'get_categories_dropdown', { signal: signal })
                    .then(response => {
                        setLoading(false);
                        setCategories(response.data);
                    })
                    .catch(error => {
                        setLoading(false);
                        setMessage('Network Error. Server Unreachable....');
                        setComError(true);
                    });
            } else {
                history.push('/admin/unauthorized-access/');
            }
        } else {
            history.push('/');
        }

        return () => abortController.abort();
    }, [user, permissions, history, loading]);

    const handleClose  = () => {
        setOpen(true);
        closeModal();
    };
    const displayImage = (event) => {
        setImageObject(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
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
        formData.append('id',              values.id);
        formData.append('user_id',         values.user_id);
        formData.append('product_id',      values.product_id);
        formData.append('category_id',     values.category_id);
        formData.append('name',            values.name);
        formData.append('description',     values.description);
        formData.append('image',           imageObject);
        formData.append('price',           values.price);
        formData.append('quantity',        values.quantity);
        formData.append('interior_width',  values.interior_width);
        formData.append('interior_height', values.interior_height);
        formData.append('exterior_width',  values.exterior_width);
        formData.append('exterior_height', values.exterior_height);

        Axios.post(getBaseURL()+'edit_product', formData, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setSuccess(true);
                    setMessage(response.data[0].message);
                    setTimeout(() => { setOpen(false); reload(); }, 1500);
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
            { showDialogue && <ConfirmDialogue message={'Are You Sure You Want To Update Product?'} closeConfirm={closeConfirm} /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Updating Product. Please Wait....</span>
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
                {
                    loading ? <Loader /> :
                    (categories && categories.length)
                    &&
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onConfirm} >
                        {({ isValid, dirty, resetForm }) => (
                            <Form>
                                <DialogTitle id="customized-dialog-product" onClose={handleClose}>
                                    Update Product
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Grid container spacing={3}>
                                        <Grid className="fullHeight" item xs={12} sm={5}>
                                            <div className="fullHeightDiv">
                                                <img
                                                    src={imagePreview}
                                                    width="90%"
                                                    height="70%"
                                                    alt=""
                                                    className="border-radius" />
                                            </div>
                                            <div>
                                                <Tippy content="Upload Product Image">
                                                    <label htmlFor="image">
                                                        <IconButton
                                                            color="primary"
                                                            aria-label="upload picture"
                                                            component="span">
                                                            <PhotoCamera />
                                                        </IconButton>
                                                    </label>
                                                </Tippy>
                                                <TextField
                                                    onChange={displayImage}
                                                    className="hidden"
                                                    id="image"
                                                    name="image"
                                                    type="file" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={7}>
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
                                                <FormikTextField
                                                    size="small"
                                                    select
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="category_id"
                                                    label="Category"
                                                    name="category_id">
                                                    {categories.map((category, index) => (
                                                        <MenuItem key={index} value={category.category_id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </FormikTextField>
                                            </Grid>
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                            <Grid item sm={12}>
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
                                    <Tippy content="Update Product">
                                        <Button
                                            type="submit"
                                            // disabled={!(isValid && dirty)}
                                            color="primary">
                                            submit
                                        </Button>
                                    </Tippy>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                }
            </Dialog>
        </>
    );
}

export default EditProduct;
