import React from "react";

const Home = () => {
  return (
    <div className="mt-16 mx-64 h-auto max-w-md bg-white shadow-lg border rounded-lg overflow-hidden">
      <div className="mx-4 flex space-x-2">
        <img
          src="/img/logomakananbaru.png"
          className="m-3 w-36 h-36 bg-cover bg-center bg-landscape rounded-lg"
        />
        <div className="w-2/3 p-4">
          <h1 className="text-gray-900 font-bold text-2xl">ID-Pesanan: R459</h1>
          <h2 className="text-gray-900 font-bold text-xl">Nasi Goreng</h2>
          <div className="item-center mt-2 text-gray-500">
            <h2 className="text-gray-900 font-bold text-xl">Rp 14.000</h2>
          </div>
          <div className="flex item-center justify-end mt-3">
            <h1 className="text-gray-700 font-bold text-xl">Kantin Rasya</h1>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="mx-4 focus:outline-none w-11/12 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Konfirmasi Pesanan
      </button>
    </div>
  );
};

export default Home;
