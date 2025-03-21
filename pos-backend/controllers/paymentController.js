const paypal = require("@paypal/checkout-server-sdk");
const mongoose = require("mongoose");

const config = require("../config/config");
const createHttpError = require("http-errors");
const Payment = require("../models/paymentModel");

// PayPal API klijent
const environment = new paypal.core.SandboxEnvironment(
  config.client_id, 
  config.client_secret
);
const client = new paypal.core.PayPalHttpClient(environment);

/**
 * Kreira novu PayPal narudžbinu
 */
const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toString()
          },
        },
      ],
    });

    const order = await client.execute(request);
    res.json({ success: true, order: order.result });
  } catch (error) {
    next(error);
  }
};

/**
 * Verifikuje PayPal plaćanje i čuva ga u bazi
 */
const verifyPayment = async (req, res, next) => {
  try {
    const { paypal_order_id } = req.body;

    if (!paypal_order_id) {
      return next(createHttpError(400, "PayPal order ID nedostaje"));
    }

    const request = new paypal.orders.OrdersGetRequest(paypal_order_id);
    const order = await client.execute(request);

    if (order.result.status === "COMPLETED") {
      // Čuvanje uplate u MongoDB
      const newPayment = new Payment({
        paymentId: order.result.id,
        orderId: order.result.purchase_units[0].reference_id || "N/A",
        amount: parseFloat(order.result.purchase_units[0].amount.value),
        currency: order.result.purchase_units[0].amount.currency_code,
        status: order.result.status,
        method: "PayPal",
        email: order.result.payer.email_address,
        contact: order.result.payer.payer_id,
        createdAt: new Date(order.result.create_time)
      });

      await newPayment.save();

      return res.json({ success: true, message: "Payment verified and saved!" });
    } else {
      return next(createHttpError(400, "Payment verification failed!"));
    }
  } catch (error) {
    console.error("PayPal verification error:", error);
    next(error);
  }
};

/**
 * Webhook verifikacija PayPal uplate
 */
const webHookVerification = async (req, res, next) => {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      return res.status(500).json({ success: false, message: "Webhook ID missing" });
    }

    // PayPal SDK validacija webhook događaja
    const body = JSON.stringify(req.body);
    const headers = req.headers;

    const response = await paypal.notification.webhookEvent.verify(
      webhookId, headers, body
    );

    if (response.verification_status !== "SUCCESS") {
      console.error("Webhook verification failed!");
      return res.status(400).json({ success: false, message: "Invalid webhook signature" });
    }

    console.log("Webhook verified successfully!");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("PayPal Webhook error:", error);
    res.status(500).json({ success: false, message: "Internal error" });
  }
};


//test
const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({});
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};





//ZBOG PROBLEMA SA PLACANJEM KESOM DODAO SAM OVU RUTU

const createCashPayment = async (req, res, next) => {
  try {
    // Očekujemo da frontend pošalje orderId i amount (kao broj) i opcionalno email i contact.
    const { orderId, amount, currency, email, contact } = req.body;
    if (!orderId || !amount) {
      return next(createHttpError(400, "Missing required payment details"));
    }

    const cashPaymentData = {
      paymentId: "CASH-" + Date.now(), // Generiši jedinstveni paymentId za cash plaćanje
      orderId,                        // Ovo treba da bude _id narudžbine
      amount,                         // Amount kao broj (npr. 12.63)
      currency: currency || "USD",
      status: "COMPLETED",
      method: "Cash",
      email: email || "",             // Ako nema email, postavi prazan string
      contact: contact || "",         // Isto za kontakt
      createdAt: new Date(),
    };

    const newPayment = await Payment.create(cashPaymentData);
    res.status(201).json({ success: true, message: "Cash payment saved", data: newPayment });
  } catch (error) {
    next(error);
  }
};


module.exports = { createOrder, verifyPayment, webHookVerification, getPayments, createCashPayment };
