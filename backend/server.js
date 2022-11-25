// eiVmQGZT5xa4Ta0O
// nurlan

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import userRouter from './routes/userRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';
import path from 'path';
dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to db'))
.catch((err) => console.log('Something went wrong', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')))


app.get(
  '/api/hello',
  expressAsyncHandler(async (req, res) => {
    res.send({ hello: 'hello' });
  })
);

const port = 5000;
app.listen(port, () => {
  console.log('Server is working at port' + port);
});
