import React from 'react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
        <div 
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" 
        onClick={onClose} // Close on overlay click
        >
            <div 
            className="bg-white rounded-2xl shadow-lg p-6 w-80 z-60" 
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
            >
            <h2 className="text-xl font-bold mb-4 text-background">Terms & Condition</h2>
            <div className="font-[family-name:var(--font-FFDinPro-Regular)] text-background max-h-80 overflow-y-auto">
            <h2><strong>1. Keberlakuan Voucher</strong></h2>
            <p>Voucher ini hanya berlaku di <strong>Hotel Dafam Semarang</strong> Jl. Imam Bonjol No. 188.</p>
            <p>Voucher berlaku untuk periode menginap 18 - 30 November 2024. dan voucher tidak dapat diuangkan.</p>
                <br />
            <h2><strong>2. Penggunaan Voucher</strong></h2>
            <p>Voucher hanya dapat digunakan satu kali dan tidak dapat digabungkan dengan promosi atau diskon lainnya.</p>
            <p>Untuk menggunakan voucher, pemesan harus melakukan reservasi terlebih dahulu dengan menyebutkan nomor voucher.</p>
                <br />
            <h2><strong>3. Ketersediaan Kamar</strong></h2>
            <p>Ketersediaan kamar tergantung pada tingkat hunian hotel. Pemesan disarankan untuk melakukan reservasi lebih awal.</p>
                <br />
            <h2><strong>4. Pembatalan</strong></h2>
            <p>Pembatalan pemesanan yang menggunakan voucher dilakukan paling lambat <strong>1 hari</strong> sebelum tanggal check-in. Jika tidak, voucher akan dianggap hangus.</p>
                <br />
            <h2><strong>5. Ketentuan Tambahan</strong></h2>
            <p>Semua tamu wajib mengikuti peraturan hotel dan norma yang berlaku selama menginap.</p>
            <p><strong>Hotel Dafam Semarang</strong> berhak untuk mengubah syarat dan ketentuan ini tanpa pemberitahuan terlebih dahulu.</p>
            <br />
            <p>Untuk informasi lebih lanjut, silakan hubungi</p>
            <p>
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