import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { addReview, getReviews } from "./http/index.js";

export default function Reviews() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  // Učitaj recenzije iz baze umjesto iz localStorage
  useEffect(() => {
    getReviews()
      .then((response) => {
        setReviews(response.data.data);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.review) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    // Transformacija – podaci se šalju unutar objekta "reviewsrDetails"
    const payload = { reviewsrDetails: formData };

    addReview(payload)
      .then((response) => {
        // Dodaj novu recenziju u listu
        setReviews([...reviews, response.data.data]);
        setFormData({ name: "", email: "", review: "" });
      })
      .catch((err) => {
        console.error("Error adding review:", err);
        setError("Error submitting review.");
      });
  };

  return (
    <div className="reviews-section">
      <NavBar />
      <div className="reviews-header">
        <div className="reviwes-info">
          <h1>Leave us a review.</h1>
          <p>
            Reviews are crucial for a company's reputation as they build trust,
            influence customer decisions, and improve search engine visibility.
            Positive reviews increase credibility and attract new clients, while
            negative ones provide an opportunity for service improvement.
          </p>
        </div>
        <div className="reviwes-input">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={handleChange}
              maxLength={20}
            />

            <label htmlFor="email">Enter Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="metodafastfood@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="review">Enter your review</label>
            <textarea
              name="review"
              placeholder="We don't just make food. We make people's days."
              rows="6"
              value={formData.review}
              onChange={(e) => {
                if (e.target.value.length <= 156) {
                  setFormData({ ...formData, review: e.target.value });
                }
              }}
              style={{ resize: "none" }}
              maxLength={156}
            ></textarea>

            <p style={{ color: "white" }} className="char-count">
              Characters remaining: {156 - formData.review.length}
            </p>

            {error && <div className="error-message">{error}</div>}
            <div className="btn-review">
              <button type="submit">Submit review</button>
            </div>
          </form>
        </div>
      </div>

      <div className="reviews-list">
        <h1>Your Reviews</h1>
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h3>{review.reviewsrDetails.name}</h3>
            <p className="review-email">{review.reviewsrDetails.email}</p>
            <p>{review.reviewsrDetails.review}</p>
          </div>
        ))}
      </div>
      <div className="div-foter">
        <Footer />
      </div>
    </div>
  );
}
