import '../css/dashboard.css';
import MonthlySales from '../components/MonthlySales';
import TopSuppliers from '../components/TopSuppliers';
import WeeklySales from '../components/WeeklySales';
import CategoryDistribution from '../components/CategoryDistribution';
import PaymentMethods from '../components/PaymentMethods';
import SalesTrends from '../components/SalesTrends';
import { useState } from 'react';

const Dashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardName) => {
    setExpandedCard(expandedCard === cardName ? null : cardName); // Toggle expansión
  };

  return (
    <div className="dashboard-container">
      <div
        className={`card ${expandedCard === 'monthly-sales' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('monthly-sales')}
      >
        <h4>Ventas Mensuales</h4>
        <div className="chart-container">
          <MonthlySales />
        </div>
      </div>

      <div
        className={`card ${expandedCard === 'weekly-sales' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('weekly-sales')}
      >
        <h4>Ventas Semanales</h4>
        <div className="chart-container">
          <WeeklySales />
        </div>
      </div>

      <div
        className={`card ${expandedCard === 'top-suppliers' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('top-suppliers')}
      >
        <h4>Proveedores Más Comprados</h4>
        <div className="chart-container">
          <TopSuppliers />
        </div>
      </div>

      <div
        className={`card ${expandedCard === 'category-distribution' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('category-distribution')}
      >
        <h4>Distribución de categoría</h4>
        <div className="chart-container">
          <CategoryDistribution />
        </div>
      </div>

      <div
        className={`card ${expandedCard === 'payment-methods' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('payment-methods')}
      >
        <h4>Métodos de pagos más usados</h4>
        <div className="chart-container">
          <PaymentMethods />
        </div>
      </div>

      <div
        className={`card ${expandedCard === 'sales-trends' ? 'expanded' : ''}`}
        onClick={() => handleCardClick('sales-trends')}
      >
        <h4>Ventas diarias</h4>
        <div className="chart-container">
          <SalesTrends />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
