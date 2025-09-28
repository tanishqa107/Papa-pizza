import React from 'react';
import type { OrderStatus } from '../../types';
import Icon from './Icon';

const STAGES = [
  { id: 'placed', label: 'Placed', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { id: 'preparing', label: 'Preparing', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A9.005 9.005 0 0112 3c-1.229 0-2.383.256-3.447.714M15.362 5.214A3.75 3.75 0 0012 5.25c-1.026 0-1.945.422-2.58 1.106C9.044 6.35 8.5 7.34 8.5 8.5c0 .124.008.246.023.366M15.362 5.214a3.75 3.75 0 01-2.58 1.106C12.043 6.635 12 7.07 12 7.5c0 .43.043.865.122 1.286M15.362 5.214a9.035 9.035 0 01-4.438 4.438m-3.447-4.438a9.035 9.035 0 00-4.438 4.438m12.323-4.438a3.75 3.75 0 00-2.58 1.106M9.42 12.865a3.75 3.75 0 01-2.58-1.106M14.25 12a2.25 2.25 0 00-2.25-2.25m-2.25 2.25a2.25 2.25 0 00-2.25 2.25M7.5 15a2.25 2.25 0 002.25 2.25m2.25-2.25a2.25 2.25 0 002.25 2.25m-2.25 2.25a2.25 2.25 0 002.25 2.25M12 18.75a.75.75 0 00.75-.75V15.75a.75.75 0 00-1.5 0v2.25c0 .414.336.75.75.75z" /> },
  { id: 'baking', label: 'Baking', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { id: 'delivery', label: 'Delivery', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5a3.375 3.375 0 00-3.375-3.375H3.375" /> },
  { id: 'delivered', label: 'Delivered', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.012-1.244h3.86M2.25 9h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.012-1.244h3.86m-19.5 0a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25m-19.5 0v.243a2.25 2.25 0 00.583 1.587l.491.552a2.25 2.25 0 001.594.588h12.164a2.25 2.25 0 001.594-.588l.491-.552a2.25 2.25 0 00.583-1.587V9m-19.5 0a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25" /> },
];

const OrderStatusTracker: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const currentStatusIndex = STAGES.findIndex(s => s.id === status);

  return (
    <div className="mt-4 pt-4">
      <div className="flex items-start">
        {STAGES.map((stage, index) => {
          const isCompleted = index < currentStatusIndex;
          const isCurrent = index === currentStatusIndex;
          const isFuture = index > currentStatusIndex;

          return (
            <React.Fragment key={stage.id}>
              <div className="flex flex-col items-center text-center w-1/5">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2
                    transition-all duration-500
                    ${isCompleted ? 'bg-green-500 text-white border-green-600' : ''}
                    ${isCurrent ? 'bg-red-700 text-white border-red-800 ring-4 ring-red-300 animate-pulse' : ''}
                    ${isFuture ? 'bg-gray-200 text-gray-500 border-gray-300' : ''}
                  `}
                >
                  <Icon size={isCurrent ? 7 : 6}>{stage.icon}</Icon>
                </div>
                <p
                  className={`
                    mt-2 text-xs sm:text-sm font-semibold
                    transition-colors duration-500
                    ${isCurrent ? 'text-red-700' : 'text-stone-700'}
                    ${isFuture ? 'text-gray-500' : ''}
                  `}
                >
                  {stage.label}
                </p>
              </div>
              {index < STAGES.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 rounded mt-6 mx-1
                    transition-all duration-500
                    ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                  `}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
