import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Laporan = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch data laporan ketika komponen pertama kali dimuat
    axios
      .get("http://localhost:8080/laporan")
      .then((res) => {
        setData(res.data.data); // Menyimpan data laporan ke state
        setFilteredData(res.data.data); // Menyimpan data awal ke state filtered
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFilter = () => {
    // Filter data laporan berdasarkan startDate dan endDate
    const filtered = data.filter((item) => {
      const orderDate = new Date(item.created_at); // Anggap "tanggal_pesanan" adalah field tanggal pada laporan
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Hanya tampilkan data yang sesuai dengan range tanggal
      return orderDate >= start && orderDate <= end;
    });

    // Update state dengan data yang sudah difilter
    setFilteredData(filtered);
  };

  const handleExport = () => {
    navigate("/export", { state: { data: filteredData } }); // Pass the filteredData as state
  };

  return (
    <div>
      <div className="mt-16 ml-64">
        <div>
          <h1 className="text-2xl font-bold my-4">Cetak Laporan Penjualan</h1>

          {/* Flex container untuk teks, datepicker, tombol */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold my-4">Waktu Pemesanan Dibuat</h1>

            <div className="flex items-center space-x-4">
              {/* Datepicker */}
              <div className="flex flex-col">
                <label className="font-bold mb-1">Tanggal Mulai</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-bold mb-1">Tanggal Akhir</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* Button Filter */}
              <button
                onClick={handleFilter}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition self-end"
              >
                Submit
              </button>
              <button
                onClick={handleExport}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition self-end"
              >
                export
              </button>
            </div>
          </div>
        </div>

        {/* Tabel laporan */}
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
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
                    <td className="px-6 py-4">{item.tanggal_pesanan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Tidak ada data laporan yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
