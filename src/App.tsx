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
import CreateCompanyModal from "./layouts/Modal/CreateCompanyModal";
import StockModal from "./layouts/Modal/StockModal";
import Schedule from "./pages/Schedule";

const App = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  return (
    <div>
      <Router>
        <Sidebar />
        <CreateCompanyModal />
        <StockModal />
        <div className={`relative ${isOpen ? "ml-[280px]" : "ml-[80px]"}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/business" element={<Business />} />
            <Route path="/business/sell/:id" element={<ItemSell />} />
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
