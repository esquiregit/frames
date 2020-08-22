import React from 'react';
import CustomerPDF from './CustomerPDF';
import { PDFViewer } from "@react-pdf/renderer";
import { TableRow, TableCell } from '@material-ui/core';

function ViewCustomer({ length, customer }) {
    return (
        <TableRow>
            <TableCell colSpan={length + 1}>
                <div className="detail-div">
                    <PDFViewer>
                        <CustomerPDF customer={customer} />
                    </PDFViewer>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ViewCustomer;
