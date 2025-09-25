import React, { useState } from 'react';
import Icon from './Icon';
import type { User, View } from '../../types';
import { INGREDIENT_AVATARS } from '../constants';
import AvatarSelectionModal from './AvatarSelectionModal';
import PizzaButton from './PizzaButton';

interface ProfileProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setActiveView: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, setUser, setActiveView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(user.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleSave = () => {
    // Address editing is now just for UI purposes since we're using a default user
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAddress(user.address);
    setIsEditing(false);
  };

  const handleAvatarSelect = (newAvatarId: string) => {
    // Avatar selection is now just for UI purposes since we're using a default user
    setIsModalOpen(false);
  };

  const AvatarComponent = INGREDIENT_AVATARS.find(avatar => avatar.id === user.avatar)?.component || null;

  return (
    <>
      <section className="max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-stone-900 mb-6 text-center">My Profile</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full border-4 border-red-200 bg-orange-100 p-1">
                {AvatarComponent}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-300">
                <PizzaButton
                    onClick={() => setIsModalOpen(true)}
                    variant="icon"
                    className="!bg-white/30 hover:!bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label="Change profile picture"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-800">{user.name}</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start text-gray-700">
              <Icon className="text-red-700 mr-3 mt-1 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></Icon>
              {isEditing ? (
                <input
                  type="text"
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Delivery Address"
                />
              ) : (
                <span>{user.address}</span>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex space-x-2 mt-4">
                <PizzaButton 
                  onClick={handleSave}
                  className="w-full py-3 !bg-green-600 hover:!bg-green-700"
                >
                  Save Address
                </PizzaButton>
                <PizzaButton
                  onClick={handleCancel}
                  className="w-full py-3 !bg-gray-500 hover:!bg-gray-600"
                >
                  Cancel
                </PizzaButton>
              </div>
            ) : (
               <PizzaButton variant="secondary" onClick={() => setIsEditing(true)} className="w-full mt-4">
                  Edit Address
               </PizzaButton>
            )}

            

            <PizzaButton
              variant="ghost"
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="w-full"
              aria-expanded={showContactInfo}
            >
              Contact Us
            </PizzaButton>

            {showContactInfo && (
              <div className="mt-2 p-4 bg-orange-50 border border-orange-200 rounded-lg text-left transition-all duration-300">
                <h4 className="font-bold text-lg text-stone-800 mb-3">Get in Touch</h4>
                <div className="space-y-3">
                  <a href="tel:9889162992" className="flex items-center text-gray-700 hover:text-red-700 group">
                    <Icon className="text-red-700 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </Icon>
                    <span className="font-medium">9889162992</span>
                  </a>
                  <a href="mailto:papa.pizza@gmail.com" className="flex items-center text-gray-700 hover:text-red-700 group">
                    <Icon className="text-red-700 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </Icon>
                    <span className="font-medium">papa.pizza@gmail.com</span>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
      <AvatarSelectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAvatarSelect}
      />
    </>
  );
};

export default Profile;