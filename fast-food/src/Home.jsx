import React from 'react';
import NavBar from "./NavBar";
import img1 from './assets/vucelja.png';

export default function Home() {
    const handleNavigate=()=>{
            window.location.pathname="/categories"
    }
    return (
        <div className="home-section">
            <NavBar />
            <div className="home-container">
                <div className="home-info">
                    <div className="card">
                        <div className="loader">
                            <h1>Order Now</h1>
                            <div className="words">
                                <span className="word">Burgers</span>
                                <span className="word">Steaks</span>
                                <span className="word">Pancakes</span>
                                <span className="word">Drinks</span>
                                <span className="word">Gyros</span>
                                <span className="word">Chicken</span>
                                <span className="word">Kebabs</span>
                                <span className="word">Wraps</span>
                                <span className="word">Sandwiches</span>
                                <span className="word">Hot Dogs</span>
                                <span className="word">Fries</span>
                            </div>
                        </div>
                    </div>
                    <h2>Fast and free home delivery!</h2>
                    <h4>We don't just make food. We make people's days.</h4>
                    <div className="buttons">
                        <button className='order-btn-1' onClick={handleNavigate}>Order Now</button>
                        <button className='order-btn-2'>Get Free Call</button>
                    </div>
                </div>
            </div>
            <div className="home-gallery">
                <img src={img1} alt="" />
            </div>
        </div>
    );
}