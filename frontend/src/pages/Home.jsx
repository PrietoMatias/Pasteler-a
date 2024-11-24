import { useState, useEffect } from 'react';
import Products from '../components/Products';
import { getProducts } from '../api/methods/products.api.js';
import SearchAppBar from '../components/SearchAppBar';
import Box from '@mui/material/Box';
import Footer from '../components/Footer.jsx';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mostrar, setMostrar] = useState(false)
  const productsPerPage = 8;

  const galleryImages = [
    'https://raw.githubusercontent.com/augustoterrera/Image-Proyect/master/especialidades/Cheesecake%20de%20frutos%20rojos_.png',
    'https://raw.githubusercontent.com/augustoterrera/Image-Proyect/master/tortas/Matild.png',
    'https://raw.githubusercontent.com/augustoterrera/Image-Proyect/master/tartas/Brownie%20(ddl%2C%20merengue%2C%20chocolatines).jpg',
    'https://raw.githubusercontent.com/augustoterrera/Image-Proyect/master/tartas/Tarta%20frutal%20%2B%20flores%20comestibles.jpg',
  ];

  // Información de la pastelería
  const bakeryInfo = {
    description: 'Bienvenidos a nuestra pastelería familiar, donde podrás disfrutar de todos nuestros productos.',
    logo: 'https://raw.githubusercontent.com/augustoterrera/Image-Proyect/master/Logo/logo-header.png',
  };

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
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SearchAppBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
        {mostrar
          ?
          (
            <Box sx={{ flex: 2, padding: 3 }}>
              <Products products={currentProducts} addToCart={addToCart} />

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
            </Box>
          )
          :
          (
            <Box
              sx={{
                textAlign: 'center',
                padding: 3,
                backgroundColor: '#e1d8e6',
                flex: 1,
              }}
            >

              <img
                src={bakeryInfo.logo}
                alt="Logo"
                style={{
                  width: '15%',
                  height: 'auto',
                  marginBottom: '-70px',
                }}
              />

              <p style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'Roboto' }}>{bakeryInfo.description}</p>

              <Carousel
                showArrows={false}
                infiniteLoop
                autoPlay
                interval={3000}
                stopOnHover
                dynamicHeight
                showThumbs={false}
              >
                {galleryImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`image-${index}`}
                      style={{
                        width: '28%',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '100px'
                      }}
                    />
                  </div>
                ))}
              </Carousel>
              <Button
                variant="contained"
                sx={{
                  marginTop: 3,
                  padding: '12px 24px',
                  fontSize: '1.2rem',
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#115293' },
                }}
                onClick={() => setMostrar(true)}
              >
                Ver Productos
              </Button>
            </Box>

          )
        }

        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default Home;
