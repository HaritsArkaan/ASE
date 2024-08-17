import React, { useState } from "react";
import Popup from "./popup";

const ListMenu = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div className="mt-16 ml-64">
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left bg-gray-100 rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <button>
                    <img src="./img/editMenuButton.png" className="w-6" />
                  </button>
                  <img
                    src="https://pnghq.com/wp-content/uploads/aqua-png-free-image-png-16461-768x768.png"
                    alt="gambar menu"
                    className="w-16 h-16 "
                  />
                  Aqua 600ml
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Rp. 10.000
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  90
                </td>
              </tr>
              <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
              </tr>
              <tr className=" dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full justify-start">
        <button
          type="button"
          onClick={togglePopup}
          class="text-white ml-64 my-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Tambah Data Menu
        </button>
        <Popup show={showPopup} onClose={togglePopup} />
      </div>
    </>
  );
};

export default ListMenu;
