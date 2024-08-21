import React from "react";

const Popup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/2 relative">
        <h2 className="text-blue-500 font-bold text-xl mb-4">Tambah Menu</h2>
        <button
          className="absolute top-2 text-2xl right-4 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        <form>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Foto Produk
            </label>
            <button className="bg-gray-200 text-gray-500 py-2 px-4 rounded">
              Tambahkan Foto
            </button>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Harga
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Stok
            </label>
            <input type="text" className="w-full px-3 py-2 border rounded" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 font-bold text-white py-2 px-4 rounded"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
