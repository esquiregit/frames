import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Info from './Info';
import Axios from 'axios';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import Loadrr from '../Extras/Loadrr';
import styles from '../Extras/styles';
import Toastrr from '../Extras/Toastrr';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { NavLink } from 'react-router-dom';
import { getBaseURL } from '../Extras/server';
import { useSelector } from 'react-redux';
import { getHeadingFull, getHeading } from '../Extras/Functions';

function FrameType({ match }) {
    const category    = match.params.category;
    const heading     = getHeadingFull(category);
    const user        = useSelector(state => state.authReducer.user);
    const classes     = styles();
    const newCategory = getHeading(category);

    const [error, setError]       = useState(false);
    const [frames, setFrames]     = useState(false);
    const [loading, setLoading]   = useState(true);
    const [message, setMessage]   = useState('hello from message');
    const [success, setSuccess]   = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [comError, setComError] = useState(false);
    const [backdropMessage, setBackdropMessage] = useState('');

    React.useEffect(() => {
        document.title = getHeading(category)+' | The Frame Shop';
        const abortController = new AbortController();
        const signal = abortController.signal;

        Axios.post(getBaseURL() + 'get_frames', { category: newCategory }, { signal: signal })
            .then(response => {
                setFrames(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setMessage('Network Error. Server Unreachable....');
                setComError(true);
            });

        return () => abortController.abort();
    }, [category]);

    const wishlistAction = (id, product_id, action) => {
        setError(false);
        setSuccess(false);
        setBackdrop(true);
        setComError(false);
        setBackdropMessage(action === 'add' ? 'Adding Product To Your Wish List' : 'Renoving Product From Wish List');
        const abortController = new AbortController();
        const signal          = abortController.signal;
        
        const data = {
            customer_id: user.customer_id,
            id: id,
            product_id: product_id,
            action: action
        };

        Axios.post(getBaseURL()+'wishlist_action', data, { signal: signal })
            .then(response => {
                if(response.data[0].status.toLowerCase() === 'success') {
                    setSuccess(true);
                    setMessage(response.data[0].message);
                } else {
                    setError(true);
                    setMessage(response.data[0].message);
                }
                setBackdrop(false);
            })
            .catch(error => {
                setBackdrop(false);
                setComError(true);
                setMessage('Network Error. Server Unreachable....');
            });

        return () => abortController.abort();
    };

    return (
        <>
            { error    && <Toastrr message={message} severity="error"   /> }
            { success  && <Toastrr message={message} severity="success" /> }
            { comError && <Toastrr message={message} severity="info"    /> }
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" /> <span className='ml-15'>{backdropMessage}. Please Wait....</span>
            </Backdrop>
            <div>
                <Header user={user} />
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
                            {
                                loading ? <Loadrr /> :
                                (frames && frames.length)
                                ?
                                <>
                                    <h2>popular frames</h2>
                                    <h4>select a frame and provide your image/details</h4>
                                    <Grid container spacing={4}>
                                        {
                                            frames.map((frame, index) => {
                                                return (
                                                    <Grid key={index} item xs={6} sm={4} lg={2}>
                                                        {
                                                            user &&
                                                            <span>
                                                                {
                                                                    index % 2 === 0 ?
                                                                    <IconButton
                                                                        className="add-to-wishlist"
                                                                        onClick={() => wishlistAction(frame.id, frame.product_id, 'add')}>
                                                                        <FavoriteBorderOutlinedIcon color="primary" />
                                                                    </IconButton> :
                                                                    <IconButton
                                                                        className="add-to-wishlist"
                                                                        onClick={() => wishlistAction(frame.id, frame.product_id, 'remove')}>
                                                                        <FavoriteIcon color="primary" />
                                                                    </IconButton>
                                                                }
                                                            </span>
                                                        }
                                                        <NavLink to={`/design/${frame.product_id}`}>
                                                            <div>
                                                                <img src={getBaseURL()+frame.image} alt={frame.name} />
                                                            </div>
                                                            <p style={{textDecoration: 'none'}}>{frame.name}</p>
                                                        </NavLink>
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                </>
                                : <div className="no-products">No {newCategory} Frames Found<br /><NavLink to="/start-a-frame/">Please Try Other Categories</NavLink></div>
                            }
                        </div>
                    </Card>
                </main>
                frame type selection - {category}
                <Footer />
            </div>
        </>
    )
}

export default FrameType;
