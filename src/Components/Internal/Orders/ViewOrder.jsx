import React from 'react';
import OrderPDF from './OrderPDF';
import { PDFViewer } from "@react-pdf/renderer";
import { TableRow, TableCell } from '@material-ui/core';

function ViewOrder({ length, order }) {
    return (
        <TableRow>
            <TableCell colSpan={length + 1}>
                <div className="detail-div">
                    <PDFViewer>
                        <OrderPDF order={order} />
                    </PDFViewer>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ViewOrder;
