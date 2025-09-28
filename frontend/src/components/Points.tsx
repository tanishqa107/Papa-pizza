import React from 'react';
import type { User } from '../../types';
import Icon from './Icon';
import PizzaButton from './PizzaButton';

interface PointsProps {
  user: User;
  onRedeem: () => void;
}

const Points: React.FC<PointsProps> = ({ user, onRedeem }) => {
  const points = user.points;
  const REWARD_COST = 500;
  const progress = (points / REWARD_COST) * 100;

  const handleRedeem = () => {
    if (points >= REWARD_COST) {
      onRedeem();
    }
  };

  return (
    <section className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Loyalty Points</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <p className="text-lg text-gray-600">You have</p>
          <div className="my-4 flex items-center justify-center text-yellow-500">
            <Icon size={12} className="mr-2 drop-shadow-lg"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></Icon>
            <span className="text-6xl font-bold text-stone-800">{points}</span>
          </div>
          <p className="text-lg text-gray-600 mb-6">Papa Points!</p>
        </div>
        
        <div className="text-left mb-2">
            <p className="text-gray-600">{Math.max(0, REWARD_COST - points)} points until your next reward!</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress > 100 ? 100 : progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-right">{points} / {REWARD_COST}</p>
        
        <div className="mt-8 text-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-lg text-stone-800 mb-2">Redeem Your Reward!</h4>
            <p className="text-gray-600 mb-4">You can redeem {REWARD_COST} points for a FREE personal surprise treat.</p>
            <PizzaButton
                onClick={handleRedeem}
                disabled={points < REWARD_COST}
                className="w-full py-3"
            >
                Redeem Now
            </PizzaButton>
        </div>

        <div className="mt-8 text-left p-4 bg-orange-100 rounded-lg border border-orange-200">
            <h4 className="font-bold text-lg text-stone-800 mb-2">How it works:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Earn 1 point for every ₹2 spent.</li>
                <li>Redeem {REWARD_COST} points for a personal surprise treat!</li>
                <li>Look out for double point days!</li>
            </ul>
        </div>
      </div>
    </section>
  );
};

export default Points;
