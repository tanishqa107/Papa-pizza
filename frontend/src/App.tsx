
import React, { useState, useMemo } from 'react';
import type { View, Pizza, CartItem, User, Offer } from '../types';
import { NAV_ITEMS, SURPRISE_TREAT_PIZZA, DELIVERY_CHARGE } from './constants';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Offers from './components/Offers';
import Profile from './components/Profile';
import Points from './components/Points';
import Cart from './components/Cart';
import PizzaDetailModal from './components/PizzaDetailModal';
import OrderHistory from './components/OrderHistory';
import Checkout from './components/Checkout';
import PopupModal from './components/PopupModal';
import Icon from './components/Icon';

type PopupContent = {
  title: string;
  message: string;
  type: 'success' | 'info';
  onClose?: () => void;
};


// Default user for the application
const DEFAULT_USER: User = {
  id: 'default-user',
  name: 'Pizza Lover',
  address: '123 Pizza Lane, Flavor Town',
  points: 100, // Start with some points
  avatar: 'pepperoni'
};

export default function App() {
  const [activeView, setActiveView] = useState<View>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);


  const handleSelectPizza = (pizza: Pizza) => {
    setSelectedPizza(pizza);
  };

  const handleCloseModal = () => {
    setSelectedPizza(null);
  };

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.pizza.id === item.pizza.id && cartItem.size === item.size);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.pizza.id === item.pizza.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };
  
  const updateQuantity = (pizzaId: number, size: 'small' | 'medium' | 'large', quantity: number) => {
      setCart(prevCart => {
          if (quantity <= 0) {
              return prevCart.filter(item => item.pizza.id !== pizzaId || item.size !== size);
          }
          return prevCart.map(item =>
              item.pizza.id === pizzaId && item.size === size ? { ...item, quantity } : item
          );
      });
  };

  const handleRedeemReward = () => {
    const REWARD_COST = 500;
    if (DEFAULT_USER.points >= REWARD_COST) {
        const isRewardInCart = cart.some(item => item.pizza.id === SURPRISE_TREAT_PIZZA.id);
        if (isRewardInCart) {
            setPopupContent({
                title: 'Already Redeemed',
                message: 'You already have a surprise treat in your cart!',
                type: 'info',
                onClose: () => setActiveView('cart'),
            });
            return;
        }

        addToCart({ pizza: SURPRISE_TREAT_PIZZA, size: 'medium', quantity: 1 });
        setPopupContent({
            title: 'Reward Redeemed!',
            message: "A surprise treat has been added to your cart. Enjoy!",
            type: 'success',
            onClose: () => setActiveView('cart'),
        });
    }
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const { subtotal, tax, total, deliveryCharge } = useMemo(() => {
    const sub = cart.reduce((sum, item) => {
      // Handle both Famous Menu pizzas (with sizes) and Pizza Mania pizzas (with price)
      const price = item.pizza.sizes && item.size ? item.pizza.sizes[item.size] ?? 0 : item.pizza.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
    const taxAmount = sub * 0.08;
    // Set delivery to 0 if the 4th offer (Free Weekday Delivery) is applied
    const delivery = appliedOffer && appliedOffer.id === 4 ? 0 : DELIVERY_CHARGE;
    const finalTotal = sub + taxAmount + delivery;
    return {
      subtotal: sub,
      tax: taxAmount,
      total: finalTotal,
      deliveryCharge: delivery,
    };
  }, [cart, appliedOffer]);

  const handleClaimOffer = (offer: Offer) => {
    if (appliedOffer) {
        setPopupContent({
            title: 'Offer Limit Reached',
            message: 'Only one offer can be applied per order.',
            type: 'info',
        });
    } else {
        setAppliedOffer(offer);
        setPopupContent({
            title: 'Offer Applied!',
            message: `Offer "${offer.title}" has been successfully applied.`,
            type: 'success',
            onClose: () => setActiveView('cart'),
        });
    }
  };

  const handleRemoveOffer = () => {
    setAppliedOffer(null);
  };

  const handleSuccessfulOrder = () => {
    const orderTotal = total;
    setCart([]);
    setAppliedOffer(null);
    setPopupContent({
        title: 'Order Placed!',
        message: "Grazie! Your order has been placed. Papa is on it!",
        type: 'success',
        onClose: () => setActiveView('menu'),
    });
  };

  const handleClosePopup = () => {
    if (popupContent?.onClose) {
        popupContent.onClose();
    }
    setPopupContent(null);
  };


  const renderActiveView = () => {
    switch (activeView) {
      case 'menu':
        return <Menu addToCart={addToCart} onSelectPizza={handleSelectPizza} />;
      case 'offers':
        return <Offers onClaimOffer={handleClaimOffer} setActiveView={setActiveView} cartItems={cart} />;
      case 'profile':
        return <Profile user={DEFAULT_USER} setUser={() => {}} setActiveView={setActiveView} />;
      case 'points':
        return <Points user={DEFAULT_USER} onRedeem={handleRedeemReward} />;
      case 'cart':
                return <Cart
                  cartItems={cart}
                  updateQuantity={updateQuantity}
                  setActiveView={setActiveView}
                  appliedOffer={appliedOffer}
                  removeOffer={handleRemoveOffer}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  deliveryCharge={deliveryCharge}
                />;
      case 'orderHistory':
        return <OrderHistory setActiveView={setActiveView} />;
      case 'checkout':
        return <Checkout user={DEFAULT_USER} total={total} deliveryCharge={deliveryCharge} pizzas={cart} setActiveView={setActiveView} onOrderSuccess={handleSuccessfulOrder} />;
      default:
        return <Menu addToCart={addToCart} onSelectPizza={handleSelectPizza} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-orange-50 text-stone-800">
      <Header />
      <main className="pb-24 pt-4 px-4 sm:px-6 lg:px-8">
        {renderActiveView()}
      </main>
      <Navbar activeView={activeView} setActiveView={setActiveView} cartItemCount={cartItemCount} />
      {selectedPizza && (
        <PizzaDetailModal 
            pizza={selectedPizza}
            onClose={handleCloseModal}
            addToCart={addToCart}
        />
      )}
      {popupContent && (
        <PopupModal
            isOpen={!!popupContent}
            onClose={handleClosePopup}
            title={popupContent.title}
            message={popupContent.message}
            type={popupContent.type}
        />
      )}
    </div>
  );
}
