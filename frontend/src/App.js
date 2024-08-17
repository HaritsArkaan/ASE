import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseRole from "./component/chooseRole";
import Login from "./component/login";
import DashboardLayout from "./component/dashboardLayout";
import ListMenu from "./component/listMenu";
import Home from "./component/home";
import Signup from "./component/signup";
import Laporan from "./component/laporan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChooseRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Bungkus rute yang memerlukan Sidebar dengan DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/menu" element={<ListMenu />} />
          <Route path="/laporan" element={<Laporan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
