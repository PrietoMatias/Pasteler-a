// src/components/SearchAppBar.jsx
import * as React from 'react';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Cart from './Cart'
import '../styles/search.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchAppBar({ searchTerm, setSearchTerm, cart, updateQuantity, removeFromCart }) {
  const [openCart, setOpenCart] = useState(false); // Estado para abrir/cerrar el diálogo del carrito

  // Función para abrir y cerrar el diálogo del carrito
  const toggleCartDialog = () => {
    setOpenCart(!openCart);
  };
  console.log(cart)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Logo */}
          <img src="https://github.com/augustoterrera/Image-Proyect/blob/master/Logo/logo-header-enhanced.png?raw=true" alt="Logo" style={{ width: '60px', height: '50px', marginRight: '5px' }} />

          {/* Barra de búsqueda */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar productos..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>

          {/* Carrito */}
          <IconButton
            size="large"
            color="inherit"
            aria-label="open cart"
            sx={{ ml: 'auto' }} // Esto alinea el carrito al final del navbar
            onClick={toggleCartDialog} // Abre el diálogo del carrito
          >
            <Badge
              badgeContent={cart.length} // Muestra la cantidad de productos en el carrito
              color="error" // El color rojo del badge
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Cart
            cart={cart}
            openCart={openCart}
            toggleCartDialog={toggleCartDialog}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
