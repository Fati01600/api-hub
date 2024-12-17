import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Vision from './pages/Vision';
import Endpoints from './pages/Endpoints';
import Library from './pages/Library';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="endpoints" element={<Endpoints />} />
          <Route path="library" element={<Library />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
