import React from 'react';
import type { Pizza, Offer, User, View, Order, OrderStatus, AvatarOption } from '../types';
import image1 from "../assets/images/unnamed.png"
import image2 from "../assets/images/1.png"
import image3 from "../assets/images/onion.png"
import image4 from "../assets/images/corn.png"
import image5 from "../assets/images/cap.png"
import image6 from "../assets/images/pan.png"
import image7 from "../assets/images/veg.png"
import image8 from "../assets/images/jal.png"
import image9 from "../assets/images/tan.png"
import image10 from "../assets/images/hot.png"
import image11 from "../assets/images/veglo.png"
import image12 from "../assets/images/12.png"
import image13 from "../assets/images/13.png"
import image14 from "../assets/images/14.png"
import image15 from "../assets/images/15.png"
import image16 from "../assets/images/16.png"
import image17 from "../assets/images/17.png"
import image18 from "../assets/images/18.png"
import image19 from "../assets/images/19.png"
import image20 from "../assets/images/20.png"
import image21 from "../assets/images/21.png"
import image22 from "../assets/images/pm1.png"
import image23 from "../assets/images/pm2.png"
import image24 from "../assets/images/pm4.png"
import image25 from "../assets/images/pm3.png"
import image26 from "../assets/images/d1.png"
import image27 from "../assets/images/d2.png"
import image28 from "../assets/images/d3.png"
import image29 from "../assets/images/d4.png"
import image30 from "../assets/images/rp.png"
import image31 from "../assets/images/c1.png"
import image32 from "../assets/images/c2.png"
import image33 from "../assets/images/c3.png"
import image34 from "../assets/images/c4.png"
import image35 from "../assets/images/c5.png"
import image36 from "../assets/images/c6.png"
import image37 from "../assets/images/c7.png"
import image38 from "../assets/images/c8.png"
import image39 from "../assets/images/c9.png"
import image40 from "../assets/images/c10.png"
import image41 from "../assets/images/c11.png"
import image42 from "../assets/images/c12.png"
import image43 from "../assets/images/c13.png"
import image44 from "../assets/images/c14.png"
import image45 from "../assets/images/c15.png"
import image46 from "../assets/images/cc.png"
import image47 from "../assets/images/cc1.png"
import image48 from "../assets/images/cc2.png"
import image49 from "../assets/images/cc3.png"
import image50 from "../assets/images/s1.png"
import image51 from "../assets/images/s2.png"
import image52 from "../assets/images/s3.png"
import image53 from "../assets/images/s4.png"
import image54 from "../assets/images/s5.png"
import image55 from "../assets/images/s6.png"
import image56 from "../assets/images/s7.png"
import image57 from "../assets/images/s8.png"
import image58 from "../assets/images/s9.png"



