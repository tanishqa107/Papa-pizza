
import React, { useState, useMemo, useEffect } from 'react';
import type { View, Pizza, CartItem, User, Offer, Session, SupabaseUser } from '../types';
import { NAV_ITEMS, SURPRISE_TREAT_PIZZA } from './constants';
import { supabase } from '../supabaseClient';

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
import Login from './components/Login';
import Icon from './components/Icon';

type PopupContent = {
  title: string;
  message: string;
  type: 'success' | 'info';
  onClose?: () => void;
};


export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeView, setActiveView] = useState<View>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);

  useEffect(() => {
      const fetchSessionAndProfile = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session) {
          await fetchUserProfile(session.user);
        }
        setLoading(false);
      };

      fetchSessionAndProfile();

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event: string, session: Session | null) => {
          setSession(session);
          if (session) {
            await fetchUserProfile(session.user);
          } else {
            setUser(null); // Clear user profile on logout
            setCart([]); // Clear cart on logout
            setAppliedOffer(null);
            setActiveView('menu');
          }
        }
      );

      return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
      // In a real app, you would fetch from your 'profiles' table in Supabase.
      // e.g., const { data, error } = await supabase.from('profiles').select('*').eq('id', supabaseUser.id).single();
      // If a profile exists, setUser(data).
      
      // For this example, we'll create a default profile if one doesn't exist.
      // This mimics the behavior of creating a new user profile upon first login.
      const defaultProfile: User = {
          id: supabaseUser.id,
          name: supabaseUser.user_metadata.full_name || 'Pizza Lover',
          address: '123 Pizza Lane, Flavor Town', // Default address
          points: 0, // New users start with 0 points
          avatar: 'pepperoni' // Default avatar
      };
      setUser(defaultProfile);
  };


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
    if (!user) return;
    const REWARD_COST = 500;
    if (user.points >= REWARD_COST) {
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

        setUser(prevUser => ({
          ...prevUser!,
          points: prevUser!.points - REWARD_COST
        }));
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

  const { subtotal, discount, tax, total } = useMemo(() => {
    const sub = cart.reduce((sum, item) => {
      // Handle both Famous Menu pizzas (with sizes) and Pizza Mania pizzas (with price)
      const price = item.pizza.sizes && item.size ? item.pizza.sizes[item.size] ?? 0 : item.pizza.price ?? 0;
      return sum + price * item.quantity;
    }, 0);
    let disc = 0;
    // Apply a simple flat ₹400 discount for demonstration purposes if an offer is applied
    if (appliedOffer) {
      disc = 400.00;
      if (sub < disc) disc = sub; // Discount can't be more than the subtotal
    }
    const totalBeforeTax = sub - disc;
    const taxAmount = totalBeforeTax * 0.08;
    const finalTotal = totalBeforeTax + taxAmount;
    return {
      subtotal: sub,
      discount: disc,
      tax: taxAmount,
      total: finalTotal,
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
    if(!user) return;
    const orderTotal = total;
    setCart([]);
    setAppliedOffer(null);
    setUser(prevUser => ({
        ...prevUser!,
        points: prevUser!.points + Math.floor(orderTotal / 2)
    }));
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
    if (!user) {
        return (
          <div className="flex justify-center items-center h-screen">
              {/* FIX: Added children to Icon component to resolve missing property error. */}
              <Icon size={12} className="animate-spin text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.994 0h-4.992" />
              </Icon>
          </div>
        );
    }
    switch (activeView) {
      case 'menu':
        return <Menu addToCart={addToCart} onSelectPizza={handleSelectPizza} />;
      case 'offers':
        return <Offers onClaimOffer={handleClaimOffer} setActiveView={setActiveView} />;
      case 'profile':
        return <Profile user={user} setUser={setUser} setActiveView={setActiveView} />;
      case 'points':
        return <Points user={user} onRedeem={handleRedeemReward} />;
      case 'cart':
        return <Cart
                  cartItems={cart}
                  updateQuantity={updateQuantity}
                  setActiveView={setActiveView}
                  appliedOffer={appliedOffer}
                  removeOffer={handleRemoveOffer}
                  subtotal={subtotal}
                  discount={discount}
                  tax={tax}
                  total={total}
                />;
      case 'orderHistory':
        return <OrderHistory setActiveView={setActiveView} />;
      case 'checkout':
        return <Checkout user={user} total={total} setActiveView={setActiveView} onOrderSuccess={handleSuccessfulOrder} />;
      default:
        return <Menu addToCart={addToCart} onSelectPizza={handleSelectPizza} />;
    }
  };
  
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-orange-50">
          <h1 className="text-3xl font-bold text-stone-800">Loading Papa's Kitchen...</h1>
        </div>
    );
  }

  if (!session) {
    return <Login />;
  }

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
