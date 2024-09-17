import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const PopupUpdateMenu = ({ show, onClose, menuId }) => {
  const [input, setInput] = useState({
    Photo: "",
    Name: "",
    Amount: 0,
    Quantity: 0,
    Tenant: "",
  });
  console.log(menuId);
  console.log("ID data: ", menuId.ID);

  useEffect(() => {
    if (menuId) {
      axios
        .get(`http://localhost:8080/menus/id/${menuId.ID}`)
        .then((res) => {
          console.log(res.data.data);
          setInput({
            Photo: res.data.data.photo,
            Name: res.data.data.name,
            Amount: res.data.data.amount,
            Quantity: res.data.data.quantity,
            Tenant: res.data.data.tenant,
          });
        })
        .catch((err) => {
          console.error("Error fetching menu data:", err);
        });
    }
  }, [menuId]); // Ensure this useEffect is triggered only when menuId changes

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "Photo") {
      setInput({ ...input, [name]: event.target.files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/menus/${menuId.ID}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              timer: 1500,
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            console.error("Error deleting menu:", err);
          });
      }
    });
  };

  const popupDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Photo", input.Photo);
    formData.append("Name", input.Name);
    formData.append("Amount", input.Amount);
    formData.append("Quantity", input.Quantity);
    formData.append("Tenant", input.Tenant);

    axios
      .patch(`http://localhost:8080/menus/${menuId.ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "Menu updated successfully.",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.error("Error updating menu:", err);
      });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-1/2 relative">
        <h2 className="text-blue-500 font-bold text-xl mb-4">Update Menu</h2>
        <button
          className="absolute top-2 text-2xl right-4 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          {/* Form Fields for Editing Menu */}
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Foto Produk
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              name="Photo"
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
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 font-bold text-white py-2 px-4 rounded"
            >
              Simpan
            </button>
            <button
              value={menuId.ID}
              onClick={handleDelete}
              type="button"
              class="bg-red-500 font-bold text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupUpdateMenu;
