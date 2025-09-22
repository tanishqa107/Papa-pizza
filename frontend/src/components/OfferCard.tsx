import React from 'react';
import type { Offer, View } from '../../types';
import PizzaButton from './PizzaButton';

interface OfferCardProps {
  offer: Offer;
  onClaim: (offer: Offer) => void;
  setActiveView: (view: View) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onClaim, setActiveView }) => {
  const isNavigateAction = offer.action === 'navigate' && offer.targetView;

  const handleClick = () => {
    if (isNavigateAction) {
      setActiveView(offer.targetView!);
    } else {
      onClaim(offer);
    }
  };
  
  const buttonText = isNavigateAction ? 'Check Points' : 'Claim Offer';
  const buttonColor = isNavigateAction ? '!bg-yellow-500 hover:!bg-yellow-600' : '!bg-green-600 hover:!bg-green-700';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300">
      <img className="w-full h-48 object-cover md:w-1/3" src={offer.imageUrl} alt={offer.title} />
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        <div>
          <h3 className="text-2xl font-bold text-red-700">{offer.title}</h3>
          <p className="text-gray-600 mt-2">{offer.description}</p>
        </div>
        <PizzaButton
          onClick={handleClick}
          className={`${buttonColor} mt-4 self-start`}
        >
          {buttonText}
        </PizzaButton>
      </div>
    </div>
  );
};

export default OfferCard;