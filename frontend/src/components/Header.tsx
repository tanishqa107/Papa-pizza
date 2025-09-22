import React from 'react';

const PapaLogo = () => (
    <div className="w-12 h-12 rounded-full border-2 border-orange-200 bg-orange-100 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-16 h-16" style={{ transform: 'translateY(-0.2rem)' }}>
            {/* Chef Hat */}
            <path d="M140,65 C155,40 130,25 100,25 C70,25 45,40 60,65 Z" fill="white" stroke="#4A2C2A" strokeWidth="4"/>
            <rect x="55" y="60" width="90" height="15" rx="5" fill="white" stroke="#4A2C2A" strokeWidth="4"/>
            {/* Head */}
            <circle cx="100" cy="110" r="45" fill="#FDDAC5"/>
            {/* Eyes (smiling) */}
            <path d="M80 100 C 85 105, 90 105, 95 100" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M105 100 C 110 105, 115 105, 120 100" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* Mustache covering mouth */}
            <path d="M70,120 C40,135 70,145 100,130 C130,145 160,135 130,120 C115,125 85,125 70,120 Z" fill="#593c3c"/>
            {/* Pizza */}
            <g transform="rotate(20, 130, 140) translate(5, 5)">
                <path d="M130,125 L165,160 L145,170 Z" fill="#FFC107" stroke="#E65100" strokeWidth="3" strokeLinejoin="round"/>
                {/* Pepperoni */}
                <circle cx="145" cy="145" r="5" fill="#D84315"/>
                <circle cx="152" cy="155" r="4" fill="#D84315"/>
            </g>
        </svg>
    </div>
);

const Header: React.FC = () => {
  return (
    <header className="bg-stone-800 text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <PapaLogo />
                <div>
                    <h1 className="text-2xl font-bold tracking-wider">Papa Pizza</h1>
                    <p className="text-sm text-orange-200">with all love from papa's kitchen</p>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;