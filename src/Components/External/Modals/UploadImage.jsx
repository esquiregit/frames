import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ReactCrop from 'react-image-crop';
import { DialogContent, DialogActions, DialogTitle, Transition } from '../../Extras/Dialogue';
import 'react-image-crop/dist/ReactCrop.css';

function AddPatient({ setDisplayImage, image, filename, fileWidth, fileHeight, closeUploadImageModal }) {
    // console.log('image: ', image)
    // console.log('filename: ', filename)
    // console.log('fileWidth: ', fileWidth)
    // console.log('fileWidth: ', fileWidth)
    const canvasRef = React.createRef();
    let maxWidth    = null;
    if(fileWidth <= 400) {
        maxWidth = 'sm';
    } else if(fileWidth >= 400 && fileWidth <= 800) {
        maxWidth = 'md';
    } else if(fileWidth >= 800 && fileWidth <= 1000) {
        maxWidth = 'lg';
    } else if(fileWidth > 1000) {
        maxWidth = 'xl';
    }
    // console.log('fileWidth: ', fileWidth)
    // console.log('maxWidth: ', maxWidth)

    const [state, setState] = useState({
        open: true,
        crop: {
            // aspect: 9/16,
            // aspect: 1/1,
            height: fileHeight / 2,
            unit: "px",
            width: fileWidth / 3,
            x: (fileWidth - (fileWidth / 3)) / 2,
            y: (fileHeight - (fileHeight / 2)) / 2
        },
        imgSrc: image,
        maxWidth: maxWidth,
    });

    const handleOnCrop = crop => {
        setState({
            ...state,
            crop: crop
        });
        // console.log('crop: ', crop)
    };
    const handleCropComplete = crop => {
        imageToCanvas(crop);
    };
    const handleClose  = () => {
        setState({
            ...state,
            open: false
        });
        closeUploadImageModal();
    };
    const imageToCanvas = crop => {
        const canvas    = canvasRef.current;
        canvas.width    = crop.width;
        canvas.height   = crop.height;
        const ctx       = canvas.getContext('2d');
        const newImage  = new Image();
        newImage.src    = image;
        newImage.onload = () => {
            ctx.drawImage(
                newImage,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height,
            );
        };
    }
    const getFileExtension = () => {
        return image.substring('data:image/'.length, image.indexOf(';base64'));
    }
    const doneWithCrop = event => {
        event.preventDefault();
        const canvasReff  = canvasRef.current;
        const imageBase64 = canvasReff.toDataURL('image/'+getFileExtension());

        const newFile = base64StringToFile(imageBase64);
        setState({
            ...state,
            open: false
        });
        setDisplayImage(newFile);
    };
    const base64StringToFile = imageBase64 => {
        let arr   = imageBase64.split(',');
        let mime  = arr[0].match(/:(.*?);/)[1];
        let bstr  = atob(arr[1]);
        let n     = bstr.length;
        let u8arr = new Uint8Array(n);

        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    
    return (
        <>
            <Dialog
                TransitionComponent={Transition}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                scroll='paper'
                fullWidth={true}
                maxWidth={state.maxWidth}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={state.open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Crop Your Image
                </DialogTitle>
                <DialogContent dividers>
                    <ReactCrop
                        onChange={handleOnCrop}
                        onComplete={handleCropComplete}
                        // src={state.imgSrc}
                        src={image}
                        crop={state.crop} />
                    <canvas
                        style={{width: 0, height: 0}}
                        ref={canvasRef}></canvas>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={doneWithCrop}
                        className="btn-success-outlined m-10"
                        >Done</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddPatient;
