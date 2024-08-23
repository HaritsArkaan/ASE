import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Popup = ({ show, onClose }) => {
  const [input, setInput] = useState({
    photo: "",
    name: "",
    amount: 0,
    quantity: 0,
    tenant: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let { photo, name, amount, quantity, tenant } = input;
    // const formData = new FormData();
    // formData.append("photo", photo);
    // formData.append("name", name);
    // formData.append("amount", amount);
    // formData.append("quantity", quantity);
    // formData.append("tenant", tenant);
    axios
      .post(
        "http://localhost:8080/menus",
        { photo, name, amount, quantity, tenant },
        {
          headers: {
            authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
          redirect: "follow",
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          console.log("Error data:", err.response.data);
          console.log("Error status:", err.response.status);
          console.log("Error headers:", err.response.headers);
        } else if (err.request) {
          console.log("Error request:", err.request);
        } else {
          console.log("Error message:", err.message);
        }
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.onloadend = () => {
      const base64String = reader.result.replace(/^data:.+;base64,/, "");
      setInput((prevInput) => ({ ...prevInput, photo: base64String }));
    };
    reader.readAsDataURL(file);
    console.log(file);
  };
  const [image, setImage] = useState("");
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Foto Produk
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              name="photo"
              id="photo"
              onChange={handleFileChange}
              type="file"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Tenant
            </label>
            <input
              type="text"
              name="tenant"
              value={input.tenant}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Harga
            </label>
            <input
              type="number"
              name="amount"
              value={input.amount}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Stok
            </label>
            <input
              type="number"
              name="quantity"
              value={input.quantity}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded"
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

export default Popup;
