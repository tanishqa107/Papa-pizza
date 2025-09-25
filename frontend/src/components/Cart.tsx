import React from 'react';
import type { CartItem, View, Offer } from '../../types';
import { SURPRISE_TREAT_PIZZA } from '../constants';
import Icon from './Icon';
import PizzaButton from './PizzaButton';
import { SUPER_SAVING_COMBOS, PIZZA_MANIA_MENU } from '../constants';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (pizzaId: number, size: 'small' | 'medium' | 'large', newQuantity: number) => void;
  setActiveView: (view: View) => void;
  appliedOffer: Offer | null;
  removeOffer: () => void;
  subtotal: number;
  tax: number;
  total: number;
  deliveryCharge: number;
}

const Cart: React.FC<CartProps> = ({ cartItems, updateQuantity, setActiveView, appliedOffer, removeOffer, subtotal, tax, total, deliveryCharge }) => {

  // Helper function to convert size to display format
  const getSizeDisplay = (item: CartItem) => {
    // Check if this is a Pizza Mania pizza (has price property instead of sizes)
    const isPizzaMania = !item.pizza.sizes && item.pizza.price && PIZZA_MANIA_MENU.some(p => p.id === item.pizza.id);
    // Check if this is a Super Saving Combos pizza (same as Pizza Mania)
    const isSuperSavingCombo = !item.pizza.sizes && item.pizza.price && SUPER_SAVING_COMBOS.some(p => p.id === item.pizza.id);

    if (isPizzaMania) {
  // Pizza Mania pizzas always show 7"
  return 'papa recommends ';
} else if (isSuperSavingCombo) {
  // Super Saving Combos pizzas show no size in cart
  return 'papa recommends ';
} else {
  // Famous Menu pizzas show their actual size
  switch (item.size) {
    case 'small':
      return 'small';
    case 'medium':
      return 'medium';
    case 'large':
      return 'large';
    default:
      return item.size;
  }
}

  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <Icon className="mx-auto text-gray-300" size={24}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.75H5.168a2.25 2.25 0 00-2.122 2.122L3 7.5M11.25 14.25a3 3 0 00-3 3h6.75a3 3 0 00-3-3z" /></Icon>
        <h2 className="mt-4 text-2xl font-bold text-stone-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Looks like you haven't added any pizzas yet. Let's fix that!</p>
        {appliedOffer && (
          <div className="max-w-md mx-auto mt-6">
            <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg flex justify-between items-center">
              <div>
                  <p className="font-bold">Offer Applied: {appliedOffer.title}</p>
                  <p className="text-sm">Add items to your cart to see the discount!</p>
              </div>
              <button
                  onClick={removeOffer}
                  className="p-1 rounded-full hover:bg-green-200"
                  aria-label="Remove offer"
              >
                  <Icon size={5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Your Order</h2>
      <div className="bg-white rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {cartItems.map(item => {
            const isRewardItem = item.pizza.id === SURPRISE_TREAT_PIZZA.id;
            return (
              <li key={`${item.pizza.id}-${item.size}`} className="p-4 flex items-center space-x-4">
                <img src={item.pizza.imageUrl} alt={item.pizza.name} className="w-20 h-20 rounded-md object-cover" />
                <div className="flex-grow">
                  <h3 className="font-bold">{item.pizza.name} ({getSizeDisplay(item)})</h3>
                  <p className="text-sm text-gray-500">
                    ₹{
                      item.pizza.sizes && item.size
                        ? item.pizza.sizes[item.size].toFixed(2)
                        : (item.pizza.price ?? 0).toFixed(2)
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (item.size) updateQuantity(item.pizza.id, item.size, item.quantity - 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isRewardItem || !item.size}
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {
                      if (item.size) updateQuantity(item.pizza.id, item.size, item.quantity + 1);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isRewardItem || !item.size}
                  >
                    +
                  </button>
                </div>
                <p className="font-bold w-20 text-right">
                  {isRewardItem ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${
                      item.pizza.sizes && item.size
                        ? (item.pizza.sizes[item.size] * item.quantity).toFixed(2)
                        : ((item.pizza.price ?? 0) * item.quantity).toFixed(2)
                    }`
                  )}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="p-4 border-t border-gray-200">
          {appliedOffer && (
            <div className="p-3 mb-4 bg-green-100 border border-green-300 text-green-800 rounded-lg flex justify-between items-center">
              <div>
                  <p className="font-bold">Offer Applied: {appliedOffer.title}</p>
                  <p className="text-sm">Offer is active for your order.</p>
              </div>
              <button
                  onClick={removeOffer}
                  className="p-1 rounded-full hover:bg-green-200"
                  aria-label="Remove offer"
              >
                  <Icon size={5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
              </button>
            </div>
           )}
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes (8%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-stone-800">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
          <PizzaButton onClick={() => setActiveView('checkout')} className="w-full mt-6 py-3">
            Proceed to Checkout
          </PizzaButton>
        </div>
      </div>
    </section>
  );
};

export default Cart;
