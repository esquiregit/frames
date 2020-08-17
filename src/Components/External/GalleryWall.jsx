import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Info from './Info';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loadrr from '../Extras/Loadrr';
import Carousel from './Carousel';
import Consultation from './Consultation';
import { getBaseURL } from '../Extras/server';
import { useSelector } from 'react-redux';

function GalleryWall() {
    const user = useSelector(state => state.authReducer.user);

    const [loading, setLoading]         = useState(true); 
    const [showModal, setShowModal]     = useState(false);
    const [testimonies, setTestimonies] = useState([]);

    React.useEffect(() => {
        document.title        = 'Gallery Wall | The Frame Shop';
        const abortController = new AbortController();
        const signal          = abortController.signal;

        Axios.post(getBaseURL()+'get_testimonies', { type: 'Back' }, { signal: signal })
            .then(response => {
                setTestimonies(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.err(error)
            });

        return () => abortController.abort();
    }, []);

    const closeModal  = () => { setShowModal(false); };

    return (
        <>
            { showModal && <Consultation closeModal={closeModal} /> }
            <div className="back_gray">
                <Header user={user} />
                <main id="external">
                    {
                        loading ? <Loadrr /> :
                        <Card variant="outlined">
                            <div className="gallery_banner">
                                <section>
                                    <h1>Gallery Wall services.</h1>
                                    <p>Our experienced design team will work with you to create a beautiful custom gallery wall to feature those special moments you want to remember.</p>
                                    <Button
                                        onClick={() => setShowModal(true)}
                                        size="medium"
                                        className='btn-success'
                                        disableElevation>
                                        book a consultation
                                    </Button>
                                </section>
                            </div>

                            <div className="type_info">
                                <Info />
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
                                <Carousel testimonies={testimonies} />
                            </div>
                        </Card>
                    }
                </main>
                <Footer />
            </div>
        </>
    )
}

export default GalleryWall;