export const PIZZA_MENU: Pizza[] = [
  {
    id: 1,
    name: 'Margherita Classic',
    description: 'Fresh mozzarella with a hint of olive oil.',
    sizes: { small: 99, medium: 189, large: 339 },
    imageUrl: image2,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Cheese Onion",
    description: 'Loaded with organic onion and extra mozzarella cheese.',
    sizes: { small: 99, medium: 189, large: 339 },
    imageUrl: image3,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Cheese and Corn',
    description: 'A lot of cheese, and fresh corns.',
    sizes: { small: 99, medium: 189, large: 339 },
    imageUrl: image4,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Cheese Capsicum',
    description: 'Grilled capsicum, Fresh Cheese and tangy sauce.',
    sizes: { small: 99, medium: 199, large: 349 },
    imageUrl: image5,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Cheese Paneer',
    description: 'A blend of mozzarella, Fresh Paneer, parmesan',
    sizes: { small: 139, medium: 239, large: 419 },
    imageUrl: image6,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Veggie Special',
    description: 'Spicy Onion, Cheesy Cheese, Organic Tomato, Fresh Capsicum, and red chili flakes for a fiery kick.',
    sizes: { small: 129, medium: 229, large: 359 },
    imageUrl: image7,
    rating: 4.6,
  },
  {
    id: 7,
    name: 'Country Side',
    description: 'Jalapeno, Cheesy Cheese, Black Olives, Fresh Capsicum, and red chili flakes for a fiery kick.',
    sizes: { small: 129, medium: 229, large: 359 },
    imageUrl: image8,
    rating: 4.6,
  },
  {
    id: 8,
    name: 'Italian Taste',
    description: 'Cheesy Corn, Black Olives, Fresh Onion, and red chili flakes for a fiery kick.',
    sizes: { small: 129, medium: 229, large: 359 },
    imageUrl:  image1,
    rating: 4.6,
  },
  {
    id: 9,
    name: 'Tandoori Twist',
    description: 'Cheesy Paneer, Fresh Veg, Red Pepper, Spicy Sauces, and red chili flakes for a fiery kick.',
    sizes: { small: 139, medium: 249, large: 369 },
    imageUrl:  image9,
    rating: 4.6,
  },
  {
    id: 10,
    name: 'Hot & Spicy',
    description: 'Cheesy Cheese, Fresh Veg, Red Bell Pepper, Yellow Bell Pepper and red chili flakes for a fiery kick.',
    sizes: { small: 159, medium: 299, large: 439 },
    imageUrl:  image10,
    rating: 4.6,
  },
  {
    id: 11,
    name: 'Veg Loaded',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Tomato, Corn, Capsicum, Mushroom, and red chili flakes for a fiery kick.',
    sizes: { small: 159, medium: 299, large: 439 },
    imageUrl:  image11,
    rating: 4.6,
  },
  {
    id: 12,
    name: 'Paneer Pepper Delight',
    description: 'Cheesy Cheese, Fresh Veg, Paneer, Capsicum, Red Pepper, and red chili flakes for a fiery kick.',
    sizes: { small: 179, medium: 329, large: 469 },
    imageUrl:  image12,
    rating: 4.6,
  },
  {
    id: 13,
    name: 'Green Mexicana',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Capsicum, Paneer, Jalapeno, and red chili flakes for a fiery kick.',
    sizes: { small: 179, medium: 329, large: 469 },
    imageUrl:  image13,
    rating: 4.6,
  },
  {
    id: 14,
    name: 'Extra Veg Loaded',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Panner, Corn, Capsicum, Mushroom, and red chili flakes for a fiery kick.',
    sizes: { small: 179, medium: 329, large: 469 },
    imageUrl:  image14,
    rating: 4.6,
  },
  {
    id: 15,
    name: 'Double Cheese Margherita',
    description: 'Cheesy Cheese, Pure 100% mozzarella',
    sizes: { small: 179, medium: 329, large: 469 },
    imageUrl:  image15,
    rating: 4.6,
  },
  {
    id: 16,
    name: 'Paneer Makhani Delight',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Red Pepper, Paneer Tikka, Makhani Sauce and red chili flakes for a fiery kick.',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image16,
    rating: 4.6,
  },
  {
    id: 17,
    name: 'Three-in-One',
    description: 'Cheesy Cheese, Fresh Veg, Paneer, Corn, Mushroom, and red chili flakes for a fiery kick.',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image17,
    rating: 4.6,

  },
  {
    id: 18,
    name: 'Tandoori Paneer Fiesta',
    description: 'Cheesy Cheese, Fresh Veg, Paneer, Onion, Capsicum, Red Pepper, Tandoori Sauce, prepared in Tandoori style for a fiery smokey taste.',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image18,
    rating: 4.6,

  },
  {
    id: 19,
    name: 'Spiciest Veggie',
    description: 'Cheesy Cheese, Fresh Veg, Red Bell Pepper, Yellow Bell Pepper, Jalapeno, Capsicum, Red Pepper, making it spcisest of them all',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image19,
    rating: 4.6,

  },
  {
    id: 20,
    name: 'Farmhouse Feast',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Tomato, Corn, Capsicum, Black Olives, Jalapeno',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image20,
    rating: 4.6,

  },
  {
    id: 21,
    name: 'Paneer Protien Delight',
    description: 'Cheesy Cheese, Fresh Veg, Onion, Paneer, Black Olive, Capsicum',
    sizes: { small: 219, medium: 409, large: 569 },
    imageUrl:  image21,
    rating: 4.6,

  },


];



