import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalCheckout from "./PayPalCheckout";

const PAYPAL_CLIENT_ID = "AUAsVAKCv-FwJ8Xw1tP5XBnm4LE59aV_gi-BGjJUt6T5KzbQ7i41juyzfi2lUP62TSlYTMfYtG7o5MQM";

function PayPalMain({ totalPrice, onSuccess }) {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
        <PayPalCheckout totalPrice={totalPrice} onSuccess={onSuccess} />
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalMain;
