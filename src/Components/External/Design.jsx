import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Frame from '../../assets/frame3.jpg';
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


const ACCEPTED_TYPES       = "image/x-png, image/png, image/jpg, image/jpeg";
const ACCEPTED_TYPES_ARRAY = ACCEPTED_TYPES.split(', ').map(type => type);

function Design({ match }) {
    const styles = makeStyles((theme) => ({
        selectionDisplay: {
            backgroundImage: `url(${Frame})`,
        },
    }));

    const user       = useSelector(state => state.authReducer.user);
    const classes    = styles();
    const MAX_SIZE   = 1024*1024;
    const product_id = match.params.product_id;
    
    const [frame, setFrame] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [service, setService] = useState('Full Service');
    const [mailInMethod, setMailInMethod] = useState('Flat Mailer');
    const [artDimensionWidth, setArtDimensionWidth] = useState('8');
    const [artDimensionHeight, setArtDimensionHeight] = useState('10');
    const [unprocessedImage, setUnprocessedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [interior, setInterior] = useState('11x13');
    const [frameModel, setFrameModel] = useState('Gallery Walnut');
    const [matStyle, setMatStyle] = useState('No Mat');
    const [matSize, setMatSize] = useState('0 1/2 inches');
    const [matMaterial, setMatMaterial] = useState('4-Ply Paper White');
    const [mountingMethod, setMountingMethod] = useState('Hinge Mount to Hidden Lift');
    const [acrylicType, setAcrylicType] = useState('Standard Acrylic');
    const [spacer, setSpacer] = useState('Shadowbox');
    const [hangingHardware, setHangingHardware] = useState('Wire');
    const [filename, setFilename] = useState('No Image Selected');
    const [fileWidth, setFileWidth] = useState(null);
    const [fileHeight, setFileHeight] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [comError, setComError] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [showMailInMethod, setShowMailInMethod] = useState(false);
    const [showArtDimension, setShowArtDimension] = useState(false);
    const [showPreviewImage, setShowPreviewImage] = useState(false);
    const [showFrameModel, setShowFrameModel] = useState(false);
    const [showMatStyle, setShowMatStyle] = useState(false);
    const [showMatSize, setShowMatSize] = useState(false);
    const [showMatMaterial, setShowMatMaterial] = useState(false);
    const [showMountingMethod, setShowMountingMethod] = useState(false);
    const [showAcrylicType, setShowAcrylicType] = useState(false);
    const [showSpacer, setShowSpacer] = useState(false);
    const [showHangingHardware, setShowHangingHardware] = useState(false);
    
    
    useEffect(() => {
        document.title        = 'Design Your Frame | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'get_product', { product_id }, { signal: signal })
            .then(response => {
                setFrame(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setMessage('Network Error. Server Unreachable....');
                setComError(true);
            });

        return () => abortController.abort();
    }, [product_id]);
    
    const closeUploadImageModal = () => {
        setFilename('No Image Selected');
        setOpenEditModal(false);
    };
    const setDisplayImage = newFile => {
        //console.log('newFile: ',newFile)
        setFilename(newFile.name);
        setOpenEditModal(false);
        setPreviewImage(URL.createObjectURL(newFile));
    };
    const handleOnFileSelect = uploadedFiles => {
        setError(false);
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

                        setFilename(uploadedFiles[0].name);
                        setFileWidth(width);
                        setFileHeight(height);
                        setOpenEditModal(true);
                        setShowPreviewImage(false);
                        setUnprocessedImage(reader.result);
                        
                        // setState({
                        //     ...state,
                        //     filename: uploadedFiles[0].name,
                        //     fileWidth: width,
                        //     fileHeight: height,
                        //     openEditModal: true,
                        //     unprocessedImage: reader.result,
                        //     showPreviewImage: false,
                        // });
                    };
                };
                reader.readAsDataURL(file);
            }
        } else {
            setError(true);
            setMessage('File Too Large Or Invalid. Must Be Less Than 1mb And Must Be jpg, jpeg, or, png....');
        }
    };
    const validateFile = files => {
        if(files && files.length) {
            const file = files[0];
            const type = file.type;
            // const size = file.size;
            // console.log(size)
            
            if(!ACCEPTED_TYPES_ARRAY.includes(type)) {
                setError(true);
                setMessage('File Too Large Or Invalid. Must Be Less Than 1mb And Must Be jpg, jpeg, or, png....');
                return false;
            }

            return true;
        }
    };

    return (
        <>
            { error         && <Toastrr message={message} severity="error" /> }
            { openEditModal && <UploadImage
                setDisplayImage={setDisplayImage}
                image={unprocessedImage}
                filename={filename}
                fileWidth={fileWidth}
                fileHeight={fileHeight}
                closeUploadImageModal={closeUploadImageModal} /> }
            <Header user={user} />
            <div style={{marginTop: 65}}>
                <Card variant="outlined" className="selection-pane">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={9} className="selection-display-pane">
                            <div className={classes.selectionDisplay} id="selection-display">
                                <img src={previewImage && previewImage} alt={unprocessedImage ? unprocessedImage.path : ''} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} className="selection-options-pane">
                            <div className="item">
                                <div>
                                    <label htmlFor="quantity">quantity</label>
                                    <TextField
                                        select
                                        onChange={event => setQuantity(event.target.value)}
                                        size="small"
                                        variant="outlined"
                                        margin="normal"
                                        value={quantity}
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
                                    onChange={event => setService(event.target.value)}
                                    size="small"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    className="mt-4"
                                    value={service}
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
                                    onClick={() => setShowMailInMethod(!showMailInMethod)}>
                                    <Grid item xs={8}>
                                        <p className="top">mail-in method</p>
                                        <p className="bottom">{mailInMethod}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showMailInMethod ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showMailInMethod} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setMailInMethod(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={mailInMethod}
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
                                    onClick={() => setShowArtDimension(!showArtDimension)}>
                                    <Grid item xs={8}>
                                        <p className="top">Art Dimension</p>
                                        <p className="bottom">{artDimensionWidth}x{artDimensionHeight} inches</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showArtDimension ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showArtDimension} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            onChange={event => setArtDimensionWidth(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={artDimensionWidth}
                                            id="artDimensionWidth"
                                            name="artDimensionWidth"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0, step: 0.25 } }} />
                                        <TextField
                                            onChange={event => setArtDimensionHeight(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={artDimensionHeight}
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
                                    onClick={() => setShowPreviewImage(!showPreviewImage)}>
                                    <Grid item xs={8}>
                                        <p className="top">Preview Image</p>
                                        <p className="bottom">{filename}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showPreviewImage ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showPreviewImage} timeout="auto" unmountOnExit>
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
                                <p style={{fontSize: 15,color: '#000'}}>interior: {interior}</p>
                            </div>
                            <div className="item fm">
                                <Grid
                                    className="cursor-pointer"
                                    container
                                    spacing={3}
                                    onClick={() => setShowFrameModel(!showFrameModel)}>
                                    <Grid item xs={8}>
                                        <p className="top">frame Model</p>
                                        <p className="bottom">{frameModel}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showFrameModel ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showFrameModel} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setFrameModel(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={frameModel}
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
                                    onClick={() => setShowMatStyle(!showMatStyle)}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat Style</p>
                                        <p className="bottom">{matStyle}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showMatStyle ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showMatStyle} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setMatStyle(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={matStyle}
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
                                    onClick={() => setShowMatSize(!showMatSize)}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat size</p>
                                        <p className="bottom">{matSize}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showMatSize ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showMatSize} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setMatSize(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={matSize}
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
                                    onClick={() => setShowMatMaterial(!showMatMaterial)}>
                                    <Grid item xs={8}>
                                        <p className="top">Mat material</p>
                                        <p className="bottom">{matMaterial}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showMatMaterial ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showMatMaterial} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setMatMaterial(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={matMaterial}
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
                                    onClick={() => setShowMountingMethod(!showMountingMethod)}>
                                    <Grid item xs={8}>
                                        <p className="top">Mounting Method</p>
                                        <p className="bottom">{mountingMethod}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showMountingMethod ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showMountingMethod} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setMountingMethod(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={mountingMethod}
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
                                    onClick={() => setShowAcrylicType(!showAcrylicType)}>
                                    <Grid item xs={8}>
                                        <p className="top">Acrylic Type</p>
                                        <p className="bottom">{acrylicType}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showAcrylicType ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showAcrylicType} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setAcrylicType(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={acrylicType}
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
                                    onClick={() => setShowSpacer(!showSpacer)}>
                                    <Grid item xs={8}>
                                        <p className="top">spacer</p>
                                        <p className="bottom">{spacer}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showSpacer ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showSpacer} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setSpacer(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={spacer}
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
                                    onClick={() => setShowHangingHardware(!showHangingHardware)}>
                                    <Grid item xs={8}>
                                        <p className="top">hanging Hardware</p>
                                        <p className="bottom">{hangingHardware}</p>
                                    </Grid>
                                    <Grid item xs={4}>
                                        { showHangingHardware ? <ExpandMore /> : <ExpandLess /> }
                                    </Grid>
                                </Grid>
                                <Collapse in={showHangingHardware} timeout="auto" unmountOnExit>
                                    <div>
                                        <TextField
                                            select
                                            onChange={event => setHangingHardware(event.target.value)}
                                            size="small"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            value={hangingHardware}
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

export default Design;
