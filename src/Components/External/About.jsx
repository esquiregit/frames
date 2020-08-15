import React, { useEffect } from 'react';
import Footer from './Layout/Footer';
import Header from './Layout/Header';
import { useSelector } from 'react-redux';

function About() {
    useEffect(() => {
        document.title = 'About | Frames';
    }, []);
    const user = useSelector(state => state.authReducer.user);

    return (
        <>
            <Header user={user} />
            <div>
                this is about page
            </div>
            <Footer />
        </>
    )
}

export default About;