export const PIZZA_MANIA_MENU: Pizza[] = [
  {
    id: 1,
    name: 'Single Topping Capsicum',
    description: 'Fresh Capsicum with a hint of olive oil.',
    price: 89,
    imageUrl: image22,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Single Topping Onion",
    description: 'Loaded with organic onion and cheese.',
     price: 89,
    imageUrl: image24,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Single Topping Corn',
    description: 'A bunch of cheese, and fresh corns.',
   price: 89,
    imageUrl: image23,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Single Topping Tomato',
    description: 'Grilled tomato, Fresh Cheese and tangy sauce.',
   price: 89,
    imageUrl: image25,
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Double Topping Paneer and Onion',
    description: 'A blend of mozzarella, Fresh Paneer, and Onion',
    price: 119,
    imageUrl: image26,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Double Topping Onion and Capsicum',
    description: 'Spicy Onion, Cheesy Cheese, Fresh Capsicum, and red chili flakes for a fiery kick.',
     price: 99,
    imageUrl: image27,
    rating: 4.6,
  },
  {
    id: 7,
    name: 'Double Topping Tomato and Corn',
    description: 'Cheesy Cheese, Fresh Tomato, Sprarking Corn and red chili flakes for a fiery kick.',
     price: 99,
    imageUrl: image28,
    rating: 4.6,
  },
  {
    id: 8,
    name: 'Double Topping Jalapeno and Onion',
    description: 'Fresh Onion, Cheesy Cheese, Tangy Jalapenos and red chili flakes for a fiery kick.',
     price: 119,
    imageUrl:  image29,
    rating: 4.6,
  },
  {
    id: 9,
    name: 'Special Red Heat Paneer',
    description: 'Cheesy Red Spicy Paneer, Spicy Sauces, and red chili flakes for a fiery kick.',
     price: 159,
    imageUrl:  image30,
    rating: 4.6,
  },

];

