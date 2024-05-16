import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./layouts/Sidebar";
import "./styles/global.css";
import Navbar from "./layouts/Navbar";
import { useAppSelector } from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Business from "./pages/Business";
import ItemSell from "./pages/Business/ItemSell";
import CompanyModal from "./layouts/Modal/CompanyModal";
import StockModal from "./layouts/Modal/StockModal";
import Schedule from "./pages/Schedule";
import ScheduleModal from "./layouts/Modal/ScheduleModal";

//TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sellings from "./pages/Sellings";
import Company from "./pages/Company";
import Analytics from "./pages/Analytics";
import SalesReportModal from "./layouts/Modal/SalesReportModal";
import UniformReportModal from "./layouts/Modal/UniformReportModal";

const App = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  return (
    <div>
      <Router>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Sidebar />
        <CompanyModal />
        <StockModal />
        <ScheduleModal />
        <SalesReportModal />
        <UniformReportModal />
        <div className={`relative ${isOpen ? "ml-[280px]" : "ml-[80px]"}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<Business />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/business/company/:id" element={<Company />} />
            <Route path="/business/sell/:id" element={<ItemSell />} />
            <Route path="/sellings" element={<Sellings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
