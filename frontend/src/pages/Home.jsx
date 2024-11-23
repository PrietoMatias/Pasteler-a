import { useState, useEffect } from 'react';
import Products from '../components/Products';
import { getProducts } from '../api/methods/products.api.js';
import SearchAppBar from '../components/SearchAppBar';
import Box from '@mui/material/Box';
import Footer from '../components/Footer.jsx';
import Button from '@mui/material/Button';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // Estado para el carrito
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 8; // Productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product._id === productId ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
  };

  const filteredData = products.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Navbar MUI */}
      <SearchAppBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      {/* Sección de productos */}
      <Products products={currentProducts} addToCart={addToCart} />

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 3 }}>
        {Array.from({ length: Math.max(Math.ceil(filteredData.length / productsPerPage), 1) }).map((_, index) => (
          <Button
            key={index}
            onClick={() => paginate(index + 1)}
            sx={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === index + 1 ? '#1976d2' : '#e0e0e0',
              color: currentPage === index + 1 ? 'white' : 'black',
              '&:hover': { backgroundColor: currentPage === index + 1 ? '#115293' : '#d6d6d6' },
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>


      {/* Sección del Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
