import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Vision from "./pages/Vision";
import Endpoints from "./pages/Endpoints";
import Library from "./pages/Library";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { UserProvider } from "./api/UserContext";
import Songs from "./pages/Songs";
import Compatibility from "./pages/Compatibility";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="vision" element={<Vision />} />
            <Route path="endpoints" element={<Endpoints />} />
            <Route path="library" element={<Library />} />
            <Route path="songs" element={<Songs />} />
            <Route path="compatibility" element={<Compatibility />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
