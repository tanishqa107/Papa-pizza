import React, { useEffect } from 'react';
import { INGREDIENT_AVATARS } from '../constants';
import Icon from './Icon';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatarId: string) => void;
}

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ isOpen, onClose, onSelect }) => {
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-select-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="avatar-select-title" className="text-xl font-bold text-stone-800">Choose your Ingredient</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <Icon size={6}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-5 gap-4">
            {INGREDIENT_AVATARS.map((avatar) => (
              <div key={avatar.id} className="flex flex-col items-center">
                <button
                  onClick={() => onSelect(avatar.id)}
                  className="w-20 h-20 p-2 rounded-full bg-orange-100 border-2 border-transparent hover:border-red-500 hover:bg-orange-200 focus:border-red-500 focus:outline-none transition-all duration-200 transform hover:scale-105"
                  aria-label={`Select ${avatar.label} avatar`}
                >
                  {avatar.component}
                </button>
                <p className="text-sm mt-2 font-medium text-stone-700">{avatar.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectionModal;
