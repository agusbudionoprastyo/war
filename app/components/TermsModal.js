import React from 'react';
import Particle from './particle';
const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    
    <div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50" 
      // onClick={onClose}
    >
      <Particle />
      <div 
        className="bg-white rounded-2xl shadow-lg p-6 w-80 z-10" 
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Terms & Condition</h2>
        <div className="font-sans text-black max-h-80 overflow-y-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
          
          <div className="mb-4">
          <p className="text-sm font-bold">WAR ROOM VOUCHER</p>
            <p className="text-sm">Will be available on 3 - 17 November 2024 only at 14:00, for 1 minute 4 second</p>
            <p className="text-sm font-bold">One winner will be selected daily from eligible participants during the event period.</p>
          </div>

          <div className="mb-4">
            <h2 className="font-bold">1. Voucher Validity</h2>
            <p className="ml-4 text-sm">This voucher is valid only at <strong>Hotel Dafam Semarang</strong>, Jl. Imam Bonjol No. 188.</p>
            <p className="ml-4 text-sm">The voucher is valid for stays from November 18 to November 30, 2024, and it cannot be exchanged for cash.</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold">2. Voucher Usage</h2>
            <p className="ml-4 text-sm">The voucher can only be used once and cannot be combined with other promotions or discounts.</p>
            <p className="ml-4 text-sm">To use the voucher, the guest must make a reservation in advance and provide the voucher number.</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold">3. Room Availability</h2>
            <p className="ml-4 text-sm">Room availability depends on the hotel's occupancy rate. Guests are encouraged to make reservations early.</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold">4. Cancellation</h2>
            <p className="ml-4 text-sm">Cancellations for reservations made with the voucher must be done at least <strong>1 day</strong> before the check-in date. Otherwise, the voucher will be considered void.</p>
          </div>
          <div className="mb-4">
            <h2 className="font-bold">5. Additional Provisions</h2>
            <p className="ml-4 text-sm">All guests are required to comply with hotel regulations and applicable norms during their stay.</p>
            <p className="ml-4 text-sm"><strong>Hotel Dafam Semarang</strong> reserves the right to change these terms and conditions without prior notice.</p>
          </div>

          <p className="ml-4 text-sm">For more information, please contact</p>
          <p className="ml-4 text-sm">
            <a href="tel:0243554111">
              <strong>(024) 3554111,</strong>
            </a>
            <a href="https://wa.me/6289524580971">
              <strong> 6289524580971</strong>
            </a>
          </p>
        
        </div>
        <div className="flex justify-end mt-4">
          <button className="text-lg font-medium transition hover:scale-105 ml-5" style={{ color: '#f8105a' }} onClick={onClose}>Agree</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
