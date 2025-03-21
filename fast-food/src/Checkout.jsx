import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayPalMain from './paypal/PayPalMain';
import NavBar from './NavBar';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { addOrder } from './http'; // Uvezi funkciju addOrder iz API fajla

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phone: ''
    });

    const handlePhoneChange = (phone) => {
        setFormData(prevState => ({ ...prevState, phone }));
    };

    // Funkcija koja se poziva nakon uspešnog plaćanja (npr. preko PayPal)
    const handleOrderSubmit = async () => {
        if (!formData.fullName || !formData.address || !formData.phone) {
            alert("Molimo popunite sva polja pre plaćanja.");
            return;
        }

        const orderData = {
            customerDetails: {
                name: formData.fullName,
                phone: formData.phone,
                guests: 1 // Ako nema polja za broj gostiju, možeš postaviti default ili dodati input
            },
            orderStatus: "In Progress",
            bills: {
                total: totalPrice,
                tax: 0, // Izračunaj ili postavi odgovarajuću vrednost
                totalWithTax: totalPrice * 1.0525
            },
            items: cart,
            // Ako nemaš polje za sto, ostavi ga praznim ili null:
            table: null,
            // PaymentMethod će biti "Online" kada se plaća preko PayPal
            paymentMethod: "Online"
            // Ako imaš paymentData, nakon verifikacije možeš ga dodati ovde
        };

        try {
            const response = await addOrder(orderData);
            alert("Porudžbina uspešno poslata!");
            navigate("/"); // Vraća korisnika na početnu stranicu
        } catch (error) {
            console.error("Greška pri slanju porudžbine:", error);
            alert("Došlo je do greške, pokušajte ponovo.");
        }
    };

    return (
        <div className="checkout">
            <NavBar />
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="checkout-header">
                        <strong>Image</strong>
                        <strong>Name</strong>
                        <strong>Price</strong>
                        <strong>Amount</strong>
                    </div>
                    
                    {cart.map((item) => (
                        <div key={item.id} className="checkout-item">
                            <img style={{ width: "80px" }} src={item.image} alt={item.name} className="checkout-image" />
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                            <p>{item.amount}</p>
                        </div>
                    ))}

                    <div className="checkout-footer">
                        <h3 className="totalprice2">Total Price: ${totalPrice.toFixed(2)}</h3>
                        <form>
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                placeholder="Enter your name" 
                                required 
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                            <label htmlFor="address">Address</label>
                            <input 
                                type="text" 
                                id="address" 
                                placeholder="Enter your address" 
                                required 
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                            <label htmlFor="phone">Phone</label>
                            <PhoneInput
                                defaultCountry="US"
                                placeholder="Your phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                className="phone2"
                            />
                        </form>
                        {/* PayPalMain je komponenta koja renderuje dugme i obavlja plaćanje */}
                        <PayPalMain totalPrice={totalPrice} onSuccess={handleOrderSubmit} />
                    </div>
                </>
            )}
        </div>
    );
}
