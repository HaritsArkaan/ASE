import React from "react";

const ChooseRole = () => {
  return (
    <>
      <div>
        <h1 className="text-5xl text-center text-black-900 font-semibold">
          Selamat Datang, Silahkan Pilih Role Anda
        </h1>
      </div>

      <div className="flex max-h-max justify-center item-center">
        <div class="p-5 my-10 mx-20 max-w-md flex flex-col bg-white items-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img class="rounded-t-lg" src="/img/kasir.png" alt="Kasir" />

          <div class="p-5 flex flex-col justify-center items-center">
            <h2 class="mb-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kasir
            </h2>

            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Choose Role
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="px-5 py-2.5 my-10 mx-20 max-w-md flex flex-col bg-white items-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <img class="rounded-t-lg" src="/img/tenant.png" alt="Kasir" />

          <div class="p-5 flex flex-col justify-center items-center">
            <h2 class="mb-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tenant
            </h2>

            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Choose Role
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseRole;
