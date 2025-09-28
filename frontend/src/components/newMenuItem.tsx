import React, { useState } from 'react';
import type { Pizza, CartItem } from '../../types';
import Icon from './Icon';
import PizzaButton from './PizzaButton';

interface NewMenuItemProps {
  pizza: Pizza;

  addToCart: (item: CartItem) => void;

}

const NewMenuItem: React.FC<NewMenuItemProps> = ({ pizza, addToCart}) => {
    const [added, setAdded] = useState(false);
    const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        addToCart({ pizza, size: selectedSize, quantity: 1 });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div  className="cursor-pointer">
        <img className="w-full h-48 object-cover" src={pizza.imageUrl} alt={pizza.name} />
        <div className="p-4">
          <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-stone-800">{pizza.name}</h3>
              <div className="flex items-center bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold flex-shrink-0 ml-2">
                  <Icon size={4} className="mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></Icon>
                  <span>{pizza.rating}</span>
              </div>
          </div>
          <p className="text-gray-600 mt-2">{pizza.description}</p>

          
        </div>
      </div>
      <div className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-lg font-semibold text-green-700 mt-2">
              ₹{pizza.price}
            </p>
          </div>
          <PizzaButton
            onClick={handleAddToCart}
            className={`w-44 justify-center ${added ? '!bg-green-600' : ''}`}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </PizzaButton>
        </div>
      </div>
    </div>
  );
};

export default NewMenuItem;