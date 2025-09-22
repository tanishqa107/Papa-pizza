import React, { useState, useEffect } from 'react';
import type { Pizza, CartItem } from '../../types';
import Icon from './Icon';
import PizzaButton from './PizzaButton';

interface PizzaDetailModalProps {
  pizza: Pizza;
  onClose: () => void;
  addToCart: (item: CartItem) => void;
}

const PizzaDetailModal: React.FC<PizzaDetailModalProps> = ({ pizza, onClose, addToCart }) => {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart({ pizza, size: selectedSize, quantity: 1 });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pizza-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img className="w-full h-64 object-cover rounded-t-xl" src={pizza.imageUrl} alt={pizza.name} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <Icon size={6}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 id="pizza-title" className="text-3xl font-bold text-stone-800">{pizza.name}</h2>
            <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-md font-bold ml-4 flex-shrink-0">
              <Icon size={5} className="mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></Icon>
              <span>{pizza.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{pizza.description}</p>
          
          {pizza.ingredients && (
            <div className="mb-6">
              <h3 className="font-bold text-lg text-stone-700 mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map((ingredient, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-3xl font-bold text-red-700">
              ₹{pizza.sizes?.[selectedSize]?.toFixed(2) ?? 'N/A'}
            </span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as 'small' | 'medium' | 'large')}
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            >
              <option value="small">Small - ₹{pizza.sizes?.small.toFixed(2)}</option>
              <option value="medium">Medium - ₹{pizza.sizes?.medium?.toFixed(2) ?? 'N/A'}</option>
              <option value="large">Large - ₹{pizza.sizes?.large.toFixed(2)}</option>
            </select>
            <PizzaButton
              onClick={handleAddToCart}
              className={`w-48 h-12 justify-center text-lg ${
                  added ? '!bg-green-600' : ''
              }`}
            >
              {added ? 'Added!' : 'Add to Cart'}
            </PizzaButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetailModal;