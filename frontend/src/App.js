import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./component/sidebar";
import Swal from "sweetalert2";
import ChooseRole from "./component/chooseRole";
import Login from "./component/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListMenu from "./component/listMenu";

function App() {
  // const click = () => {
  //   Swal.fire("SweetAlert2 is working!");
  // };
  return (
    // <Sidebar/>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChooseRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Sidebar />} />
          <Route path="/menu" element={<ListMenu />} />
        </Routes>
      </BrowserRouter>
      {/* <button onClick={click}>swal</button> */}
      {/* <ChooseRole /> */}
    </>
  );
}

export default App;
