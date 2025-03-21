import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalPrice, removeAllItems } from '../../redux/slices/cartSlice';
import { enqueueSnackbar } from "notistack";
import { addOrder, createOrderPayment, createCashPayment, updateTable, verifyPaymentPayPal } from "../../https/index";
import { useMutation } from "@tanstack/react-query";
import { removeCustomer } from '../../redux/slices/customerSlice';
import Invoice from "../invoice/Invoice";

async function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
}

export default function Bill() {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer);
  const total = useSelector(getTotalPrice);
  const CartData = useSelector((state) => state.cart);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null); // Stanje za podatke narudžbine

  useEffect(() => {
    if (paymentMethod === "Online") {
      const initializePayPal = async () => {
        try {
          await loadScript(
            `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`
          );

          const container = document.getElementById("paypal-button-container");
          if (container) container.innerHTML = "";

          window.paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'paypal'
            },
            createOrder: async () => {
              try {
                const { data: responseData } = await createOrderPayment({
                  amount: totalPriceWithTax.toFixed(2)
                });
                return responseData.order.id;
              } catch (error) {
                enqueueSnackbar("Failed to create payment order", { variant: "error" });
                throw error;
              }
            },
            onApprove: async (data, actions) => {
              try {
                const captureData = await actions.order.capture();

                const verifyResponse = await verifyPaymentPayPal({
                  paypal_order_id: data.orderID,
                  paypal_payment_id: captureData.id,
                  paypal_signature: captureData.purchase_units[0].payments.captures[0].id,
                });

                if (verifyResponse.data.success) {
                  enqueueSnackbar("Payment successful and verified!", { variant: "success" });
                  const orderData = {
                    customerDetails: {
                      name: customerData.customerName,
                      phone: customerData.customerPhone,
                      guests: customerData.guests
                    },
                    orderStatus: "In Progress",
                    bills: {
                      total: total,
                      tax: tax,
                      totalWithTax: totalPriceWithTax
                    },
                    items: CartData,
                    table: customerData.table.tableId,
                    paymentMethod: paymentMethod,
                    paymentData: {
                      client_id: verifyResponse.data.client_id,
                      client_secret: verifyResponse.data.client_secret,
                    }
                  };
                  orderMutation.mutate(orderData);
                } else {
                  enqueueSnackbar("Payment verification failed!", { variant: "error" });
                }
              } catch (error) {
                enqueueSnackbar("Payment processing failed", { variant: "error" });
                console.error("Capture or verification error", error);
              }
            },
            onError: (err) => {
              enqueueSnackbar("Payment initialization failed", { variant: "error" });
              console.error("PayPal error", err);
            }
          }).render("#paypal-button-container");
        } catch (error) {
          enqueueSnackbar("Failed to load PayPal SDK", { variant: "error" });
          console.error("PayPal initialization error", error);
        }
      };

      initializePayPal();
    }
  }, [paymentMethod, totalPriceWithTax]);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method", { variant: "warning" });
      return;
    }

    if (paymentMethod === "Cash") {
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax
        },
        items: CartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
        paymentData: {
          client_id: null,
          client_secret: null,
        }
      };
      orderMutation.mutate(orderData);
      console.log("OrderData before mutation:", JSON.stringify(orderData, null, 2));
    }
  };

  // Mutacija za kreiranje narudžbine
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (reSData) => {
      const { data } = reSData.data;
      console.log("Order placed successfully:", data);

      // Sačuvaj podatke o narudžbini za prikaz računa
      setOrderInfo(data);

      // Ako je plaćanje kešom, pozovi cash payment endpoint
      if (paymentMethod === "Cash") {
        const paymentData = {
          orderId: data._id,
          amount: totalPriceWithTax.toFixed(2),
          currency: "USD", 
          email: customerData.email || "",
          contact: customerData.customerPhone || ""
        };
        cashPaymentMutation.mutate(paymentData);
      }

      // Ažuriraj status stola
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };
      console.log("Sending tableData to updateTable:", tableData);
      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", { variant: "success" });
      setShowInvoice(true); // Prikaži račun nakon uspešnog plaćanja
    },
    onError: (error) => {
      console.log("Error placing order:", error);
    }
  });

  // Mutacija za ažuriranje tabele
  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (resData) => {
      console.log(resData);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    }
  });

  // Mutacija za cash plaćanje
  const cashPaymentMutation = useMutation({
    mutationFn: (paymentData) => createCashPayment(paymentData),
    onSuccess: (res) => {
      console.log("Cash payment recorded:", res.data);
    },
    onError: (error) => {
      console.log("Cash payment error:", error);
    }
  });

  return (
    <>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-gray-200 font-medium mt-2'>Items: ({CartData.length})</p>
        <h1 className='text-white text-md font-bold'>$ {total.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-gray-200 font-medium mt-2'>tax(5.25%)</p>
        <h1 className='text-white text-md font-bold'>$ {tax.toFixed(2)}</h1>
      </div>
      <div className='flex items-center justify-between px-5 mt-2'>
        <p className='text-xs text-gray-200 font-medium mt-2'>Total With Tax: </p>
        <h1 className='text-white text-md font-bold'>$ {totalPriceWithTax.toFixed(2)}</h1>
      </div>
      <div className='flex items-center gap-3 px-5 mt-4 rounded-lg'>
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-3 w-full text-gray-100 font-semibold rounded-lg cursor-pointer ${
            paymentMethod === "Cash" ? "bg-[#383737]" : "bg-gray-800"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-3 w-full text-gray-100 font-semibold rounded-lg cursor-pointer ${
            paymentMethod === "Online" ? "bg-[#383737]" : "bg-gray-800"
          }`}
        >
          Online
        </button>
      </div>
      <div className='flex items-center gap-3 px-5 mt-4 rounded-lg'>
        <button className='bg-blue-700 px-4 py-3 w-full text-white font-semibold rounded-lg'>
          Print Receipt
        </button>
        {paymentMethod === "Cash" ? (
          <button
            onClick={handlePlaceOrder}
            className='bg-yellow-600 px-4 py-3 w-full text-black font-semibold rounded-lg'
          >
            Place Order
          </button>
        ) : (
          <div id="paypal-button-container" className="w-full"></div>
        )}
      </div>
      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
}
