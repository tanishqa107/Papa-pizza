import React, { useState } from 'react';
import type { User, View, CartItem, Offer } from '../../types';
import PizzaButton from './PizzaButton';
import Icon from './Icon';

interface CheckoutProps {
    user: User;
    total: number;
    deliveryCharge: number;
    setActiveView: (view: View) => void;
    onOrderSuccess: () => void;
    cartItems: CartItem[];
    tax: number;
    appliedOffer: Offer | null;
}

const Checkout: React.FC<CheckoutProps> = ({ user, total, deliveryCharge, setActiveView, onOrderSuccess, cartItems, tax, appliedOffer }) => {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(user.address);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const RAZORPAY_KEY_ID = 'rzp_live_RLqVBqxrDj5NsB';

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePaymentSuccess = async (response: any) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        try {
            const verifyResponse = await fetch(`${BACKEND_URL}/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    signature: razorpay_signature,
                    user_id: user.id,
                    items: JSON.stringify(cartItems),
                    total,
                    name,
                    phone,
                    address,
                }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
                onOrderSuccess();
            } else {
                setError('Payment verification failed. Please contact support.');
            }
        } catch (err) {
            setError('Error verifying payment. Please try again.');
        }
    };

    const handlePaymentFailure = () => {
        setError('Payment failed. Please try again.');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !address || cartItems.length === 0) {
            setError('Please fill all details and add items to cart.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create order on backend
            const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    items: JSON.stringify(cartItems),
                    total,
                    name,
                    phone,
                    address,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                throw new Error('Failed to load Razorpay SDK');
            }

            // Open Razorpay checkout
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Papa Pizza',
                description: 'Order Payment',
                order_id: orderData.order_id,
                handler: handlePaymentSuccess,
                prefill: {
                    name,
                    contact: phone,
                },
                theme: {
                    color: '#ff0000',
                },
                modal: {
                    ondismiss: handlePaymentFailure,
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <section className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => setActiveView('cart')}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-4"
                    aria-label="Back to cart"
                >
                    <Icon size={7}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></Icon>
                </button>
                <h2 className="text-3xl font-bold text-stone-900">Checkout</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Delivery Details</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
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
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
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
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                                <button type="button" onClick={() => setAddress(user.address)} className="text-sm text-red-600 hover:underline">Use saved</button>
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
                            <span className="text-green-600 font-medium">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-stone-800 mt-4">
                        <span>Total to Pay</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                            {error}
                        </div>
                    )}
                    <PizzaButton
                        onClick={handleSubmit}
                        className="w-full mt-6 py-3"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
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