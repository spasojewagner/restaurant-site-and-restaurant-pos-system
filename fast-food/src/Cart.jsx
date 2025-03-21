import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom'; // Dodajte useNavigate za navigaciju

export default function Cart() {
    const { cart, handleRemoveFromCart, handleChangeQuantity, totalPrice } = useContext(CartContext);
    const navigate = useNavigate(); // Hook za navigaciju

    const handleCheckout = () => {
        // Preusmeravanje na stranicu za plaćanje
        navigate("/checkout", { state: { cart, totalPrice } }); // Prosleđujemo korpu i ukupnu cenu
    };

    return (
        <>
            <div className="cart">
                <div className="cart-section">
                    <NavBar />
                    <div className="cart-header">
                        {cart.length === 0 ? <p>Cart is empty.</p> : <h2>Your cart</h2>}
                    </div>
                    {cart.length > 0 && (
                        <>
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <h3>{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <p>Amount: {item.amount}</p>
                                    <img src={item.image} alt={item.name} className="cart-image" />
                                    <div className="buttons">
                                        <button onClick={() => handleChangeQuantity(item.id, -1)}>-</button>
                                        <button onClick={() => handleChangeQuantity(item.id, 1)}>+</button>
                                        <button className="remove-cart" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className="cart-footer">
                                <h3 className="totalprice">Total Price: ${totalPrice.toFixed(2)}</h3>
                                <button onClick={handleCheckout}>Message & Pay</button> {/* Dodajte onClick handler */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}