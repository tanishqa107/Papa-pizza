import React from 'react';

interface OfferMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const OfferMessageModal: React.FC<OfferMessageModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-red-700 mb-4">Offer Update</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferMessageModal;
