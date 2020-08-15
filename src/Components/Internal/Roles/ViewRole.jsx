import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tippy from '@tippy.js/react';
import RolePDF from './RolePDF';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditRole from './EditRole';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { BlobProvider } from "@react-pdf/renderer";
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import 'tippy.js/dist/tippy.css';

function ViewRole({ staff, length, role, closeExpandable }) {
    const filename        = role.name+".pdf";
    const editTooltip     = "Update "+role.name;
    const downloadTooltip = "Download "+role.name+"'s Detail";
    const [showModal, setShowModal] = React.useState(false);

    const closeEditModal = () => { setShowModal(false) };

    return (
        <>
            <TableRow>
                <TableCell colSpan={length + 1}>
                    <div className="detail-div">
                        { showModal && <EditRole role={role} closeEditModal={closeEditModal} closeExpandable={closeExpandable} /> }
                        <table id="detail-table">
                            <tbody>
                                <tr>
                                    <th width="40%">Role: </th>
                                    <td width="60%">{role.name}</td>
                                </tr>
                                <tr>
                                    <th>Total Permissions: </th>
                                    <td>{role.total}</td>
                                </tr>
                                <tr>
                                    <th>Permissions: </th>
                                    <td>{role.permissions}</td>
                                </tr>
                                <tr>
                                    <th>Added By: </th>
                                    <td>{role.staff}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Grid className="table-detail-toolbar" container spacing={0}>
                            <Grid item xs={4}>
                                {
                                    staff.role_name.toLowerCase() === 'administrator' &&
                                    <BlobProvider
                                        document={<RolePDF role={role} />}
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
                                }
                            </Grid>
                            <Grid item xs={8} className="text-right">
                                {
                                    staff.role_name.toLowerCase() === 'administrator' &&
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

export default ViewRole;
