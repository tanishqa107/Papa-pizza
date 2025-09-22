import type { ReactElement } from 'react';

export interface Pizza {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  price?: number; // for Mania pizzas
  sizes?: { small: number; medium: number; large: number }; // for regular pizzas
  ingredients?: string[];
}


export interface Offer {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  action?: 'claim' | 'navigate';
  targetView?: View;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  size?: 'small' | 'medium' | 'large'; // only for regular pizzas
  price?: number; // only for mania pizzas
}


export interface User {
  id: string; // From Supabase user
  name:string;
  address: string;
  points: number;
  avatar: string;
}

export interface OrderItem {
    pizzaName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
}

export type View = 'menu' | 'offers' | 'cart' | 'profile' | 'points' | 'orderHistory' | 'checkout';

export type OrderStatus = 'placed' | 'preparing' | 'baking' | 'delivery' | 'delivered';

export interface AvatarOption {
  id: string;
  label: string;
  component: ReactElement;
}

// Simplified types to represent Supabase auth objects when using CDN
export interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    [key: string]: any;
  }
}

export interface Session {
  user: SupabaseUser;
  access_token: string;
}