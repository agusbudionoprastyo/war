import React, { useState } from "react";
import CustModal from "./custModal"; // Import your customer details modal
import { product } from "../libs/product"; // Import product data

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
      <div className="flex items-center flex-col sm:flex-col">
      <button
        className="rounded-2xl bg-background text-white py-2 px-4 hover:bg-black-800 transition duration-300"
        onClick={() => setcustModalOpen(true)}
      >
        GET VOUCHER
      </button>

      </div>
      {/* Modal for Customer Details */}
      <CustModal isOpen={iscustModalOpen} onClose={() => setcustModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Fullname"
            value={customerDetails.name}
            onChange={handleInputChange}
            className="border-2 border-dashed border-gray-400 rounded-xl p-2 mb-3 w-full"
            required
          />
          <input
            type="text"
            name="ig"
            placeholder="Instagram Account"
            value={customerDetails.ig}
            onChange={handleInputChange}
            className="border-2 border-dashed border-gray-400 rounded-xl p-2 mb-3 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customerDetails.email}
            onChange={handleInputChange}
            className="border-2 border-dashed border-gray-400 rounded-xl p-2 mb-3 w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={customerDetails.phone}
            onChange={handleInputChange}
            className="border-2 border-dashed border-gray-400 rounded-xl p-2 mb-3 w-full"
            required
          />
          <button
            type="submit"
            style={{ backgroundColor: '#001F3F', color: '#ffffff' }}
            className="rounded-xl p-2 font-bold hover:bg-opacity-80 w-full h-12 transition"
          >
            Go To Payment
          </button>
        </form>
      </CustModal>
    </>
  );
};

export default Checkout;