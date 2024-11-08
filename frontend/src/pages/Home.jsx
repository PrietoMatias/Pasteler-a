// Home.jsx
import React, { useState } from 'react';
import Products from '../components/Products';
import data from '../services/data.json';
import SearchAppBar from '../components/SearchAppBar';
import Box from '@mui/material/Box';
import AdvancedFilter from '../components/AdvancedFilter';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data); // Estado para almacenar los productos filtrados

  const filteredData = data.filter((d) =>
    d.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar MUI */}
      <SearchAppBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Filtro avanzado con margen superior ajustado */}
      <Box
        sx={{
          width: 250,
          backgroundColor: '#e0dbe2',
          padding: 1,
          margin: '-9px 0 0 0',
          marginTop: 1,
        }}
      >
        <AdvancedFilter setFilteredProducts={setFilteredProducts} />
      </Box>

      {/* Sección de productos */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3.9, 
          justifyContent: 'center', 
          padding: '20px' 
        }}
      >
        {filteredProducts.map((d) => ( // Utiliza filteredProducts en lugar de filteredData
          <Products key={d.id} products={d} />
        ))}
      </Box>
    </>
  );
};

export default Home;
