import React, { useState, useEffect } from "react";
import Popup from "./popup";
import axios from "axios";
import PopupUpdateMenu from "./popupUpdateMenu";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ListMenu = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null); // for the menu being edited

  const getRole = () => {
    const decode = jwtDecode(Cookies.get("token"));

    console.log(decode.role);
    return decode.role;
  };

  const toggleAddPopup = () => {
    if (getRole() !== "Tenant") {
      Swal.fire({
        icon: "error",
        title: "You're not authorized!",
        text: "Please login as a tenant o add a menu.",
      });
    } else {
      setShowAddPopup(!showAddPopup);
    }
  };

  const toggleEditPopup = (menu) => {
    if (getRole() !== "Tenant") {
      Swal.fire({
        icon: "error",
        title: "You're not authorized!",
        text: "Please login as a tenant to edit a menu.",
      });
    } else {
      setSelectedMenu(menu); // Set the selected menu for editing
      setShowEditPopup(!showEditPopup);
    }
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/menus")
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((err) => {});
  }, []);

  const formatRupiah = (angka, prefix) => {
    let number_string = angka.toString().replace(/[^,\d]/g, "");
    let split = number_string.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;

    return prefix == null ? rupiah : rupiah ? "Rp " + rupiah : "";
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
              {data !== null &&
                data.map((menu, index) => (
                  <tr
                    className="border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div>
                        <button
                          className="mx-4"
                          onClick={() => toggleEditPopup(menu)}
                        >
                          <img src="./img/editMenuButton.png" className="w-6" />
                        </button>
                        {selectedMenu && (
                          <PopupUpdateMenu
                            menuId={selectedMenu} // Pass the selected menu for editing
                            show={showEditPopup}
                            onClose={toggleEditPopup}
                          />
                        )}
                      </div>
                      <img
                        src={menu.imageURL}
                        alt="gambar menu"
                        className="w-16 h-16 rounded-md mr-4"
                      />
                      {menu.name}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {formatRupiah(menu.amount, "Rp ")}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {menu.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex w-full justify-start">
        <button
          type="button"
          onClick={toggleAddPopup}
          className="text-white ml-64 my-10 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Tambah Data Menu
        </button>
        <Popup show={showAddPopup} onClose={toggleAddPopup} />
      </div>
    </>
  );
};

export default ListMenu;
