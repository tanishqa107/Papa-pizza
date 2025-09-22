import React from 'react';
import { SPECIAL_offers } from '../constants';
import OfferCard from './OfferCard';
import type { Offer, View } from '../../types';

interface OffersProps {
  onClaimOffer: (offer: Offer) => void;
  setActiveView: (view: View) => void;
}

const Offers: React.FC<OffersProps> = ({ onClaimOffer, setActiveView }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Papa's Special Offers</h2>
      <div className="space-y-6">
        {SPECIAL_offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} onClaim={onClaimOffer} setActiveView={setActiveView} />
        ))}
      </div>
    </section>
  );
};

export default Offers;