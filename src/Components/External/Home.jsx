import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Carousel from './Carousel';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    React.useEffect(() => {
        document.title = 'Home | Frames';
    }, []);
    const user = useSelector(state => state.authReducer.user);

    const slides = [
        { testimony: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts", name: "- Saviour Eleblu" },
        { testimony: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts", name: "- Jane Awotwe" },
        { testimony: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts", name: "- Mary Owusu" }
    ];

    return (
        <div className="back_gray">
            <Header user={user} />
            <main id="external">
                <Card variant="outlined">
                    <div className="banner">
                        <section>
                            <h1>Custom frames, made simple.</h1>
                            <p>Trusted by artists, made for everyone.<br />Upload digital files and we'll do the rest.</p>
                            <div className="start-div">
                                {/* <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}> */}
                                        <NavLink to="/start-a-frame/"
                                            className="btn-success">
                                            start a frame
                                        </NavLink>
                                    {/* </Grid>
                                </Grid> */}
                            </div>
                        </section>
                    </div>

                    <div className="testimonials">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={7} md={7}>
                                <Carousel slides={slides} />
                            </Grid>
                            <Grid item xs={12} sm={5} md={5}>
                                <h3>types of services</h3>
                                <ul>
                                    <li>
                                        <h4>full service</h4>
                                        <p>mail us your art and we'll custom frame it</p>
                                    </li>
                                    {/* <li>
                                        <h4>print and frame</h4>
                                        <p>we'll print your file and custom frame it</p>
                                    </li>
                                    <li>
                                        <h4>frame only</h4>
                                        <p>we'll build and ship your frame without art</p>
                                    </li>
                                    <li>
                                        <h4>print only</h4>
                                        <p>upload a file. we'll print and ship it</p>
                                    </li> */}
                                </ul>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Home;
