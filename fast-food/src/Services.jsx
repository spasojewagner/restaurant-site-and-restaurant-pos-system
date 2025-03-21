import NavBar from "./NavBar";

import React from 'react';
import s1 from './assets/freshfood.png';
import s2 from './assets/delivery.jpg';
import s3 from './assets/disco.jpg';
import s4 from './assets/ontime.jpg';
import s5 from './assets/vat.jpg';
import s6 from './assets/konobar.jpg';

import Footer from "./Footer";
export default function Services() {


    const menuItems = [
        {
            services: "SERVICES",
            serve: [
                { name: "Fresh Healthy Food", description: "Fresh food is food which has not been preserved and has not spoiled yet. For vegetables and fruits, this means.", image: s1 },
                { name: "Free Fast Home Delivery", description: "Enjoy fast and free home delivery, ensuring your food arrives fresh and hot right at your doorstep.", image: s2 },
                { name: "Discount Voucher", description: "Get exclusive discount vouchers and save on your favorite meals while enjoying high-quality food.", image: s3 },
                { name: "On Time Service", description: "We value your time! Our on-time service ensures you get your order exactly when you need it.", image: s4 },
                { name: "VAT Free", description: "Pay less and enjoy more with our VAT-free policy on selected food items and services.", image: s5 },
                { name: "Qualityful Food", description: "We prioritize quality by using the finest ingredients to prepare delicious and healthy meals.", image: s6 },
            ]
        },
    ];

    return (
        <div className="services-section">
            <NavBar />
            <div className="services-title">
                <h1>Your Services</h1>
            </div>
            <div className="service-items">
                {menuItems[0].serve.map((serve, serveIndex) => (
                    <div key={serveIndex} className="service-item">
                        <img src={serve.image} alt={serve.name} />
                        <h3>{serve.name}</h3>
                        <p>{serve.description}</p>
                    </div>
                ))}
            </div>
              <div className="div-foter">
                                <Footer/>
                        </div>
        </div>
    );


}