export const SUPER_SAVING_COMBOS: Pizza[] = [
   {
    id: 1,
    name: 'Zingy Pizza Super Saver Combo',
    description: 'Cheese Onion Pizza + Zingy Parcel + Coke',
    price: 160,
    imageUrl: image31,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Garlic Paneer Super Saver Combo",
    description: 'Panner Onion Pizza + Garlic Bread + Coke',
     price: 190,
    imageUrl: image32,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Pizza Pasta Super Saver Combo',
    description: 'Italian Pizza + Red Sauce Pasta + Coke',
    price: 240,
    imageUrl: image33,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Meal for Two Super Saver Combo",
    description: '2 Single Topping Pizza + Garlic Bread + Coke',
     price: 230,
    imageUrl: image34,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Meal for Three Super Saver Combo',
    description: '3 Single Topping Pizza + Garlic Bread + Coke',
    price: 400,
    imageUrl: image35,
    rating: 4.8,
  },
 {
    id: 6,
    name: "4 Single Topping Pizza Combo + Cold Drink",
    description: "Onion + Tomato + Capsicum + Corn + Cold Drink",
    price: 310,
    imageUrl: image36,
    rating: 4.8,
  },
  {
    id: 7,
    name: "4 Double Topping Pizza Combo + Cold Drink",
    description: "Paneer Onion + Tomato Corn + Jalapeno Onion + Onion Capsicum + Cold Drink",
    price: 370,
    imageUrl: image37,
    rating: 4.7,
  },
  {
    id: 8,
    name: "4 Special Pizza Combo + Cold Drink",
    description: "Cheese Paneer + Veg Loaded + Country Style + Cheese Corn + Cold Drink",
    price: 600,
    imageUrl: image38,
    rating: 4.9,
  },
  {
    id: 9,
    name: "3 Cheese Paneer Pizza Combo + Cold Drink",
    description: "Cheese Paneer + Surprise Pizza + Paneer Corn + Cold Drink",
    price: 440,
    imageUrl: image39,
    rating: 4.8,
  },
  {
    id: 10,
    name: "3 Special Paneer Pizza Combo + Cold Drink",
    description: "Tandoori Paneer + Makhani Paneer + Surprise Pizza + Cold Drink",
    price: 580,
    imageUrl: image40,
    rating: 4.9,
  },
  {
    id: 11,
    name: "2 Special Pizza Combo + Cold Drink",
    description: "2 Special Surprise Pizza + Cold Drink",
    price: 340,
    imageUrl: image41,
    rating: 4.8,
  },
  {
    id: 12,
    name: "3 Single Topping Pizza Combo",
    description: "3 Single Topping Pizza Combo + Cold Drink",
    price: 240,
    imageUrl: image42,
    rating: 4.7,
  },
  {
    id: 13,
    name: "3 Double Topping Pizza Combo",
    description: "3 Double Topping Pizza Combo + Cold Drink",
    price: 330,
    imageUrl: image43,
    rating: 4.8,
  },
  {
    id: 14,
    name: "2 Single Topping Pizza Combo",
    description: "2 Single Topping Pizza Combo + Cold Drink",
    price: 180,
    imageUrl: image44,
    rating: 4.7,
  },
  {
    id: 15,
    name: "2 Double Topping Pizza Combo",
    description: "2 Double Topping Pizza Combo + Cold Drink",
    price: 240,
    imageUrl: image45,
    rating: 4.7,
  },
  {
    id: 16,
    name: "Combo-A + Cold Drink",
    description: "Onion Capsicum Pizza / Tomato Corn Pizza + Cold Drink",
    price: 109,
    imageUrl: image46,
    rating: 4.7,
  },
  {
    id: 17,
    name: "Combo-B + Cold Drink",
    description: "Cheese Onion Pizza / Cheese Tomato Pizza + Cold Drink",
    price: 109,
    imageUrl: image46,
    rating: 4.8,
  },
  {
    id: 18,
    name: "Combo-C + Cold Drink",
    description: "Cheese Corn Pizza / Cheese Capsicum Pizza + Cold Drink",
    price: 109,
    imageUrl: image46,
    rating: 4.8,
  },
  {
    id: 19,
    name: "Combo-D + Cold Drink",
    description: "Corn Pizza + Capsicum Pizza + Cold Drink",
    price: 169,
    imageUrl: image47,
    rating: 4.7,
  },
  {
    id: 20,
    name: "Combo-E + Cold Drink",
    description: "Tomato Corn Pizza + Tomato Pizza + Cold Drink",
    price: 169,
    imageUrl: image48,
    rating: 4.8,
  },
  {
    id: 21,
    name: "Combo-F + Cold Drink",
    description: "Calzone Pocket + Onion Pizza + Cold Drink",
    price: 169,
    imageUrl: image49,
    rating: 4.8,
  },

]

export const SIDES: Pizza[] = [
  {
    id: 1,
    name: 'Garlic Bread',
    description: 'Crispy garlic bread with butter and herbs ( 8 sticks )',
    price: 90,
    imageUrl: image50,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Cheese Stuffed Garlic Bread",
    description: 'Garlic bread stuffed with extra cheese (6 Sticks)',
    price: 120,
    imageUrl: image51,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Calzone Pocket',
    description: 'Cheesy and Creamy stuffed pocket',
    price: 130,
    imageUrl: image52,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Zingy Parcel(2 pcs)",
    description: 'Spicy Zingy parcel with tangy sauce',
    price: 90,
    imageUrl: image53,
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Red Sauce Pasta',
    description: 'Cheesy and spicy red sauce pasta',
    price: 110,
    imageUrl: image54,
    rating: 4.6,
  },
  {
    id: 6,
    name: 'White Sauce Pasta',
    description: 'Cheesy and Creamy White Sauce Pasta',
    price: 120,
    imageUrl: image55,
    rating: 4.4,
  },
  {
    id: 7,
    name: 'Chocolava Cake',
    description: 'Chocolate molten lava cake',
    price: 90,
    imageUrl: image56,
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Coke Bottle',
    description: 'Chilled Coke Bottle',
    price: 20,
    imageUrl: image57,
    rating: 4.3,
  },
  {
    id: 9,
    name: 'Water Bottle',
    description: 'Mineral Drinking Water Bottle',
    price: 20,
    imageUrl: image58,
    rating: 4.7,
  },
  
]

