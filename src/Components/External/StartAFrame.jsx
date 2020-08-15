import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Scarf from '../../assets/scarf.jpeg';
import Poster from '../../assets/poster.jpg';
import FineArt from '../../assets/fine-art.jpg';
import Textile from '../../assets/textile.jpg';
import Diploma from '../../assets/diploma.png';
import Ketubah from '../../assets/ketubah.jpg';
import ArtPrint from '../../assets/art-print.jpg';
import Magazine from '../../assets/magazine.jpg';
import Newspaper from '../../assets/newspaper-article.jpg';
import Certificate from '../../assets/certificate.png';
import OriginalArt from '../../assets/original-art.jpg';
import OnlineArticle from '../../assets/online-article.png';
import PersonalPhoto from '../../assets/personal-photo.jpg';
import UnstretchedCanvas from '../../assets/canvas.jpg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Frame() {
    React.useEffect(() => {
        document.title = 'Start A Frame | Frames';
    }, []);
    const user = useSelector(state => state.authReducer.user);

    return (
        <div className="back_gray">
            <Header user={user} />
            <main id="external-medium">
                <Card variant="outlined" id="start-frame" className="p-25">
                    <p>what do you want to frame?</p>
                    <p>we have the right recommendation for idea you have</p>

                    <div className="row">
                        <h4>frames for art</h4>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/original-art/">
                                    <div>
                                        <img src={OriginalArt} alt="" />
                                    </div>
                                    <h5>original art</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/art-print/">
                                    <div>
                                        <img src={ArtPrint} alt="" />
                                    </div>
                                    <h5>art print</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/fine-art-photo/">
                                    <div>
                                        <img src={FineArt} alt="" />
                                    </div>
                                    <h5>fine art photo</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/personal-photo/">
                                    <div>
                                        <img src={PersonalPhoto} alt="" />
                                    </div>
                                    <h5>personal photo</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/poster/">
                                    <div>
                                        <img src={Poster} alt="" />
                                    </div>
                                    <h5>poster</h5>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="row">
                        <h4>frames for fabric</h4>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/unstretched-canvas/">
                                    <div>
                                        <img src={UnstretchedCanvas} alt="" />
                                    </div>
                                    <h5>unstretched canvas</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/scarf/">
                                    <div>
                                        <img src={Scarf} alt="" />
                                    </div>
                                    <h5>scarf</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/textile/">
                                    <div>
                                        <img src={Textile} alt="" />
                                    </div>
                                    <h5>textile</h5>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="row">
                        <h4>frames for documents</h4>
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/certificate/">
                                    <div>
                                        <img src={Certificate} alt="" />
                                    </div>
                                    <h5>certificate</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/diploma/">
                                    <div>
                                        <img src={Diploma} alt="" />
                                    </div>
                                    <h5>diploma</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/magazine-article/">
                                    <div>
                                        <img src={Magazine} alt="" />
                                    </div>
                                    <h5>magazine article</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/ketubah/">
                                    <div>
                                        <img src={Ketubah} alt="" />
                                    </div>
                                    <h5>ketubah</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/newspaper-article/">
                                    <div>
                                        <img src={Newspaper} alt="" />
                                    </div>
                                    <h5>newspaper article</h5>
                                </NavLink>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <NavLink to="/start-a-frame/online-article/">
                                    <div>
                                        <img src={OnlineArticle} alt="" />
                                    </div>
                                    <h5>online article</h5>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </main>
            <Footer />
        </div>
    )
}

export default Frame;
