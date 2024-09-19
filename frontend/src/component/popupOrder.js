import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const TambahOrder = ({ show, onClose }) => {
  const [menus, setMenus] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [input, setInput] = useState({
    menu_name: "",
    user_name: "",
    amount: 0,
  });

  useEffect(() => {
    // Fetch menus on component mount
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/menus");
        setMenus(response.data.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Update input fields
  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/listUser");
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let { menu_name, user_name } = input;

    // Find the selected menu in the menus list
    const menu = menus.find((m) => m.name === menu_name);

    // Cek jika stok menu (quantity) 0
    if (menu && menu.quantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The menu is out of stock",
      });
    } else {
      try {
        const response = await fetch("http://localhost:8080/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            menu_name,
            user_name,
          }),
        });

        const result = await response.json();
        console.log(result);
        Swal.fire({
          title: "Your order has been added!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });

        onClose();
      } catch (error) {
        console.error("Error adding order:", error);
        alert("Failed to add order.");
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/2 relative">
        <h2 className="text-blue-500 font-bold text-xl mb-4">Tambah Order</h2>
        <button
          className="absolute top-2 text-2xl right-4 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Pilih Menu
            </label>
            <select
              name="menu_name"
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Pilih menu</option>
              {menus &&
                menus.map((menu) => (
                  <option key={menu.ID} value={menu.name}>
                    {menu.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Pemesan
            </label>
            <input
              type="text"
              name="user_name"
              value={input.user_name}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
              required
            />
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

export default TambahOrder;
