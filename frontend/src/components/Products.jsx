import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';

export default function Products({ products, addToCart }) {
  const [loading, setLoading] = useState({}); // Un objeto para el estado de carga de cada producto


  const handleCreatePreference = async (product) => {
    setLoading((prev) => ({ ...prev, [product._id]: true })); // Marca como cargando el producto seleccionado
    try {
      // Estructura del producto en el formato esperado
      const items = [
        {
          id: product._id,
          currency_id: "ARS",
          title: product.name,
          quantity: 1, // Puedes cambiar esto si tienes cantidades específicas
          unit_price: product.price,
        },
      ];

      const response = await fetch("https://pasteleiabackend.onrender.com/mercadopago/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }), // Enviar `items` como un array
      });

      if (!response.ok) {
        throw new Error("Error al crear la preferencia");
      }

      const data = await response.json();

      console.log("URL recibida:", data.init_point);

      Swal.fire({
        icon: 'info',
        title: 'Redirección a Mercado Pago',
        text: '¿Está seguro que quiere continuar?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = data.init_point; // Redirige a Mercado Pago
        } else {
          console.log('Acción cancelada');
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear la preferencia",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [product._id]: false }));
    }
  };


  // Renderizado del producto
  const renderProductCard = (product) => (
    <Card key={product._id} sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        alt="Producto"
        sx={{
          width: '100%',
          height: '200px',
          objectFit: 'contain',
        }}
        image={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: 'white',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' },
          }}
          onClick={() => handleCreatePreference(product)}
        >
          {loading[product._id] ? <CircularProgress size={24} color="inherit" /> : "Pagar"}
        </Button>
        <Button
          size="small"
          sx={{
            color: 'white',
            backgroundColor: '#388e3c',
            '&:hover': { backgroundColor: '#2e7d32' },
          }}
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </Button>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {product.price}
        </Typography>
      </CardActions>
    </Card>
  );

  return (
    <>
      {/* Renderizado de productos paginados */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3.5,
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {products.map((product) => renderProductCard(product))}
      </Box>
    </>
  );
}