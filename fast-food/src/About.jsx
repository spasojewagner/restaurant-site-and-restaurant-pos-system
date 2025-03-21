import NavBar from "./NavBar";
import ImageSlider from "./ImageSlider";
import React from 'react';
import s1 from './assets/image1.jpg';
import s2 from './assets/image2.jpg';
import s3 from './assets/image3.jpg';
import s4 from './assets/image4.jpg';
import s5 from './assets/image5.jpg';
import s6 from './assets/image6.jpg';
import s7 from './assets/image7.jpg';
import s8 from './assets/image8.jpg';
import "./ImageSlider.css";
import StatsSection from "./StatsSection.jsx";

import staff1 from './assets/staff1.jpg';
import staff2 from './assets/staff2.png';
import staff3 from './assets/staff3.jpg';

import Testimonials from "./Testimonials.jsx";
import Footer from "./Footer.jsx";
export default function About() {

    const handleNavigator = () => {
        window.location.pathname = "/categories";
    }
    const handleNavigator2 = () => {
        window.location.pathname = "/contact";
    }

    const images = [s1, s2, s3, s4, s5, s6, s7, s8];

    return (
        <div className="about-section">
            <NavBar />
            <div className="services-title">
                <h1>About Our Restaurant</h1>
            </div>
            <div className="about-paragraf">
                <p>A restaurant sometimes known as a diner is a place where cooked food is sold to the public, and where people sit down to eat it. It is also a place where people go to enjoy the time and to eat a meal. Some restaurants are a chain, meaning that there are restaurants which have the same name and serve is also a place where people go to enjoy the time and to eat a meal the same food.</p>
            </div>
            <div className="about-paragraf-btn">
                <button className="about-paragraf-btn-1" onClick={handleNavigator2 }>Book Now &gt; </button>
                <button className="about-paragraf-btn-2" onClick={handleNavigator}>View menu &gt;</button>
            </div>

            <div>
                <h1 style={{ color: "white", fontSize: "3rem" }}>Gallery</h1>
                <ImageSlider images={images} />
            </div>
            <div>
                <StatsSection />
            </div>
            <div className="about-team">
                <div className="about-team-title">
                    <h1>Meet Our Team</h1>
                </div>
                <div className="about-team-img">
                    <div className="about-team-img-1">
                        <img src={staff1} alt="" />
                        <h3>Emily Johnson</h3>
                        <h5>Waitress</h5>
                    </div>
                    <div className="about-team-img-1">
                        <img src={staff2} alt="" />
                        <h3> Sophia Martinez</h3>
                        <h5>House Chief</h5>
                    </div>
                    <div className="about-team-img-1">
                        <img src={staff3} alt="" />
                        <h3>Daniel Anderson</h3>
                        <h5>Executive Chef</h5>
                    </div>
                </div>
                <div>
                     <button className="about-paragraf-btn-1">VIEW ALL STUFF &gt;</button>
                </div>
               
            </div>
            <div className="testimonials">
                    <Testimonials/>
            </div>
            <div className="div-foter">
                    <Footer/>
            </div>
        </div>
    );

}
