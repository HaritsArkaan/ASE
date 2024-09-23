import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [input, setInput] = useState({
    Username: "",
    Email: "",
    Password: "",
    Role: "",
    Pfp: "",
  });

  let navigate = useNavigate();

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "Pfp") {
      setInput({ ...input, [name]: event.target.files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   console.log(file);
  //   reader.onloadend = () => {
  //     const base64String = reader.result.replace(/^data:.+;base64,/, "");
  //     setInput((prevInput) => ({ ...prevInput, Pfp: base64String }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleRegister = (event) => {
    event.preventDefault();
    let { Username, Email, Password, Role, Pfp } = input;
    console.log(input);

    const formData = new FormData();
    formData.append("Username", Username);
    formData.append("Email", Email);
    formData.append("Password", Password);
    formData.append("Role", Role);
    formData.append("Pfp", Pfp);
    axios
      .post("http://localhost:8080/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        let { token } = res.data;
        Cookies.set("token", token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Tel-U Canteen
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleRegister}
            >
              <div className="flex gap-4 w-full ">
                <div className="w-full">
                  <label
                    htmlFor="Username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="Username"
                    id="Username"
                    value={input.Username}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    value={input.Email}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full ">
                <div className="w-full">
                  <label
                    htmlFor="Password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="Password"
                    id="Password"
                    value={input.Password}
                    onChange={handleInput}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="Role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  {/* <input
                    type="text"
                    name="Role"
                    id="Role"
                    value={input.Role}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  /> */}
                  <select
                    name="Role"
                    id="Role"
                    value={input.Role}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih role</option>
                    <option value="Kasir">Kasir</option>
                    <option value="Tenant">Tenant</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Picture
                </label>
                <div>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    name="Pfp"
                    id="Pfp"
                    type="file"
                    onChange={handleInput}
                  />
                  <div
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="user_avatar_help"
                  >
                    A profile picture is useful to confirm your are logged into
                    your account
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
