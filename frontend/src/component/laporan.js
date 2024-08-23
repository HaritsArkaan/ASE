import React, { useEffect, useState } from "react";
import axios from "axios";

const Laporan = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/laporan")
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((err) => {});
  }, []);
  return (
    <div>
      <div className="mt-16 ml-64">
        <div>
          <h1 className="text-2xl font-bold my-4">Cetak Laporan Penjualan</h1>
          <div className="slex">
            <h1 className="text-xl font-bold my-4">Waktu Pemesanan Dibuat</h1>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                datepicker
                id="default-datepicker"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left bg-gray-100 rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID Pesanan
                </th>
                <th scope="col" className="px-6 py-3">
                  Kode Tenant
                </th>
                <th scope="col" className="px-6 py-3">
                  Pesanan
                </th>
                <th scope="col" className="px-6 py-3">
                  Metode Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data.map((data, index) => (
                  <tr className=" border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.order_id}
                    </th>
                    <td className="px-6 py-4">{data.tenant}</td>
                    <td className="px-6 py-4">{data.pesanan}</td>
                    <td className="px-6 py-4">{data.metode_pembayaran}</td>
                    <td className="px-6 py-4">{data.total}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
