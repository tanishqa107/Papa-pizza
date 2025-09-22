import React, { useEffect } from 'react';
import { PIZZA_MENU, PIZZA_MANIA_MENU, SUPER_SAVING_COMBOS } from '../constants';
import { SIDES } from '../../sides';
import type { Pizza, CartItem } from '../../types';
import MenuItem from './MenuItem';
import NewMenuItem from './newMenuItem';
import axios from 'axios';

interface MenuProps {
  addToCart: (item: CartItem) => void;
  onSelectPizza: (pizza: Pizza) => void;
}

const Menu: React.FC<MenuProps> = ({ addToCart, onSelectPizza }) => {

  // In Menu.tsx useEffect
useEffect(() => {
  const hasSent = localStorage.getItem('user_sent');
  if (hasSent) return; // already sent

  const sendUserData = async () => {
    const name = localStorage.getItem('name');
    const number = localStorage.getItem('number');

    if (name && number) {
      try {
        await axios.post('https://papa-pizza-1afi.onrender.com/login', { name, number });
        console.log('User info sent to backend!');
        localStorage.setItem('user_sent', 'true'); // mark as sent
      } catch (err) {
        console.error('Failed to save user info:', err);
      }
    }
  };

  sendUserData();
}, []);


  return (

    <>
    <section>
      <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">Our Famous Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PIZZA_MENU.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} addToCart={(item) => addToCart(item)} />
        ))}
      </div>
    </section>

     <section>
      <h2 className="text-3xl font-bold pt-5 text-stone-900 mb-6 text-center">Pizza Mania 7" Treat</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PIZZA_MANIA_MENU.map((pizza) => (
          <NewMenuItem key={pizza.id} pizza={pizza} addToCart={(item) => addToCart(item)} />
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-bold pt-5 text-stone-900 mb-6 text-center">Super Saving Combos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUPER_SAVING_COMBOS.map((pizza) => (
          <NewMenuItem key={pizza.id} pizza={pizza} addToCart={(item) => addToCart({...item, size: undefined})} />
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl font-bold pt-5 text-stone-900 mb-6 text-center">Sides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SIDES.map((pizza) => (
          <NewMenuItem key={pizza.id} pizza={pizza} addToCart={(item) => addToCart({...item, size: undefined})} />
        ))}
      </div>
    </section>


    </>

  );
};

export default Menu;
