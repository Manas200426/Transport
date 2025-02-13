import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import CreateLedger from "./pages/CreateLedger";
import AdminLogin from "./pages/AdminLogin";
import AlterLedger from "./pages/AlterLedger";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/create-ledger" element={<CreateLedger />} />
        <Route path="/alter-ledger" element={<AlterLedger />} />
      </Routes>
    </Router>
  );
}

export default App;
