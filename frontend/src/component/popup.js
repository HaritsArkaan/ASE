import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Popup = ({ show, onClose }) => {
  const [input, setInput] = useState({
    Photo: "",
    Name: "",
    Amount: 0,
    Quantity: 0,
    Tenant: "",
  });

  const [currentID, setCurrentID] = useState(-1);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "Photo") {
      setInput({ ...input, [name]: event.target.files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let { Photo, Name, Amount, Quantity, Tenant } = input;
    const formData = new FormData();
    formData.append("Photo", Photo);
    formData.append("Name", Name);
    formData.append("Amount", Amount);
    formData.append("Quantity", Quantity);
    formData.append("Tenant", Tenant);

    if (currentID === -1) {
      axios
        .post("http://localhost:8080/menus", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          alert("Menu Added");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:8080/menus/${currentID}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          alert("Menu Updated");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setCurrentID(-1);
  };

  const handleUpdate = (e) => {
    let id = parseInt(e.target.value);
    setCurrentID(id);
    axios
      .get(`http://localhost:8080/menus/id/${id}`)
      .then((res) => {
        let data = res.data;
        setInput({
          Photo: data.Photo,
          Name: data.Name,
          Amount: data.Amount,
          Quantity: data.Quantity,
          Tenant: data.Tenant,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // console.log(file);
    // reader.onloadend = () => {
    //   const base64String = reader.result.replace(/^data:.+;base64,/, "");
    //   setInput((prevInput) => ({ ...prevInput, photo: base64String }));
    // };
    // reader.readAsDataURL(file);
    // console.log(file);
    setSelectedFile(event.target.files[0]);
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
              name="Photo"
              id="Photo"
              onChange={handleInput}
              type="file"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Nama Produk
            </label>
            <input
              type="text"
              name="Name"
              value={input.Name}
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
              name="Tenant"
              value={input.Tenant}
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
              name="Amount"
              value={input.Amount}
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
              name="Quantity"
              value={input.Quantity}
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
