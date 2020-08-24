import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Tippy from '@tippyjs/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Switch from '@material-ui/core/Switch';
import styles from '../../Extras/styles';
import Toastrr from '../../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormErrorMessage from '../../Extras/FormErrorMessage';
import DialogContentText from '@material-ui/core/DialogContentText';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { getBaseURL } from '../../Extras/server';
import { useSelector } from 'react-redux';
import { get_permissions, get_permission_for_role } from '../../Extras/Functions';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../../Extras/Dialogue';
import 'tippy.js/dist/tippy.css';

const icon        = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EditRole({ role, closeEditModal, closeExpandable }) {
    const staff   = useSelector(state => state.authReducer.staff);
    const classes = styles();
    
    const [values, setValues] = useState([
        {
            role        : role.name, 
            permissions : get_permission_for_role(role.permissions.split(', ')),
        }
    ]);
    
    const [open, setOpen]                   = useState(true);
    const [error, setError]                 = useState(false);
    const [message, setMessage]             = useState('');
    const [warning, setWarning]             = useState(false);
    const [backdrop, setBackdrop]           = useState(false);
    const [comError, setComError]           = useState(false);
    const [formValid, setFormValid]         = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectAllPermissions, setSelectAllPermissions]   = useState(false);
    const [permissionOptions, setPermissionOptions] = useState([]);

    const [roleError, setRoleError]              = useState('');
    const [roleTouched, setRoleTouched]          = useState(false);
    const [permissionsError, setPermissionsError]     = useState('');
    const [permissionsTouched, setPermissionsTouched] = useState(false);

    useEffect(() => {
        setPermissionOptions(get_permissions());
        // if (!staff) {
        //     history.push('/');
        // } else {
        //     if (staff.role_name.toLowerCase() !== 'administrator') {
        //         history.push('/unauthorized-access/');
        //     } else {
        //         setPermissionOptions(get_permissions());
        //     }
        // }
    }, [staff, selectAllPermissions]);
    
    const closeConfirm    = () => { setIsConfirmOpen(false); }
    const handleClose     = () => { setOpen(false); closeEditModal(); }
    const handleChange    = (event, newValue) => {
        if(event) {
            const name  = event.target.name;
            const value = event.target.value;
            const file  = event.target.files && event.target.files[0];
            
            let newArr  = [...values];
            if(newValue) {
                newArr[0]['permissions'] = newValue;
                setSelectAllPermissions(false);
            } else if(name === 'subject') {
                newArr[0]['subject'] = value;
            } else if(name === 'attachment') {
                newArr[0]['attachment'] = file;
            } else if(name === 'role') {
                newArr[0]['role'] = value;
            }
            
            setValues(newArr);
            setFormValid(validateValues());
        }
    }
    const flipSwitch      = () => {
        setSelectAllPermissions(!selectAllPermissions);
        const permissions = values[0].permissions;
        const role        = values[0].role;
        // console.log('selectAllPermissions: ',selectAllPermissions);
        if(((!selectAllPermissions) && permissions.length === 0) && role.length > 0) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        if(selectAllPermissions) {//console.log(role)
            if(role && role.toLowerCase() !== 'administrator') {
                setPermissionsTouched(true);
                setPermissionsError('Only Administrator Can Have All Permisiions');
            } else {
                setPermissionsError('');
                setPermissionsTouched(false);
            }
        }
        emptyPermissions();
    };
    const emptyPermissions= () => {
        values[0].permissions = [];
    };
    const validateValues  = (event) => {
        let status        = true;
        const permissions = values[0].permissions;
        const role        = values[0].role;
        
        if(event) {
            if(event.target.name === 'role') {
                setRoleTouched(true);
            } else {
                setPermissionsTouched(true);
            }
        }

        if(selectAllPermissions) {
            if(role !== undefined && role.length === 0) {
                status = false;
                setRoleError('Please Fill In Role Name');
            } else {
                setRoleError('');
            }
            if((role !== undefined && role.toLowerCase() !== 'administrator')) {
                setPermissionsError('Only Administrator Can Have All Permisiions');
            } else {
                setPermissionsError('');
            }
        } else {
            if(permissions !== undefined && permissions.length === 0) {
                status = false;
                setPermissionsError('Please Select A Permission');
            } else {
                setPermissionsError('');
            }
            if((role !== undefined && role.toLowerCase() !== 'administrator') && (permissions !== undefined && permissions.length === (permissionOptions.length - 5))) {
                setPermissionsError('Only Administrator Can Have All Permisiions');
            } else {
                setPermissionsError('');
            }
            if(role !== undefined && role.length === 0) {
                status = false;
                setRoleError('Please Type Message To Send');
            } else {
                setRoleError('');
            }
        }
        
        return status;
    };
    const onConfirm       = (event) => {
        event.preventDefault();
        setIsConfirmOpen(true);
    };
    const onSubmit        = (action) => {
        setIsConfirmOpen(false);
        
        if(action.toLowerCase() === 'yes') {
            setError(false);
            setWarning(false);
            setBackdrop(true);
            setComError(false);

            const permissionsArr = values[0].permissions;
            let permissions      = [];
            for (let index = 0; index < permissionsArr.length; index++) {
                permissions.push(permissionsArr[index].value);
            }
            
            let formData = new FormData();
            formData.append('permissions', permissions);
            if(permissions) {
                for (let index = 0; index < permissions.length; index++) {
                    formData.append('permissions[]', permissions[index]);
                }
            }
            formData.append('id',             role.id);
            formData.append('staff',          staff.staff_id);
            formData.append('role',           values[0].role);
            formData.append('all_permissions',selectAllPermissions);
            
            Axios.post(getBaseURL()+'edit_role', formData)
                .then(response => {
                    if(response.data[0].status.toLowerCase() === 'success') {
                        resetForm();
                        handleClose();
                        closeExpandable(response.data[0].message);
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
                    setComError(true);
                    setBackdrop(false);
                    setMessage('Network Error. Server Unreachable....');
                });
        }
    };
    const resetForm       = () => {
        setValues([
            {
                role        : role.name, 
                permissions : get_permission_for_role(role.permissions.split(', ')),
            }
        ]);
        setFormValid(false);
    }
    
    return (
        <>
            { error    && <Toastrr message={message} severity="error"   /> }
            { warning  && <Toastrr message={message} severity="warning" /> }
            { comError && <Toastrr message={message} severity="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>Updating Role. Please Wait....</span>
            </Backdrop>
            { isConfirmOpen &&
                <div>
                    <Dialog
                        open={isConfirmOpen}
                        keepMounted
                        onClose={closeConfirm}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                        TransitionComponent={Transition}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description" >
                        <DialogTitle id="alert-dialog-slide-title">Confirm Action</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are You Sure You Want To Update Role?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => onSubmit('No')} color="secondary">
                                No
                            </Button>
                            <Button autoFocus onClick={() => onSubmit('Yes')} color="primary">
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
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
                <form onSubmit={onConfirm} className="role-form">
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Edit Role
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={selectAllPermissions}
                                            onChange={flipSwitch}
                                            name="Select All Permissions"
                                            inputProps={{ 'aria-label': 'Select All Permissions' }} />
                                        }
                                    label="Select All Permissions" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={roleError && roleTouched ? "error-input" : ""}
                                    onBlur={validateValues}
                                    onChange={e => handleChange(e)}
                                    value={values[0].role}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="role"
                                    label="Role"
                                    placeholder="Role"
                                    name="role" />
                                {roleError && roleTouched && <FormErrorMessage message={roleError} />}
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    limitTags={5}
                                    className={!selectAllPermissions && permissionsTouched && permissionsError ? "error-input" : ""}
                                    disabled={selectAllPermissions}
                                    onBlur={validateValues}
                                    onChange={(e, newValue) => handleChange(e, newValue)}
                                    value={values[0].permissions}
                                    multiple
                                    options={permissionOptions}
                                    id="permissions"
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.label}
                                    getOptionDisabled={(option) => option.disabled}
                                    getOptionSelected={(option, value) => option.label === value.label}
                                    renderOption={(option, { selected }) => option.disabled ?
                                    option.label
                                    : (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected} />
                                            {option.label}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="outlined" label="Permissions" placeholder="Permissions" />
                                    )}
                                />
                                {!selectAllPermissions && permissionsTouched && permissionsError && <FormErrorMessage className="mt-30" message={permissionsError} />}
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
                        <Tippy content="Update Role">
                            <Button
                                disabled={!formValid}
                                type="submit"
                                color="primary">
                                Update Role
                            </Button>
                        </Tippy>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default EditRole;
