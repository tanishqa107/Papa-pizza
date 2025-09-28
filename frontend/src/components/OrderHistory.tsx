import React, { useState, useEffect, useRef } from 'react';
import type { View, OrderStatus } from '../../types';
import { ORDER_HISTORY, MOCK_ORDER_STATUSES } from '../constants';
import Icon from './Icon';
import PizzaButton from './PizzaButton';
import OrderStatusTracker from './OrderStatusTracker';

const ALL_STAGES: OrderStatus[] = ['placed', 'preparing', 'baking', 'delivery', 'delivered'];

interface OrderHistoryProps {
  setActiveView: (view: View) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ setActiveView }) => {
  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [orderStatuses, setOrderStatuses] = useState<{ [key: string]: OrderStatus }>(MOCK_ORDER_STATUSES);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing interval when the component unmounts or activeTrackingId changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (activeTrackingId) {
      const currentStatus = orderStatuses[activeTrackingId];
      if (currentStatus !== 'delivered') {
        // Start a new interval to simulate progress
        intervalRef.current = window.setInterval(() => {
          setOrderStatuses(prevStatuses => {
            const currentStatusIndex = ALL_STAGES.indexOf(prevStatuses[activeTrackingId]);
            // If it's not the last stage, move to the next one
            if (currentStatusIndex < ALL_STAGES.length - 1) {
              const nextStatus = ALL_STAGES[currentStatusIndex + 1];
              return { ...prevStatuses, [activeTrackingId]: nextStatus };
            } else {
              // It's delivered, clear the interval
              if (intervalRef.current) clearInterval(intervalRef.current);
              return prevStatuses;
            }
          });
        }, 3000); // Progress every 3 seconds
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTrackingId, orderStatuses]);


  const handleTrackClick = (orderId: string) => {
    setActiveTrackingId(prevId => (prevId === orderId ? null : orderId));
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => setActiveView('profile')}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-4"
          aria-label="Back to profile"
        >
          <Icon size={7}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></Icon>
        </button>
        <h2 className="text-3xl font-bold text-stone-900">Order History</h2>
      </div>

      {ORDER_HISTORY.length === 0 ? (
        <div className="text-center py-20">
            <p className="text-gray-500">You have no past orders.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {ORDER_HISTORY.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <p className="font-bold text-lg text-stone-800">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-xl text-red-700">₹{order.total.toFixed(2)}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-gray-700">
                    <span>{item.quantity} x {item.pizzaName}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <PizzaButton
                  variant="secondary"
                  onClick={() => handleTrackClick(order.id)}
                  className="w-full"
                  aria-expanded={activeTrackingId === order.id}
                  aria-controls={`tracking-info-${order.id}`}
                >
                  {activeTrackingId === order.id ? 'Hide Status' : 'Track Order'}
                </PizzaButton>
                {activeTrackingId === order.id && (
                  <div id={`tracking-info-${order.id}`} className="transition-all duration-500 ease-in-out">
                    <OrderStatusTracker status={orderStatuses[order.id]} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;