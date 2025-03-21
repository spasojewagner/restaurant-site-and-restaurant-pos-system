import React, { useState } from "react";

const ImageSlider = ({ images }) => { //images je ovde kao prop koji prihvata niz slika
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => { //funkcija za prelaz na sledecu sliku
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); //%image.length nam osigurava da kada dodjemo do kraja niza da se  index vrati na 0
    };
    //funckija za vracanje jednu sliku unazad
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="slider-container">
            <button className="left-arrow" onClick={prevSlide}>&#9665;</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="slide-image" />
            <button className="right-arrow" onClick={nextSlide}>&#9655;</button>
        </div>
    );
};

export default ImageSlider;