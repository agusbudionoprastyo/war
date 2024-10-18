import React, { useState } from "react";
import CustModal from "./custModal"; // Import your customer details modal
import { product } from "../libs/product"; // Import product data
import Image from "next/image";

const Checkout = () => {
  const [iscustModalOpen, setcustModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    ig: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      customer: customerDetails,
    };

    try {
      const response = await fetch("/api/tokenizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const requestData = await response.json();
      console.log({ requestData });
      window.snap.pay(requestData.token); // Integrate with payment service
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setcustModalOpen(false);
    }
  };

  return (
    <>
  <div 
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Image 
        className="object-cover w-56 max-w-xs cursor-pointer zoom-animation" 
        src="/vchbtn.png" 
        alt="Floating Price" 
        width={200} 
        height={200} 
        priority 
        onClick={() => setcustModalOpen(true)} 
      />
  </div>

  {/* Modal for Customer Details */}
  <CustModal isOpen={iscustModalOpen} onClose={() => setcustModalOpen(false)}>
    <form onSubmit={handleSubmit}>
    <div className="flex justify-between items-center mb-3">
        <label htmlFor="name" className="mr-2">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="*"
          value={customerDetails.name}
          onChange={handleInputChange}
          className="border-2 border-gray-400 rounded-lg w-3/4 p-2"
          required
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <label htmlFor="ig" className="mr-2">IG</label>
        <input
          type="text"
          name="ig"
          id="ig"
          placeholder="@_"
          value={customerDetails.ig}
          onChange={handleInputChange}
          className="border-2 border-gray-400 rounded-lg w-3/4 p-2"
          required
        />
      </div>

      <div className="flex justify-between items-center mb-3">
        <label htmlFor="email" className="mr-2">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Optional"
          value={customerDetails.email}
          onChange={handleInputChange}
          className="border-2 border-gray-400 rounded-lg w-3/4 p-2"
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <label htmlFor="phone" className="mr-2">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="62_"
          value={customerDetails.phone}
          onChange={handleInputChange}
          className="border-2 border-gray-400 rounded-lg w-3/4 p-2"
          required
        />
      </div>


            <p style={{ fontSize: '0.8em', textAlign: 'left', padding: '10px 0' }}>
              Melalui event ini kami mengajak Anda untuk berpartisipasi dalam program donasi kami, yg akan kami salurkan ke panti asuhan di kota Semarang. Kontribusi Anda akan sangat berarti.
            </p>

          <div className="flex justify-between items-center mb-3">
            {/* <label htmlFor="donasi" className="mr-2">Donasi</label> */}
            <input
              type="number"
              name="donasi"
              placeholder="Donasi Rp.* "
              value={customerDetails.donasi}
              onChange={handleInputChange}
              className="border-2 border-gray-400 rounded-lg p-2 w-3/4 mr-2"
              min="0" // Membatasi input minimal ke 0
            />
          <button
              type="submit"
              style={{ backgroundColor: '#001F3F', color: '#ffffff' }}
              className="border-2 border-gray-400 rounded-lg p-2 font-bold hover:bg-opacity-80 transition"
            >
            Payment
          </button>
          </div>

          </form>
        </CustModal>
      </>
    );
  };

export default Checkout;