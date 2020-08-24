import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { NavLink } from 'react-router-dom';
import { getBaseURL } from '../Extras/server';

function FrameTemplate({ index, frame, user, wishlist, wishlistAction }) {

    return (
        <Grid key={index} item xs={6} sm={4} lg={2}>
            {
                user &&
                <span>
                    {
                        wishlist && wishlist.includes(frame.product_id) ?
                        // index % 2 === 0 ?
                            <IconButton
                                className="wishlist-action"
                                onClick={() => wishlistAction(frame.id, frame.product_id, 'add')}>
                                <FavoriteBorderOutlinedIcon color="primary" />
                            </IconButton> :
                            <IconButton
                                className="wishlist-action"
                                onClick={() => wishlistAction(frame.id, frame.product_id, 'remove')}>
                                <FavoriteIcon color="primary" />
                            </IconButton>
                    }
                </span>
            }
            <NavLink to={`/design/${frame.product_id}`}>
                <div>
                    <img src={getBaseURL() + frame.image} alt={frame.name} />
                </div>
                <p style={{ textDecoration: 'none' }}>{frame.name}</p>
            </NavLink>
        </Grid>
    )
}

export default FrameTemplate;
