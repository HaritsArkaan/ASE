import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import TambahOrder from "./popupOrder";
import Swal from "sweetalert2";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [menus, setMenus] = useState([]);
  const [users, setUsers] = useState([]);
  //materi create & delete data secara real time
  const [fetchStatus, setFetchStatus] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    if (getRole() !== "Kasir") {
      Swal.fire({
        icon: "error",
        title: "You're not authorized!",
        text: "Please login as a cashier to add an order.",
      });
    } else {
      setShowPopup(!showPopup);
    }
  };

  const getRole = () => {
    const decode = jwtDecode(Cookies.get("token"));

    console.log(decode.role);
    return decode.role;
  };

  const errorSwal = () => {
    Swal.fire({
      icon: "error",
      title: "You're not authorized!",
      text: "Please login as a cashier to delete an order.",
    });
  };

  const handleDelete = (event) => {
    if (getRole() !== "Kasir") {
      errorSwal();
    } else {
      Swal.fire({
        title: "Konfirmasi Pembayaran",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Confirm!",
      }).then((result) => {
        if (result.isConfirmed) {
          event.preventDefault();
          let ID = parseInt(event.target.value);

          axios
            .delete(`http://localhost:8080/order/${ID}`, {
              headers: {
                authorization: `Bearer ${Cookies.get("token")}`,
              },
            })
            .then((res) => {
              setFetchStatus(true);
            });
          Swal.fire({
            title: "Payment Confirmed!",

            icon: "success",
          });
        }
      });
    }
  };

  useEffect(() => {
    // Fetch orders, menus, and users
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get("http://localhost:8080/order");
        const menusRes = await axios.get("http://localhost:8080/menus");
        const usersRes = await axios.get("http://localhost:8080/listUser");

        setOrders(ordersRes.data.data);
        setMenus(menusRes.data.data);
        setUsers(usersRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [[fetchStatus, setFetchStatus]]);

  return (
    <>
      <div className="mt-16 mx-64 flex flex-wrap gap-2">
        {orders.map((order) => {
          const menu = menus.find((menu) => menu.ID === order.menu_id);
          const user = users.find((user) => user.ID === order.user_id);

          if (!menu || !user) return null; // Ensure menu and user exist for the order

          return (
            <div
              key={order.ID}
              className="h-auto max-w-xs bg-white shadow-lg border rounded-lg overflow-hidden mb-4"
            >
              <div className="mx-4 flex space-x-2">
                <img
                  src={menu.imageURL}
                  alt={menu.name}
                  className="m-3 w-24 h-24 bg-cover bg-center bg-landscape rounded-lg"
                />
                <div className="w-2/3 p-2">
                  <h1 className="text-gray-900 font-bold text-xl">
                    ID-Pesanan: {order.ID}
                  </h1>
                  <h2 className="text-gray-900 font-bold text-lg">
                    {menu.name}
                  </h2>
                  <div className="item-center mt-2 text-gray-500">
                    <h2 className="text-gray-900 font-bold text-lg">
                      Rp {menu.amount.toLocaleString()}
                    </h2>
                  </div>
                  <div className="flex item-center justify-end mt-2">
                    <h1 className="text-gray-700 font-bold text-md">
                      {menu.tenant}
                    </h1>
                  </div>
                </div>
              </div>
              <button
                type="button"
                value={order.ID}
                onClick={handleDelete}
                className="mx-4 focus:outline-none w-11/12 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          );
        })}
      </div>
      <TambahOrder show={showPopup} onClose={togglePopup} />

      <div className="fixed bottom-16 left-72">
        <button
          type="button"
          onClick={togglePopup}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Tambah Order
        </button>
      </div>
    </>
  );
};

export default Home;
