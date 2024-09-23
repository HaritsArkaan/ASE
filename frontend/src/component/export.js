import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Export = () => {
  const location = useLocation();
  const { data } = location.state || { data: [] };

  useEffect(() => {
    // Trigger window print as soon as the component is mounted
    window.print();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Laporan Penjualan</h1>
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
              <th scope="col" className="px-6 py-3">
                Tanggal Pemesanan
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.order_id}
                  </th>
                  <td className="px-6 py-4">{item.tenant}</td>
                  <td className="px-6 py-4">{item.pesanan}</td>
                  <td className="px-6 py-4">{item.metode_pembayaran}</td>
                  <td className="px-6 py-4">{item.total}</td>
                  <td className="px-6 py-4">
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Tidak ada data untuk diexport.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Export;
