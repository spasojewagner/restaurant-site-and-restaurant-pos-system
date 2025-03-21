import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout({ totalPrice, onSuccess }) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: totalPrice.toFixed(2) } }],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          alert(`Payment completed by ${details.payer.name.given_name}`);
          onSuccess(); // Ova funkcija šalje porudžbinu backendu
        });
      }}
      onError={(err) => {
        console.error("Payment error:", err);
        alert("Došlo je do greške pri plaćanju. Pokušajte ponovo.");
      }}
    />
  );
}

export default PayPalCheckout;
