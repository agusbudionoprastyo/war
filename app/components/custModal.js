import React from 'react';

const custModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

    return (
        <div 
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" 
        onClick={onClose}>
        <div 
        className="bg-white rounded-2xl shadow-lg p-6 w-80 z-60" 
        onClick={(e) => e.stopPropagation()}
        >
    {children}
    </div>
    </div>
  );
};

export default custModal;