export const SURPRISE_TREAT_PIZZA: Pizza = {
  id: 999,
  name: "Papa's Surprise Treat",
  description: "A special reward from Papa for your loyalty! Enjoy this free treat.",
  sizes: { small: 0, medium: 0, large: 0 },
  imageUrl: 'https://picsum.photos/seed/surprise/400/300',
  rating: 5.0,
  ingredients: ['Love', 'Joy', 'Surprise!']
};

export const SPECIAL_offers: Offer[] = [
  {
    id: 1,
    title: 'Pocket Pizza Free!',
    description: 'Get 1 pocket pizza free with the purchase of any 2 large pizza. A perfect little treat!',
    imageUrl: image49,
    action: 'claim',
  },
  {
    id: 2,
    title: 'Seal your Spot!',
    description: 'first 20 orders get 20% off on orders above ₹399. Hurry, limited time offer!',
    imageUrl: image37,
    action: 'claim',
  },
  {
    id: 3,
    title: 'Lets Celebrate Weekend!',
    description: 'Enjoy 1 surprise Drink on order above ₹299 on Sundays. Cheers to good times!',
    imageUrl: image31,
    action: 'claim',
  },
  {
    id: 4,
    title: 'Free Weekday Delivery',
    description: 'Why step out? Get your favorite pizza delivered for free on Monday and Tuesday for any order above ₹299.',
    imageUrl: image41,
    action: 'claim',
  }
];

