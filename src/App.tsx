import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./layouts/Sidebar";
import "./styles/global.css";
import Navbar from "./layouts/Navbar";
import { useAppSelector } from "./redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewSell from "./pages/NewSell";
import ItemSell from "./pages/NewSell/ItemSell";
import NewInstitutionModal from "./layouts/Modal/NewInsitutionModal";

const App = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  return (
    <div>
      <Router>
        <Sidebar />
        <NewInstitutionModal />
        <div className={`relative ${isOpen ? "ml-[280px]" : "ml-[80px]"}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-sell" element={<NewSell />} />
            <Route path="/new-sell/item" element={<ItemSell />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
