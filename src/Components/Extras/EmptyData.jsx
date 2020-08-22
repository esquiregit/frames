import React from 'react';
import PermScanWifiIcon from '@material-ui/icons/PermScanWifi';
import ReportOffOutlinedIcon from '@material-ui/icons/ReportOffOutlined';

function EmptyData({ error, single, plural }) {
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
                    <ReportOffOutlinedIcon />
                    <span>
                        <strong>No {plural} Found!</strong>
                        &nbsp;
                        {
                            plural === 'Report' &&
                            <span>Change Search Parameters And Try Again</span>
                        }
                        { plural.endsWith('Labs') || plural === 'Activity Logs' || plural === 'Orders' || plural === 'Report' ? null : <span>click the "add {single}" button below to add one</span> }
                    </span>
                </>
            }
        </div>
    )
}

export default EmptyData;
