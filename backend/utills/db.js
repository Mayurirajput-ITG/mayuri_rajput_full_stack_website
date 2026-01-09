// utills/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_URL)
const dbConnection = async () => {
  try {
    const connectionString = `${process.env.DB_URL}/${process.env.DB_NAME}?authSource=admin`;
    console.log(connectionString, '::: --- DataBase connection string ---');

    await mongoose.connect(connectionString);
    console.log(`--- Connected to MongoDB (${process.env.NODE_ENV}) Successfully ---`);
  } catch (error) {
    console.error(error, `--- MongoDB Connection Failed (${process.env.NODE_ENV}) ---`);
  }
};

export default dbConnection;
