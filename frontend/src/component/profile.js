import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      const userId = decode.user_id;

      // Lakukan request ke API listUser untuk mendapatkan detail user
      axios
        .get(`http://localhost:8080/listUser/id/${userId}`)
        .then((response) => {
          setUserData(response.data.data); // Update state dengan data dari API
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center ml-64 mt-16">
      <img
        className="w-48 h-48 rounded-full border-2 object-cover shadow-2xl"
        src={userData.imageURL}
        alt="user photo"
      />

      <h1 className="text-3xl font-bold mt-4">{userData.username}</h1>
      <p className="text-lg text-gray-500 mt-2">{userData.email}</p>
      <div>
        <p className="text-lg text-gray-500 mt-2">Role: {userData.role}</p>
      </div>
    </div>
  );
};

export default Profile;
