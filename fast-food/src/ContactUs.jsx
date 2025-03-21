import NavBar from "./NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import Footer from "./Footer.jsx";
import { addReservation } from "./http/index.js";

export default function ContactUs() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [names, setNames] = useState({
    name: "",
    phone: "",
    date: "",
    people: "",
    textarea: "",
  });

  const handleNavigate = () => {
    window.location.pathname = "/categories";
  };

  const handleChange = (e) => {
    setNames({ ...names, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setNames({ ...names, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!names.name.trim()) {
      setError("Name is required!");
      return;
    }
    if (!names.phone.trim() || !isValidPhoneNumber(names.phone)) {
      setError("Valid phone number is required!");
      return;
    }
    if (!selectedDate) {
      setError("Date is required!");
      return;
    }
    if (!names.people || names.people < 1) {
      setError("Number of people must be at least 1!");
      return;
    }

    // Check if the phone number has been used in the last hour
    const lastReservationTime = localStorage.getItem(names.phone);
    const currentTime = new Date().getTime();

    if (lastReservationTime) {
      const timeDifference = (currentTime - lastReservationTime) / (1000 * 60 * 60);
      if (timeDifference < 1) {
        setError("You can only make a reservation once every hour!");
        return;
      }
    }

    console.log("Form submitted:", names);
    setError("");

    // Transform data to match backend model:
    const bookData = {
      customerDetails: {
        name: names.name,
        phone: names.phone,
        guests: Number(names.people),
        request: names.textarea,
      },
      reservationDate: names.date,
    };

    try {
      const response = await addReservation(bookData);
      alert("Reservation sent");
      localStorage.setItem(names.phone, currentTime.toString());
    } catch (error) {
      console.error("Fail", error);
      alert("Something went wrong, try again");
    }
  };

  const handleReset = () => {
    setNames({ name: "", phone: "", date: "", people: "", textarea: "" });
    setSelectedDate(null);
    setError("");
  };

  return (
    <div className="contact-section">
      <NavBar />
      <div className="contact-header">
        <div className="contact-content">
          <h1>You want to order?</h1>
          <button className="order-btn" onClick={handleNavigate}>
            Order Now
          </button>
          <h1>Want to reserve a table?</h1>
          <button
            className="call-btn"
            onClick={() =>
              document
                .getElementById("reservation-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="reservation" id="reservation-section">
        <h1>Make a reservation</h1>
        <p>
          Yes, we’re fast food lovers. But above all, we’re people – we lead with
          our hearts and believe in giving back to the community. Join us and enjoy
          the best fast food!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="reservation-1">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={names.name}
              onChange={handleChange}
            />
            <div className="phone1">
              <PhoneInput
                id="phone1"
                defaultCountry="US"
                placeholder="Your phone"
                value={names.phone}
                onChange={handlePhoneChange}
                className="phone-input"
              />
            </div>
          </div>
          <div className="reservation-2">
            <DatePicker
              id="datum"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setNames({ ...names, date: date });
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
              name="date"
            />
            <input
              type="number"
              placeholder="Number of people"
              name="people"
              min="1"
              value={names.people}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="textarea"
            placeholder="Special Requests"
            style={{ resize: "none" }}
            rows={6}
            value={names.textarea}
            onChange={handleChange}
          ></textarea>
          {error && <div className="error-message">{error}</div>}
          <div className="button-container">
            <button type="submit" className="contact-submit">
              Submit
            </button>
            <button type="button" className="contact-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
