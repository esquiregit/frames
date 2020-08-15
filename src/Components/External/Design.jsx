import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Frame from '../../assets/frame2.jpg';
import Button from '@material-ui/core/Button';
import Header from './Layout/Header';
import Toastrr from '../Extras/Toastrr';
import Collapse from '@material-ui/core/Collapse';
import Dropzone from 'react-dropzone';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import UploadImage from './Modals/UploadImage';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { getBaseURL } from '../Extras/server';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getMailInMethods, getServices, getQuantities, getMatSize, getMatStyle, getMatMaterial, getMountingMethod, getAcrylicType, getSpacer, getHangingHardware, getFrameModel } from '../Extras/Functions';

const styles = makeStyles((theme) => ({
    selectionDisplay: {
        backgroundImage: `url(${Frame})`,
    },
}));

const ACCEPTED_TYPES       = "image/x-png, image/png, image/jpg, image/jpeg";
const ACCEPTED_TYPES_ARRAY = ACCEPTED_TYPES.split(', ').map(type => type);

function Selection({ match }) {
    const classes  = styles();
    const MAX_SIZE = 1024*1024;
    const frame_id = match.params.frame_id;
    const user     = useSelector(state => state.authReducer.user);
    
    const [state, setState] = useState({
        frame               : [],
        quantity            : 1,
        service             : 'Full Service',
        mailInMethod        : 'Flat Mailer',
        artDimensionWidth   : '8',
        artDimensionHeight  : '10',
        unprocessedImage    : null,
        previewImage        : null,
        interior            : '11x13',
        frameModel          : 'Gallery Walnut',
        matStyle            : 'No Mat',
        matSize             : '0 1/2 inches',
        matMaterial         : '4-Ply Paper White',
        mountingMethod      : 'Hinge Mount to Hidden Lift',
        acrylicType         : 'Standard Acrylic',
        spacer              : 'Shadowbox',
        hangingHardware     : 'Wire',
        previewImageWidth   : '',
        previewImageHeight  : '',
        filename            : 'No Image Selected',
        fileWidth           : null,
        fileHeight          : null,
        message             : '',
        error               : false,
        openEditModal       : false,
        showMailInMethod    : false,
        showArtDimension    : false,
        showPreviewImage    : false,
        showFrameModel      : false,
        showMatStyle        : false,
        showMatSize         : false,
        showMatMaterial     : false,
        showMountingMethod  : false,
        showAcrylicType     : false,
        showSpacer          : false,
        showHangingHardware : false,
    });
    
    useEffect(() => {
        document.title        = 'Design Your Frame | Frames';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'get_frame', { frame_id }, { signal: signal })
            .then(response => {
                setState({
                    ...state,
                    frame   : response.data,
                    loading : false,
                });
            })
            .catch(error => {
                setState({
                    ...state,
                    loading : false,
                    message : 'Network Error. Server Unreachable....',
                    comError: true,
                });
            });

        return () => abortController.abort();
    // }, [state, frame_id]);
    }, [frame_id]);
    
    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };
    const handleToggle = type => {
        setState({
            ...state,
            [type]: state[type] ? false : true
        });
    };
    const closeUploadImageModal = () => {
        setState({
            ...state,
            filename: 'No Image Selected',
            openEditModal: false,
        });
    };
    const setPreviewImage = newFile => {
        //console.log('newFile: ',newFile)
        setState({
            ...state,
            openEditModal: false,
            filename: newFile.name,
            previewImage: URL.createObjectURL(newFile)
        });
    };
    const handleOnFileSelect = uploadedFiles => {
        setState({
            ...state,
            error: false,
        });
        //console.log('uploadedFiles: ', uploadedFiles);
        if(uploadedFiles && uploadedFiles.length) {
            if(validateFile(uploadedFiles)) {
                let width, height;
                const file      = uploadedFiles[0];
                const reader    = new FileReader();
                reader.onload   = function (event) {
                    let imgg    = new Image();
                    imgg.src    = event.target.result;
                    imgg.onload = function(){
                        width   = this.width;
                        height  = this.height;
                        setState({
                            ...state,
                            filename: uploadedFiles[0].name,
                            fileWidth: width,
                            fileHeight: height,
                            openEditModal: true,
                            unprocessedImage: reader.result,
                            showPreviewImage: false,
                        });
                    };
                };
                reader.readAsDataURL(file);
            }
        } else {
            setState({
                ...state,
                error: true,
                message: 'File Too Large Or Invalid. Must Be Less Than 1mb And Must Be jpg, jpeg, or, png....',
            });
        }
    };
    const validateFile = files => {
        if(files && files.length) {
            const file = files[0];
            const type = file.type;
            // const size = file.size;
            // console.log(size)
            
            if(!ACCEPTED_TYPES_ARRAY.includes(type)) {
                setState({
                    ...state,
                    error: true,
                    message: 'File Too Large Or Invalid. Must Be Less Than 1mb And Must Be jpg, jpeg, or, png....',
                });
                return false;
            }

            return true;
        }
    };

    return (
        <>
            { state.error         && <Toastrr message={state.message} type="error" /> }
            { state.openEditModal && <UploadImage
                setPreviewImage={setPreviewImage}
                image={state.unprocessedImage}
                filename={state.filename}
                fileWidth={state.fileWidth}
                fileHeight={state.fileHeight}
                closeUploadImageModal={closeUploadImageModal} /> }
            <Header user={user} />
            <div style={{marginTop: 65}}>
                <Card variant="outlined" className="selection-pane">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={9} className="selection-display-pane">
                            <div className={classes.selectionDisplay} id="selection-display">
                                <img src={state.previewImage && state.previewImage} alt={state.unprocessedImage ? state.unprocessedImage.path : ''} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} className="selection-options-pane">
                            <div className="item">
                                <div>
                                    <label htmlFor="quantity">quantity</label>
                                    <TextField
                                        select
                                        onChange={handleChange}
                                        size="small"
                                        variant="outlined"
                                        margin="normal"
                                        value={state.quantity}
                                        id="quantity"
                                        name="quantity">
                                        {getQuantities().map((quantity, index) => (
                                            <MenuItem key={index} value={quantity}>
                                                {quantity}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <h3>GHS 62.00</h3>
                                </div>
                                <div>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" fullWidth>share</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button className="btn-success" variant="contained" fullWidth disableElevation>add to cart</Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div className="item">
                                {/* <Grid container spacing={3}>
                                    <Grid item xs={8}>
                                        <Button variant="outlined" fullWidth>share</Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Button className="btn-success" variant="contained" fullWidth disableElevation>add to cart</Button>
                                    </Grid>
                                </Grid> */}
                            </div>
                            <div className="item pt-5 bb">
                                <label htmlFor="service">service</label>
                                <TextField
                                    select
                                    onChange={handleChange}
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    className="mt-4"
                                    value={state.service}
                                    id="service"
                                    name="service">
                                    {getServices().map((service, index) => (
                                        <MenuItem key={index} value={service.value}>
                                            {service.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="item bb">
                                <p>your image</p>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showMailInMethod')}>
                                    <Grid item xs={8}>
                                        <p className="top">mail-in method</p>
                                        <p className="bottom">{state.mailInMethod}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showMailInMethod ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showMailInMethod} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.mailInMethod}
                                            id="mailInMethod"
                                            name="mailInMethod">
                                            {getMailInMethods().map((method, index) => (
                                                <MenuItem key={index} value={method}>
                                                    {method}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showArtDimension')}>
                                    <Grid item xs={8}>
                                        <p className="top">Art Dimension</p>
                                        <p className="bottom">{state.artDimensionWidth}x{state.artDimensionHeight} inches</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showArtDimension ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showArtDimension} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.artDimensionWidth}
                                            id="artDimensionWidth"
                                            name="artDimensionWidth"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0, step: 0.25 } }} />
                                        <TextField
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.artDimensionHeight}
                                            id="artDimensionHeight"
                                            name="artDimensionHeight"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0, step: 0.25 } }} />
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showPreviewImage')}>
                                    <Grid item xs={8}>
                                        <p className="top">Preview Image</p>
                                        <p className="bottom">{state.filename}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showPreviewImage ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showPreviewImage} timeout="auto" unmountOnExit>
                                    <Dropzone
                                        multiple={false}
                                        maxSize={MAX_SIZE}
                                        accept={ACCEPTED_TYPES}
                                        onDrop={uploadedFiles => handleOnFileSelect(uploadedFiles)}>
                                        {({getRootProps, getInputProps, isDragActive}) => (
                                            <section className={isDragActive ? 'hoverr' : ''}>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <CloudUploadOutlinedIcon />
                                                    {
                                                        isDragActive ?
                                                        <p>Drop file here ...</p> :
                                                        <p>
                                                            Drop File here Or click to select
                                                            <em>(Image Cannot Be More Than 1mb and Must Be jpeg, jpg Or png)</em>
                                                        </p>
                                                    }
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </Collapse>
                            </div>
                            <div className="item bb">
                                <p>your frame</p>
                                <p style={{fontSize: 15,color: '#000'}}>interior: {state.interior}</p>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showFrameModel')}>
                                    <Grid item xs={8}>
                                        <p className="top">frame Model</p>
                                        <p className="bottom">{state.frameModel}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showFrameModel ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showFrameModel} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.frameModel}
                                            id="frameModel"
                                            name="frameModel">
                                            {getFrameModel().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showMatStyle')}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat Style</p>
                                        <p className="bottom">{state.matStyle}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showMatStyle ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showMatStyle} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.matStyle}
                                            id="matStyle"
                                            name="matStyle">
                                            {getMatStyle().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showMatSize')}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat size</p>
                                        <p className="bottom">{state.matSize}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showMatSize ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showMatSize} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.matSize}
                                            id="matSize"
                                            name="matSize">
                                            {getMatSize().map((method, index) => (
                                                <MenuItem key={index} value={method}>
                                                    {method}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showMatMaterial')}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat material</p>
                                        <p className="bottom">{state.matMaterial}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showMatMaterial ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showMatMaterial} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.matMaterial}
                                            id="matMaterial"
                                            name="matMaterial">
                                            {getMatMaterial().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showMountingMethod')}>
                                    <Grid item xs={8}>
                                        <p className="top">Mounting Method</p>
                                        <p className="bottom">{state.mountingMethod}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showMountingMethod ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showMountingMethod} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.mountingMethod}
                                            id="mountingMethod"
                                            name="mountingMethod">
                                            {getMountingMethod().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showAcrylicType')}>
                                    <Grid item xs={8}>
                                        <p className="top">Acrylic Type</p>
                                        <p className="bottom">{state.acrylicType}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showAcrylicType ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showAcrylicType} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.acrylicType}
                                            id="acrylicType"
                                            name="acrylicType">
                                            {getAcrylicType().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showSpacer')}>
                                    <Grid item xs={8}>
                                        <p className="top">spacer</p>
                                        <p className="bottom">{state.spacer}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showSpacer ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showSpacer} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.spacer}
                                            id="spacer"
                                            name="spacer">
                                            {getSpacer().map((method, index) => (
                                                <MenuItem key={index} value={method}>
                                                    {method}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="item fm mb-25">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => handleToggle('showHangingHardware')}>
                                    <Grid item xs={8}>
                                        <p className="top">hanging Hardware</p>
                                        <p className="bottom">{state.hangingHardware}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { state.showHangingHardware ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={state.showHangingHardware} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={handleChange}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={state.hangingHardware}
                                            id="hangingHardware"
                                            name="hangingHardware">
                                            {getHangingHardware().map((method, index) => (
                                                <MenuItem key={index} value={method.value}>
                                                    {method.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Collapse>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </>
    )
}

export default Selection;
