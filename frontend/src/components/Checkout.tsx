import React, { useState, useEffect } from "react";
import type { CartItem, User, View } from "../../types";
import PizzaButton from "./PizzaButton";
import Icon from "./Icon";
import axios from "axios";

interface CheckoutProps {
  user: User;
  total: number;
  deliveryCharge: number;
  pizzas: CartItem[];   // 👈 FIXED: real items, not strings
  setActiveView: (view: View) => void;
  onOrderSuccess: () => void;
}

  

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout: React.FC<CheckoutProps> = ({
  user,
  total,
  deliveryCharge,
  setActiveView,
  pizzas,
  onOrderSuccess,
}) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(user.address);

  // ✅ Inject Razorpay script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Handle Payment
 // ✅ Handle Payment
const handlePayment = async () => {
  try {
    const finalAmount = total + deliveryCharge;

    // 👀 Log pizzas before payment
    console.log("Pizzas at checkout:", pizzas);

    // 1. Create order from backend
    const { data } = await axios.post("http://localhost:3000/api/orders", {
      amount: finalAmount,
    });

    // 2. Razorpay Checkout Options
    const options = {
      key: "rzp_live_RLvHgoC9WQRAsK",
      amount: data.amount,
      currency: data.currency,
      name: "Papa Pizza",
      description: "Order Payment",
      order_id: data.id,
      handler: async (response: any) => {
        const verifyRes = await axios.post("http://localhost:3000/api/verify", response);
        if (verifyRes.data.success) {
          // ✅ Log order details before sending mail
          console.log("Order details going to mail API:", {
            pizzas,
            customerName: name,
            phone,
            address,
            amount: finalAmount,
          });

          await axios.post("http://localhost:3000/send-mail", {
            pizzas: pizzas.map((item) => ({
              name: item.pizza.name,
              quantity: item.quantity,
              size: item.size,
            })),
            customerName: name,
            phone,
            address,
            amount: finalAmount,
          });

          alert("Payment Successful!");
          onOrderSuccess();
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "Papa-Pizza Account",
        email: "tanishqadwivedi7@gmail.com",
        contact: "8840972644",
      },
      notes: {
        address,
      },
      theme: {
        color: "#EF4444",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error(error);
  }
};


  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setActiveView("cart")}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-4"
          aria-label="Back to cart"
        >
          <Icon size={7}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </Icon>
        </button>
        <h2 className="text-3xl font-bold text-stone-900">Checkout</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Delivery Details</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="e.g. (123) 456-7890"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Address
                </label>
                <button
                  type="button"
                  onClick={() => setAddress(user.address)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Use saved
                </button>
              </div>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              ></textarea>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 border-b pb-4">
            <div className="flex justify-between text-gray-600">
              <span>Order Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-green-600 font-medium">
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge.toFixed(2)}`}
              </span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-xl text-stone-800 mt-4">
            <span>Total to Pay</span>
            <span>₹{(total + deliveryCharge).toFixed(2)}</span>
          </div>
          <PizzaButton
            onClick={handlePayment}
            className="w-full mt-6 py-3"
          >
            Pay ₹{(total + deliveryCharge).toFixed(2)}
          </PizzaButton>
          <p className="text-xs text-gray-500 mt-4 text-center">
            By clicking "Pay", you agree to Papa's terms of service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
