import React, { useState } from 'react';
import { SPECIAL_offers } from '../constants';
import OfferCard from './OfferCard';
import OfferMessageModal from './OfferMessageModal';
import type { Offer, View, CartItem } from '../../types';

interface OffersProps {
  onClaimOffer: (offer: Offer) => void;
  setActiveView: (view: View) => void;
  cartItems: CartItem[];
}

const Offers: React.FC<OffersProps> = ({ onClaimOffer, setActiveView, cartItems }) => {
  // Check if there are 2 large pizzas in the cart
  const hasTwoLargePizzas = cartItems.filter(item => item.size === 'large').length >= 2;

  // State for the offer message modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Helper function to calculate total order value
  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => {
      const price = item.pizza.sizes && item.size ? item.pizza.sizes[item.size] : (item.pizza.price ?? 0);
      return total + (price * item.quantity);
    }, 0);
  };

  // Helper function to check if it's Sunday in IST
  const isSundayInIST = () => {
    const now = new Date();
    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    return istDate.getDay() === 0; // Sunday is 0
  };

  // Helper function to check if it's Monday or Tuesday in IST
  const isMondayOrTuesdayInIST = () => {
    const now = new Date();
    const istDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const day = istDate.getDay(); // Monday is 1, Tuesday is 2
    return day === 1 || day === 2;
  };

  // Custom handler for offers
  const handleClaimOffer = (offer: Offer) => {
    if (offer.id === 2) {
      setModalMessage('First 20 orders completed, come back soon for new offers');
      setIsModalOpen(true);
    } else if (offer.id === 3) {
      const total = calculateTotal(cartItems);
      if (isSundayInIST() && total > 299) {
        onClaimOffer(offer);
      } else {
        setModalMessage('This offer is applicable only on Sundays and order above ₹299');
        setIsModalOpen(true);
      }
    } else if (offer.id === 4) {
      const total = calculateTotal(cartItems);
      if (isMondayOrTuesdayInIST() && total > 299) {
        onClaimOffer(offer);
      } else {
        setModalMessage('This offer is valid only on Mondays and Tuesday with a order total value of above ₹299');
        setIsModalOpen(true);
      }
    } else {
      onClaimOffer(offer);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Papa's Special Offers</h2>
        <div className="space-y-6">
          {SPECIAL_offers.map((offer) => {
            if (offer.id === 1) {
              // First offer: Pocket Pizza Free!
              if (hasTwoLargePizzas) {
                return (
                  <OfferCard key={offer.id} offer={offer} onClaim={onClaimOffer} setActiveView={setActiveView} />
                );
              } else {
                return (
                  <div key={offer.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-red-700">{offer.title}</h3>
                    <p className="text-gray-600 mt-2">{offer.description}</p>
                    <p className="text-yellow-600 font-semibold mt-4">Offer only applicable on 2 large pizzas</p>
                  </div>
                );
              }
            } else {
              return (
                <OfferCard key={offer.id} offer={offer} onClaim={handleClaimOffer} setActiveView={setActiveView} />
              );
            }
          })}
        </div>
      </section>
      <OfferMessageModal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </>
  );
};

export default Offers;