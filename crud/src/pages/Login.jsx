import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/methods/users';
import useAuth from '../hooks/useAuth';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";

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
    <Box
      sx={{
        width: "100vw", // Ancho completo de la ventana
        height: "100vh", // Altura completa de la ventana
        backgroundColor: "#e0e0e0", // Fondo gris claro
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 3,
            width: "100%", // Ocupa el ancho total del contenedor
            minHeight: "400px", // Altura mínima para darle un efecto estirado
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Inicio de Sesión
            </Typography>
            <TextField
              fullWidth
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                sx: { paddingLeft: 2, paddingRight: 1.5 }, // Ajusta el padding interno
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                sx: { paddingLeft: 2, paddingRight: 1.5 }, // Ajusta el padding interno
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Iniciar sesión
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
