import React from 'react';
import Grid from '@material-ui/core/Grid';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';

function Info() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
                <div className="single-course-area d-flex mb-100">
                    <div className="course-icon">
                        <VerifiedUserOutlinedIcon />
                    </div>
                    <div className="course-content">
                        <h2>expert made</h2>
                        <p>Handcrafted by experts using the highest quality materials.</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div className="single-course-area d-flex mb-100">
                    <div className="course-icon">
                        <WallpaperIcon />
                    </div>
                    <div className="course-content">
                        <h2>bespoke frames</h2>
                        <p>We build and make every frame to ensure a perfect fit for your memory.</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <div className="single-course-area d-flex mb-100">
                    <div className="course-icon">
                        <AttachMoneyIcon />
                    </div>
                    <div className="course-content">
                        <h2>money back guarantee</h2>
                        <p>You get your money back if we aren't able to please you.</p>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default Info;
