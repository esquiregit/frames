import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Info from './Info';
import Image from '../../assets/frame3.jpg';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import { NavLink } from 'react-router-dom';
import { getHeadingFull, getHeading } from '../Extras/Functions';

function FrameType({ match }) {
    const type    = match.params.type;
    const heading = getHeadingFull(type);
    const random  = Math.floor((Math.random() * 50) + 1);
    let frames    = [];
    for(var index = 0; index < random; index++) {
        frames.push(index+1);
    }

    React.useEffect(() => {
        document.title = getHeading(type)+' | Frames';
    }, [type]);

    return (
        <div className="back_gray">
            <Header />
            <main id="external">
                <Card variant="outlined">
                    <div className="type_banner">
                        <section>
                            <h1>{heading}.</h1>
                            <p>For memory that’s worth preserving, mail in your file. We’ll add a custom frame that’s as striking as your file’s subject matter.</p>
                        </section>
                    </div>

                    <div className="type_info">
                        <Info />
                    </div>
                    <hr />
                    <div className="how_it_works">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={4}>
                                <div>
                                    <h2>
                                        <span>1</span>
                                        Choose your frame
                                    </h2>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <div>
                                    <h2>
                                        <span>2</span>
                                        Upload your image
                                    </h2>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <div>
                                    <h2>
                                        <span>3</span>
                                        We build and deliver your frame
                                    </h2>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <hr />
                    <div className="frame_display">
                        <h2>popular frames</h2>
                        <h4>select a frame and provide your image/details</h4>

                        <Grid container spacing={4}>
                            {
                                frames.map((frame, index) => {
                                    return (
                                        <Grid key={index} item xs={6} sm={4} lg={2}>
                                            <NavLink to="/design/some_unique_id_here/">
                                                <div>
                                                    <img src={Image} alt="" />
                                                </div>
                                                <p style={{textDecoration: 'none'}}>hello</p>
                                            </NavLink>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </div>
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default FrameType;
