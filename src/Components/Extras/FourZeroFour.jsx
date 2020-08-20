import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { getBack } from './GoBack';

const FourZeroFour = ({ history }) => {
    useEffect(() => { document.title = 'Error 404 | The Frames Shop'; }, []);
    const handleClick = () => {
        getBack(history);
    }

    return (
        <div className="error-404">
            <p className="first">OOPS! The Requested URL Doesn't Exist</p>
            <p className="last">Error 404</p>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disableElevation>
                Go Back
            </Button>
        </div>
    );
}

export default FourZeroFour;
