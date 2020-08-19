import React from 'react';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import PermScanWifiIcon from '@material-ui/icons/PermScanWifi';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { NavLink } from 'react-router-dom';

function EmptyData({ error, message }) {
    return (
        <div className="empty-data">
            {
                error
                ?
                <>
                    <PermScanWifiIcon />
                    <span>
                        <strong>network error!</strong> &nbsp;server unreachable
                    </span>
                </>
                :
                <>
                    { message.includes("Cart") ? <ShoppingCartOutlinedIcon /> : <BlurOnIcon /> }
                    <span>
                        <p style={{textAlign: 'center'}}><strong>{message}</strong></p>
                        &nbsp;
                        { !message.includes("Cart") && <NavLink className="no" to="/start-a-frame/">continue shopping</NavLink> }
                    </span>
                </>
            }
        </div>
    )
}

export default EmptyData;
