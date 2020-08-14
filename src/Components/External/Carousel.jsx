import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carouselle({ slides }) {
    return (
        <Carousel
            autoPlay={true}
            showThumbs={false}
            showStatus={false}
            stopOnHover={true}
            infiniteLoop={true}>
            {
                slides.map((slide, index) => {
                    return (
                        <div key={index}>
                            <p>{slide.testimony}</p>
                            <p>{slide.name}</p>
                        </div>
                    );
                })
            }
        </Carousel>
    );
}

export default Carouselle;
