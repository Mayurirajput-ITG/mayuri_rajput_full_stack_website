import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './utills/db.js';
import router from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);
const PORT = process.env.PORT || 7000;
dbConnection();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
