import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token'); 
    
    navigate('/');
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo">
            <img
              src="src/assets/logo-header.png"
              alt=""
              style={{ width: '70px', height: '60px', marginRight: '5px' }}
            />
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <button
                className="waves-effect waves-light btn-small #d50000 red accent-4"
                onClick={handleLogout} 
              >
                Salir
              </button>
            </li>
            <li>
              <NavLink to="/suppliers">Proveedores</NavLink>
            </li>
            <li>
              <NavLink to="/products">Productos</NavLink>
            </li>
            <li>
              <NavLink to="/inventory">Inventario</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Home;
