import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Supplier from './pages/Supplier';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <WrapperWithHome /> {/* Nueva función para manejar el Home */}
    </BrowserRouter>
  );
}

const WrapperWithHome = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Home />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Supplier />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
export default App;