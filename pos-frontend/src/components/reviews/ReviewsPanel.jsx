import React, { useEffect, useState } from "react";


import { getReviews, deleteReview } from "../../https";
import { FaTrashAlt } from "react-icons/fa";

const ReviewsPanel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = () => {
    getReviews()
      .then((response) => {
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Error fetching reviews.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter((r) => r._id !== reviewId));
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review.");
      }
    }
  };

  return (
    <div className="reviews-panel">

      <div className="reviews-list bg-[#2c2c2c] p-4 overflow-y-auto">
        {loading ? (
          <p className="text-white">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-white">No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item relative bg-[#1f1f1f] px-6 py-4 m-2 rounded shadow-md">
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => handleDelete(review._id)}
              >
                <FaTrashAlt size={20} className="text-red-500 hover:text-red-700" />
              </div>
              <h3 className="text-white">{review.reviewsrDetails.name}</h3>
              <p className="review-email text-white">{review.reviewsrDetails.email}</p>
              <p className="text-white">{review.reviewsrDetails.review}</p>
            </div>
          ))
        )}
      </div>
    
    </div>
  );
};

export default ReviewsPanel;
