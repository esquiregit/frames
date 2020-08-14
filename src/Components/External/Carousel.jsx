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
                slides.map(slide => {
                    return (
                        <div>
                            <p>{slide.testimony}</p>
                            <p>{slide.name}</p>
                        </div>
                    );
                })
            }
        </Carousel>
        // <Carousel
        //     autoPlay={true}
        //     showThumbs={false}
        //     showStatus={false}
        //     stopOnHover={true}
        //     infiniteLoop={true}>
        //     <div>
        //         <p>
        //             Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        //         </p>
        //         <p>Solomon Danso</p>
        //     </div>
        //     <div>
        //         <p>
        //             Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        //         </p>
        //         <p>Enoch tetteh</p>
        //     </div>
        //     <div>
        //         <p>
        //             Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
        //         </p>
        //         <p>isaac bravo</p>
        //     </div>
        // </Carousel>
    );
}

export default Carouselle;
