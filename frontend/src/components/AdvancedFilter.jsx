// AdvancedFilter.jsx
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Estilos personalizados para el botón
const FilterButton = styled(Button)({
  backgroundColor: '#5c358d',
  color: '#fff',
  fontSize: '0.9rem', 
  padding: '6px 12px', 
  '&:hover': {
    backgroundColor: '#543053',
  },
  borderRadius: 10,
  boxShadow: 'none',
  border: '1px solid #5c358d',
});

// Estilos personalizados para el acordeón
const StyledAccordion = styled(Accordion)({
  backgroundColor: '#e0dbe2', 
  boxShadow: 'none',          
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  '&::before': {
    display: 'none',          
  },
});

// Estilos para el contenido del acordeón, con una sombra difuminada en la parte superior
const StyledAccordionDetails = styled(AccordionDetails)({
  boxShadow: '0px 5opx 15px rgba(0, 0, 0, 0.1)', 
});

function AdvancedFilter({ setFilteredProducts }) {
  // Estados para cada filtro
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [priceOrder, setPriceOrder] = useState('');
  const [fillings, setFillings] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  // Opciones de filtro (puedes cargarlas desde una API si lo prefieres)
  const sizes = ['Pequeño', 'Mediano', 'Grande'];
  const types = ['Tarta', 'Pastel', 'Cupcake'];
  const availableFillings = ['Chocolate', 'Vainilla', 'Fruta'];
  const priceOptions = [
    { value: 'asc', label: 'Menor a mayor' },
    { value: 'desc', label: 'Mayor a menor' },
  ];

  useEffect(() => {
    // Función para obtener los productos filtrados
    const fetchFilteredProducts = async () => {
      try {
        const query = new URLSearchParams();
        if (size) query.append('size', size);
        if (type) query.append('type', type);
        if (priceOrder) query.append('priceOrder', priceOrder);
        if (fillings.length > 0) query.append('fillings', fillings.join(','));

        const response = await fetch(`http://tu-api-url.com/productos?${query.toString()}`);
        const data = await response.json();
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos filtrados:", error);
      }
    };

    fetchFilteredProducts();
  }, [size, type, priceOrder, fillings, setFilteredProducts]);

  // Función para manejar la selección de rellenos
  const handleFillingChange = (filling) => {
    setFillings(prev => 
      prev.includes(filling) 
        ? prev.filter(f => f !== filling) 
        : [...prev, filling]
    );
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <StyledAccordion expanded={openFilter}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="filter-content"
        id="filter-header"
      >
        <FilterButton variant="contained" onClick={handleOpenFilter}>
          {openFilter ? 'Ocultar filtro' : 'Mostrar filtro'}
        </FilterButton>
      </AccordionSummary>
      <StyledAccordionDetails>
        <div>
          <div>
            <label>Tamaño:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Todos</option>
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tipo:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Todos</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Orden de precio:</label>
            <select value={priceOrder} onChange={(e) => setPriceOrder(e.target.value)}>
              <option value="">Sin orden</option>
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Rellenos:</label>
            {availableFillings.map((filling) => (
              <div key={filling}>
                <input
                  type="checkbox"
                  checked={fillings.includes(filling)}
                  onChange={() => handleFillingChange(filling)}
                />
                <label>{filling}</label>
              </div>
            ))}
          </div>
        </div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
}

export default AdvancedFilter;
