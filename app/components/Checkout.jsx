// import React, { useState, useEffect } from "react";
// import CustModal from "./custModal"; // Modal untuk detail pelanggan
// import { product } from "../libs/product"; // Mengimpor data produk
// import Image from "next/image";

// const Checkout = () => {
//   const [countdown, setCountdown] = useState(64); // 1 minute and 4 seconds in total

//   const [iscustModalOpen, setcustModalOpen] = useState(false);
//   const [customerDetails, setCustomerDetails] = useState({
//     name: '',
//     ig: '',
//     email: '',
//     phone: '',
//     donasi: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Mengambil donasi dan memvalidasi
//     const donasiAmount = customerDetails.donasi ? parseFloat(customerDetails.donasi) : 0;

//     // Membangun item_details
//     const itemDetails = [
//       {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: 1,
//       },
//     ];

//     // Jika donasi valid, tambahkan sebagai item kedua
//     if (donasiAmount > 0) {
//       itemDetails.push({
//         id: 'donasi', // ID unik untuk donasi
//         name: 'Donasi',
//         price: donasiAmount,
//         quantity: 1, // Quantity untuk donasi
//       });
//     }

//     const data = {
//       id: product.id,
//       productName: product.name,
//       price: product.price,
//       quantity: 1,
//       customer: {
//         ...customerDetails,
//         donasi: donasiAmount, // Sertakan donasi dalam data pelanggan
//       },
//       itemDetails, // Sertakan itemDetails dalam data
//     };

//     try {
//       const response = await fetch("/api/tokenizer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const requestData = await response.json();
//       console.log({ requestData });
//       window.snap.pay(requestData.token); // Integrasikan dengan layanan pembayaran
//       setcustModalOpen(false); // Tutup modal setelah berhasil
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalId);
//           return 0; // Countdown ends at 0
//         }
//         return prev - 1;
//       });
//     }, 1000); // Update countdown every second