export const INGREDIENT_AVATARS: AvatarOption[] = [
  { id: 'corn', label: 'Corn', component: <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#FDE047"/><circle cx="35" cy="35" r="5" fill="#FBBF24"/><circle cx="50" cy="28" r="5" fill="#FBBF24"/><circle cx="65" cy="35" r="5" fill="#FBBF24"/><circle cx="30" cy="50" r="5" fill="#FBBF24"/><circle cx="70" cy="50" r="5" fill="#FBBF24"/><circle cx="35" cy="65" r="5" fill="#FBBF24"/><circle cx="50" cy="72" r="5" fill="#FBBF24"/><circle cx="65" cy="65" r="5" fill="#FBBF24"/><circle cx="42" cy="50" r="5" fill="#FBBF24"/><circle cx="58" cy="50" r="5" fill="#FBBF24"/><circle cx="50" cy="42" r="5" fill="#FBBF24"/><circle cx="50" cy="58" r="5" fill="#FBBF24"/></svg> },
  { id: 'cheese', label: 'Cheese', component: <svg viewBox="0 0 100 100"><path d="M10 70 L50 90 L90 70 L90 30 A 40 40 0 0 0 50 10 A 40 40 0 0 0 10 30 Z" fill="#FBBF24"/><circle cx="30" cy="50" r="8" fill="#FDE047"/><circle cx="65" cy="40" r="10" fill="#FDE047"/><circle cx="55" cy="65" r="6" fill="#FDE047"/></svg> },
  { id: 'onions', label: 'Onions', component: <svg viewBox="0 0 100 100"><circle cx="50" cy="60" r="30" fill="#A855F7"/><path d="M50 30 C 60 20, 40 20, 50 30 M50 30 C 55 20, 45 20, 50 30 Z" fill="#D8B4FE"/><circle cx="50" cy="60" r="20" stroke="#D8B4FE" strokeWidth="5" fill="none"/><circle cx="50" cy="60" r="10" stroke="#D8B4FE" strokeWidth="5" fill="none"/></svg> },
  { id: 'pepperoni', label: 'Pepperoni', component: <svg viewBox="0 0 100 100"><circle cx="35" cy="35" r="20" fill="#EF4444"/><circle cx="65" cy="65" r="25" fill="#EF4444"/><circle cx="70" cy="30" r="12" fill="#EF4444"/></svg> },
  { id: 'veggie_basket', label: 'Veggie Basket', component: <svg viewBox="0 0 100 100"><path d="M20 80 Q 50 95, 80 80 L 70 50 Q 50 60, 30 50 Z" fill="#A16207"/><rect x="18" y="78" width="64" height="5" fill="#854D0E"/><path d="M40 50 C 30 30, 50 30, 45 20" stroke="#22C55E" strokeWidth="6" strokeLinecap="round"/><path d="M60 50 L 70 25" stroke="#F97316" strokeWidth="6" strokeLinecap="round"/><circle cx="55" cy="40" r="10" fill="#EF4444"/></svg> },
  { id: 'chicken', label: 'Chicken', component: <svg viewBox="0 0 100 100"><g transform="rotate(45 50 50)"><path d="M50 20 A 20 20 0 1 1 50 60 A 30 30 0 0 1 80 80 L 70 90 L 20 40 Z" fill="#D97706"/><circle cx="35" cy="35" r="5" fill="#FBBF24"/></g></svg> },
  { id: 'bell_peppers', label: 'Bell Peppers', component: <svg viewBox="0 0 100 100"><path d="M30 40 C 10 50, 10 80, 30 90 L 40 90 C 50 80, 50 50, 40 40 Z" fill="#EF4444"/><path d="M70 40 C 90 50, 90 80, 70 90 L 60 90 C 50 80, 50 50, 60 40 Z" fill="#FBBF24"/><path d="M50 20 C 40 30, 60 30, 50 20" stroke="#22C55E" strokeWidth="6" strokeLinecap="round"/></svg> },
  { id: 'mushrooms', label: 'Mushrooms', component: <svg viewBox="0 0 100 100"><path d="M20 60 C 20 40, 80 40, 80 60 L 80 70 L 20 70 Z" fill="#D1D5DB"/><rect x="40" y="70" width="20" height="20" rx="5" fill="#E5E7EB"/></svg> },
  { id: 'olives', label: 'Olives', component: <svg viewBox="0 0 100 100"><circle cx="30" cy="30" r="15" fill="#1C1917"/><circle cx="65" cy="65" r="20" fill="#1C1917"/><circle cx="50" cy="50" r="10" stroke="#1C1917" strokeWidth="8" fill="none"/></svg> },
  { id: 'tomatoes', label: 'Tomatoes', component: <svg viewBox="0 0 100 100"><circle cx="40" cy="60" r="30" fill="#DC2626"/><circle cx="70" cy="50" r="25" fill="#EF4444"/><path d="M40 30 C 50 20, 30 20, 40 30" stroke="#16A34A" strokeWidth="5" strokeLinecap="round"/></svg> },
];

export const ORDER_HISTORY: Order[] = [
  {
    id: 'ORD-12345',
    date: '2024-07-15',
    items: [
      { pizzaName: "Papa's Pepperoni", quantity: 1, price: 1200 },
      { pizzaName: 'Veggie Garden', quantity: 1, price: 1120 },
    ],
    total: 2503
  },
  {
    id: 'ORD-12321',
    date: '2024-06-28',
    items: [
      { pizzaName: 'Margherita Classic', quantity: 2, price: 1040 },
    ],
    total: 2244
  },
  {
    id: 'ORD-12298',
    date: '2024-06-10',
    items: [
      { pizzaName: 'BBQ Chicken', quantity: 1, price: 1280 },
      { pizzaName: 'Four Cheese', quantity: 1, price: 1160 },
      { pizzaName: 'Spicy Diablo', quantity: 1, price: 1320 },
    ],
    total: 4058
  }
];

export const MOCK_ORDER_STATUSES: { [key: string]: OrderStatus } = {
  'ORD-12345': 'preparing',
  'ORD-12321': 'delivery',
  'ORD-12298': 'delivered',
};

interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
}

export const DELIVERY_CHARGE = 10;

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'menu',
    label: 'Menu',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    )
  },
  {
    id: 'offers',
    label: 'Offers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    )
  },
  {
    id: 'cart',
    label: 'Cart',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.75H5.168a2.25 2.25 0 00-2.122 2.122L3 7.5M11.25 14.25a3 3 0 00-3 3h6.75a3 3 0 00-3-3z" />
      </svg>
    )
  },

  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  }
];
