const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const orderRoute = require('./routes/orderRoute');

const app = express();
dotenv.config();

app.use(express.json({ limit: '10mb' }));

app.use(
  cors({
    origin: 'https://mernecommercewebsite-client.vercel.app',
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
app.use(bodyParser());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '10mb' }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongodb connected to server'))
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);

app.listen(process.env.PORT, () => {
  console.log('Server Running', process.env.PORT);
});
