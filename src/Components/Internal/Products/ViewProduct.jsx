import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Tippy from '@tippyjs/react';
import GetAppIcon from '@material-ui/icons/GetApp';
import ProductPDF from './ProductPDF';
import EditProduct from './EditProduct';
import ConfirmDialogue from '../../Extras/ConfirmDialogue';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';

function ViewProduct({ history, length, product, reload, permissions }) {
    const filename        = product.name+".pdf";
    const editTooltip     = "Update "+product.name;
    const downloadTooltip = "Download "+product.name;

    const [action, setAction]             = useState(false);
    const [showModal, setShowModal]       = useState(false);
    const [showDialogue, setShowDialogue] = useState(false);

    const closeEditModal   = () => { setShowModal(false) };    
    const showConfirmation = action => {
        setAction(action);
        setShowDialogue(true);
    };
    const closeConfirm     = result => {
        setShowDialogue(false);
        // result.toLowerCase() === 'yes' && productAction(product.product_id, product.name, action);
    };

    return (
        <>
            <TableRow>
                <TableCell colSpan={length + 1}>
                    <div className="detail-div">
                        { showDialogue && <ConfirmDialogue message={'Are You Sure You Want To '+action+' '+product.name+'?'} closeConfirm={closeConfirm} /> }
                        { showModal    && <EditProduct history={history} product={product} closeEditModal={closeEditModal} reload={reload} permissions={permissions} /> }

                        {/* <PDFViewer width="100%" height="100%"> */}
                        <PDFViewer>
                            <ProductPDF product={product} />
                        </PDFViewer>

                        <Grid className="table-detail-toolbar" container spacing={0}>
                            <Grid item xs={4}>
                                <BlobProvider
                                    document={<ProductPDF product={product} />}
                                    fileName={filename}
                                    style={{
                                        textDecoration: "none",
                                    }}>
                                        {({url}) => (
                                            <a href={url} target="_blank" rel="noopener noreferrer" >
                                                <Tippy content={downloadTooltip}>
                                                    <IconButton>
                                                        <GetAppIcon className="colour-success" />
                                                    </IconButton>
                                                </Tippy>
                                            </a>
                                        )}
                                </BlobProvider>
                            </Grid>
                            <Grid item xs={8} className="text-right">
                                {
                                    permissions.includes("Can Edit Product") &&
                                    <Tippy content={editTooltip}>
                                        <IconButton onClick={() => setShowModal(true)}>
                                            <EditOutlinedIcon color="primary" />
                                        </IconButton>
                                    </Tippy>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ViewProduct;
