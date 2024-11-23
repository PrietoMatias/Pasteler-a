import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../services/methods/users';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log(response)
      if (response.message === 'Login exitoso') {
        alert('Login exitoso. Bienvenido, crack.');
        navigate('/products'); 
      } else {
        alert('Error en el login. Fijate las credenciales, maestro.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Hubo un error en el login. No rompás nada.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
