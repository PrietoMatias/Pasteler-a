import express, { json } from 'express'
import connection from './src/services/database.js'
import routeInventory from './src/routes/route.inventory.js';
import routeSupplier from './src/routes/route.supplier.js';
import routeUser from './src/routes/route.user.js';
import routeSales from './src/routes/route.sales.js';
import routeReport from './src/routes/route.report.js';
import routeProducts from './src/routes/route.products.js';
import routeDashboard from './src/routes/route.dashboard.js';
import mercadoPagoRoutes from './src/routes/createOrder.routes.js'
import bodyParser from 'body-parser'
import cors from 'cors';
import morgan from 'morgan';
import autentication from './src/routes/route.autentication.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const PORT = process.env.PORT || 4000

const URL_FRONT = process.env.URL_FRONT;

const startServer = async () => {
  //Conexión a la base de datos.
  await connection();

  //Middelwares

  app.use(cookieParser());
  const allowedOrigins = process.env.URL_FRONT.split(',').map((url) => url.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        // Si el origen está en la lista permitida o no tiene origen (por ejemplo, solicitudes internas)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('No permitido por CORS'));
        }
      },
      credentials: true,
    })
  );
  app.use(json());
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  //Rutas
  app.use('/api', routeInventory);
  app.use('/api', routeSales);
  app.use('/api', routeSupplier);
  app.use('/api', routeUser);
  app.use('/api', routeReport);
  app.use('/api', routeProducts);
  app.use('/api', routeDashboard);
  app.use('/api', autentication)
  app.use('/mercadopago', mercadoPagoRoutes)
  //Manejo de errores global
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal, rey.' });
  });


  app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
  });
};

startServer();




