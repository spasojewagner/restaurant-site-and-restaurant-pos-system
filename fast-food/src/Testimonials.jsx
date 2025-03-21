import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import img1 from './assets/testimonial1.jpg';
import img2 from './assets/testimonial2.jpg';
import img3 from './assets/testimonial3.jpg';



// Stilizovana komponenta za testimonials sekciju
const TestimonialsSection = styled.div`
  text-align: center;
  padding: 50px;
  background-color: yellow; /* Žuta pozadina */
`;

const TestimonialsTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: black; /* Tekst crne boje */
`;

const TestimonialSlide = styled.div`
  max-width: 800px;
  margin: auto;
  padding-bottom: 40px; /* Dodajemo padding da podignemo tekst malo gore */
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: black; /* Tekst crne boje */
`;

const TestimonialInfo = styled.div`
  display: flex;
  align-items: center; /* Poravnavamo sliku i tekst vertikalno */
  justify-content: center; /* Centriramo sadržaj horizontalno */
`;

const TestimonialImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Zaokružena slika */
  margin-right: 10px; /* Razmak između slike i teksta */
`;
const TestimonialDetails = styled.div`
  text-align: left; /* Tekst poravnat levo */
`;

// Stilizacija za paginacione tačke
const CustomPagination = styled.div`
  .swiper-pagination-bullet {
    background: black; /* Crna boja za tačke */
    opacity: 1;
    margin: 0 5px;
  }

  .swiper-pagination-bullet-active {
    background: black; /* Crna boja za aktivnu tačku */
  }

  .swiper-pagination {
    position: absolute;
    bottom: 10px; /* Spuštamo tačke još niže */
  }
`;

const testimonials = [
    {
        name: "Adam Jefferson",
        role: "Lawyer, New York",
        text: "Metoda was one of the first restaurants I discovered upon moving to New York. The quality of the food and service has always been excellent.",
        img: img1,
    },
    {
        name: "Sophie Martinez",
        role: "Food Critic, LA",
        text: "A wonderful experience! The pasta was fresh, the ingredients high-quality, and the service was outstanding. A must-visit place!",
        img: img2,
    },
    {
        name: "Michael Brown",
        role: "Chef, Paris",
        text: "As a chef, I appreciate the attention to detail and the quality of ingredients they use. Highly recommended for a fine dining experience!",
        img: img3,
    },
];

export default function Testimonials() {
    return (
        <TestimonialsSection>
            <TestimonialsTitle>OUR CLIENTS SAY</TestimonialsTitle>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialSlide>
                            <TestimonialText>"{testimonial.text}"</TestimonialText>
                            <TestimonialInfo>
                                <TestimonialImage src={testimonial.img} alt={testimonial.name} />
                                <TestimonialDetails>
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.role}</p>
                                </TestimonialDetails>
                            </TestimonialInfo>
                        </TestimonialSlide>
                    </SwiperSlide>
                ))}
            </Swiper>
            <CustomPagination />
        </TestimonialsSection>
    );
}