//     return () => clearInterval(intervalId);
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   return (
//     <>
//       <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
//       <div className="flex flex-col items-center">
//         <div className="font-[family-name:var(--font-FFDinPro-Black)] text-white text-4xl mb-2">
//           {formatTime(countdown)}
//         </div>
//         <Image 
//           className="object-cover w-56 max-w-xs cursor-pointer zoom-animation" 
//           src="/vchbtn.png" 
//           alt="Floating Price" 
//           width={200} 
//           height={200} 
//           priority 
//           onClick={() => setcustModalOpen(true)} 
//         />
//       </div>
//       </div>

//       <CustModal isOpen={iscustModalOpen} onClose={() => setcustModalOpen(false)}>
//         <form onSubmit={handleSubmit}>
//           {/* Input Form */}
//           <div className="flex justify-between items-center mb-3">
//             <label htmlFor="name" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               placeholder="*"
//               value={customerDetails.name}
//               onChange={handleInputChange}
//               className="border border-gray-400 rounded-lg w-3/4 p-2"
//               required
//             />
//           </div>

//           <div className="flex justify-between items-center mb-3">
//             <label htmlFor="ig" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">IG</label>
//             <input
//               type="text"
//               name="ig"
//               id="ig"
//               placeholder="@_"
//               value={customerDetails.ig}
//               onChange={handleInputChange}
//               className="border border-gray-400 rounded-lg w-3/4 p-2"
//               required
//             />
//           </div>

//           <div className="flex justify-between items-center mb-3">
//             <label htmlFor="email" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Optional"
//               value={customerDetails.email}
//               onChange={handleInputChange}
//               className="border border-gray-400 rounded-lg w-3/4 p-2"
//             />
//           </div>

//           <div className="flex justify-between items-center mb-8">
//             <label htmlFor="phone" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               id="phone"
//               placeholder="62_"
//               value={customerDetails.phone}
//               onChange={handleInputChange}
//               className="border border-gray-400 rounded-lg w-3/4 p-2"
//               required
//             />
//           </div>


//           <p style={{ fontSize: '0.8em', textAlign: 'left', padding: '10px 0' }}>
//             Melalui event ini kami mengajak Anda untuk berpartisipasi dalam program donasi kami, yg akan kami salurkan ke panti asuhan di kota Semarang. Kontribusi Anda akan sangat berarti.
//           </p>

//           <div className="flex justify-between items-center">
//           <input
//               type="number"
//               name="donasi"
//               placeholder="Donasi Rp.*"
//               value={customerDetails.donasi}
//               onChange={handleInputChange}
//               className="border border-gray-400 rounded-lg p-2 w-1/2 mr-2"
//               min="0"
//             />
//           <button
//             type="submit"
//             // style={{ font: 'arial', backgroundColor: '#001F3F', color: '#ffffff' }}
//             className="border rounded-lg p-2 w-1/2 bg-artoteldark text-foreground hover:bg-opacity-80 transition font-[family-name:var(--font-FFDinPro-Black)]"
//           >
//             Payment
//           </button>
//           </div>
//         </form>
//       </CustModal>
//     </>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import CustModal from "./custModal"; // Modal untuk detail pelanggan
import { product } from "../libs/product"; // Mengimpor data produk
import Image from "next/image";

const Checkout = () => {
  // Hitung berapa detik sampai 14:01:04 dari waktu saat ini
  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(14, 1, 4); // Set target ke 14:01:04

  let initialCountdown = Math.max(0, Math.floor((targetTime - now) / 1000)); // Menghitung detik hingga target

  const [countdown, setCountdown] = useState(initialCountdown);
  const [iscustModalOpen, setcustModalOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    ig: '',
    email: '',
    phone: '',
    donasi: '',
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
    const donasiAmount = customerDetails.donasi ? parseFloat(customerDetails.donasi) : 0;

    const itemDetails = [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ];

    if (donasiAmount > 0) {
      itemDetails.push({
        id: 'donasi',
        name: 'Donasi',
        price: donasiAmount,
        quantity: 1,
      });
    }

    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      customer: {
        ...customerDetails,
        donasi: donasiAmount,
      },
      itemDetails,
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
      window.snap.pay(requestData.token);
      setcustModalOpen(false);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0; // Countdown ends at 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <div className="font-[family-name:var(--font-FFDinPro-Black)] text-white text-4xl mb-2">
            {formatTime(countdown)}
          </div>
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
      </div>

      <CustModal isOpen={iscustModalOpen} onClose={() => setcustModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          {/* Input Form */}
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="name" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="*"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg w-3/4 p-2"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-3">
            <label htmlFor="ig" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">IG</label>
            <input
              type="text"
              name="ig"
              id="ig"
              placeholder="@_"
              value={customerDetails.ig}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg w-3/4 p-2"
              required
            />
          </div>

          <div className="flex justify-between items-center mb-3">
            <label htmlFor="email" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Optional"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg w-3/4 p-2"
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <label htmlFor="phone" className="font-[family-name:var(--font-FFDinPro-Black)] mr-2">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="62_"
              value={customerDetails.phone}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg w-3/4 p-2"
              required
            />
          </div>

          <p style={{ fontSize: '0.8em', textAlign: 'left', padding: '10px 0' }}>
            Melalui event ini kami mengajak Anda untuk berpartisipasi dalam program donasi kami, yg akan kami salurkan ke panti asuhan di kota Semarang. Kontribusi Anda akan sangat berarti.
          </p>

          <div className="flex justify-between items-center">
            <input
              type="number"
              name="donasi"
              placeholder="Donasi Rp.*"
              value={customerDetails.donasi}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg p-2 w-1/2 mr-2"
              min="0"
            />
            <button
              type="submit"
              className="border rounded-lg p-2 w-1/2 bg-artoteldark text-foreground hover:bg-opacity-80 transition font-[family-name:var(--font-FFDinPro-Black)]"
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