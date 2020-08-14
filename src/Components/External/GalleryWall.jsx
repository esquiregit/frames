import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Carousel from './Carousel';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
// import { NavLink } from 'react-router-dom';

function GalleryWall() {
    React.useEffect(() => {
        document.title = 'Gallery Wall | Frames';
    }, []);

    const slides = [
        { testimony: "You all really went the extra mile to make sure that your product is something you and I are both proud of. I'll return to you all again and again.", name: "- Nana Akua" },
        { testimony: "The team did a fantastic job on my custom gallery wall. It incorporates some of our most treasured family photos and my kids’ art, with different frame styles. The end result is seamless, stunning, and high quality. Highly recommend!", name: "- Ben Afreh" },
        { testimony: "You consulted with me on every detail of the project when I reached out to you, from choosing framing styles (considering both the individual pieces and the wall as a whole) to how best to hang the wall once my framed artwork arrived.", name: "- Gifty Agyei" }
    ];

    return (
        <>
            <Header />
            <main id="external">
                <Card variant="outlined">
                    <div className="gallery_banner">
                        <section>
                            <h1>Gallery Wall services.</h1>
                            <p>Our experienced design team will work with you to create a beautiful custom gallery wall to feature those special moments you want to remember.</p>
                            <Button
                                size="medium"
                                className='btn-success'
                                disableElevation>
                                book a consultation
                            </Button>
                        </section>
                    </div>

                    <div className="type_info">
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
                    </div>
                    <hr />
                    <div className="how_it_works">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={6}>
                                <div id="gallery-wall-inner"></div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <div>
                                    <h1>how it works</h1>
                                    <h3>Creating your custom gallery wall is easy:</h3>
                                    <ul>
                                        <li>
                                            <span>1</span>
                                            We gather information about your space, your taste, and your art in your free consultation.
                                        </li>
                                        <li>
                                            <span>2</span>
                                            Using images of your art and your space, our designers create a mockup within 48 hours.
                                        </li>
                                        <li>
                                            <span>3</span>
                                            You approve the design and we send a link to add each custom frame for an easy check out.
                                        </li>
                                        <li>
                                            <span>4</span>
                                            We frame your art or digital files and deliver your completed gallery wall ready to hang!
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <hr />
                    <div className="carousel-div">
                        <Carousel slides={slides} />
                    </div>

                </Card>
            </main>
            <Footer />
        </>
    )
}

export default GalleryWall;
