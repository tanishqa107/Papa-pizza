import React, { useEffect } from 'react';
import PizzaButton from './PizzaButton';
import Icon from './Icon';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'info';
}

const PopupModal: React.FC<PopupModalProps> = ({ isOpen, onClose, title, message, type = 'info' }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const icon = {
    success: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  };

  const iconColor = {
    success: 'text-green-500',
    info: 'text-blue-500',
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm text-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
            <Icon size={10} className={iconColor[type]}>{icon[type]}</Icon>
        </div>
        <h2 id="popup-title" className="text-2xl font-bold text-stone-800 mt-4">{title}</h2>
        <p className="text-gray-600 my-4">{message}</p>
        <PizzaButton
          onClick={onClose}
          className="w-full justify-center"
        >
          OK
        </PizzaButton>
      </div>
    </div>
  );
};

export default PopupModal;