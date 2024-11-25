import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import '../styles/table-cart.css';

export default function Cart({ cart, openCart, toggleCartDialog, updateQuantity, removeFromCart }) {
  const [loading, setLoading] = useState(false);  // Estado para manejar el loading

  const handleCreatePreference = async () => {
    setLoading(true);  // Activamos el loading al hacer clic en Pagar

    try {
      const items = cart.map((product) => ({
        id: product._id,
        currency_id: "ARS",
        title: product.name,
        quantity: product.quantity,
        unit_price: product.price,
      }));

      const response = await fetch("https://pasteleria-backend.onrender.com/mercadopago/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la preferencia");
      }

      const data = await response.json();

      console.log("URL recibida:", data.init_point);

      // Cerrar el modal antes de mostrar la alerta
      toggleCartDialog();

      // Muestra la alerta y redirige a Mercado Pago
      setTimeout(() => {
        Swal.fire({
          icon: 'info',
          title: 'Redireccion a Mercado Pago',
          text: 'Esta seguro que quiere continuar?',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Acción cuando el usuario hace clic en "OK"
            window.location.href = data.init_point;
            console.log('Acción confirmada');
          } else {
            // Acción cuando el usuario hace clic en "Cancelar"
            console.log('Acción cancelada');
            return
          }
        });
      }, 200); // Espera 100ms antes de mostrar la alerta


    } catch (error) {
      console.error("Error:", error.message);
      alert("Hubo un error al crear la preferencia");
    } finally {
      setLoading(false);  // Desactivamos el loading cuando finaliza la petición
    }
  };

  return (
    <Dialog open={openCart} onClose={toggleCartDialog} style={{ textAlign: 'center' }} sx={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>
      <DialogTitle sx={{fontSize: '30px'}}>Carrito de Compras</DialogTitle>
      <DialogContent>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontFamily:'Roboto' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Nombre</th>
                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Precio</th>
                <th style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product._id}>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>${product.price}</td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product._id, parseInt(e.target.value, 10))}
                      style={{
                        width: '50px',
                        textAlign: 'center',
                        marginRight: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      style={{
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCartDialog} color="primary">
          Cerrar
        </Button>
        <Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={handleCreatePreference}
          disabled={loading}  // Deshabilitar el botón mientras se está cargando
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Pagar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
