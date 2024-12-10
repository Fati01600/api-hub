import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Vision from './pages/Vision';
import Endpoints from './pages/Endpoints';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="vision" element={<Vision />} />
          <Route path="endpoints" element={<Endpoints />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
