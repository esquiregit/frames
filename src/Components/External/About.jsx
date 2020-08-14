import React, { useEffect } from 'react';
import Footer from './Layout/Footer';
import Header from './Layout/Header';

function About() {
    useEffect(() => {
        document.title = 'About | Frames';
    }, []);

    return (
        <>
            <Header />
            <div>
                this is about page
            </div>
            <Footer />
        </>
    )
}

export default About;
