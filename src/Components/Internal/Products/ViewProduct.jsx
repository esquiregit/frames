import React from 'react';
import ProductPDF from './ProductPDF';
import { PDFViewer } from "@react-pdf/renderer";
import { TableRow, TableCell } from '@material-ui/core';

function ViewProduct({ length, product }) {
    return (
        <>
            <TableRow>
                <TableCell colSpan={length + 1}>
                    <div className="detail-div">
                        <PDFViewer>
                            <ProductPDF product={product} />
                        </PDFViewer>
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ViewProduct;
