const Orders = require('../model/orderModel');
const Products = require('../model/productModel');
const { verifyToken, verifyEditor, verifyAdmin } = require('../utils/auth');

const orderRoute = require('express').Router();

//creating order
orderRoute.post('/order', verifyToken, async (req, res, next) => {
  try {
    const { shippingInfo, cart, total, user } = req.body;
    if (!shippingInfo || !cart || !user || !total) {
      res.status(401).json({ message: 'Please fill the requires fields' });
    }

    const order = new Orders({
      shippingInfo,
      cart,
      total,
      user,
    });
    const createdorder = await order.save();
    if (!order) {
      res.status(401).json({ message: 'Please fill the requires fields' });
    }

    res.status(200).json({ createdorder });

    cart.forEach(async (element) => {
      const product = await Products.findById({ _id: element.id });
      product.stock = product.stock - element.qty;
      await product.save();
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//updating order for users
orderRoute.put('/order/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!order) {
      res.status(201).json({ message: 'No order found' });
    } else {
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleting orders --admin
orderRoute.delete('/order/:id', verifyEditor, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findByIdAndDelete(id);
    if (!order) {
      res.status(400).json({ message: 'No order found' });
    } else {
      res.status(200).json({ message: 'Order Deleted Successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all orders --admin
orderRoute.get('/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get my order
orderRoute.get('/order/my', verifyToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const myorder = await Orders.find({ user: _id }).sort({ date: -1 });
    res.status(200).json(myorder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update order --admin
orderRoute.put('/order/admin/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Orders.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!order) {
      res.status(201).json({ message: 'No order found' });
    }
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//updating order status
orderRoute.put('/order/update/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Orders.findByIdAndUpdate(
      { _id: id },
      {
        status: status,
      },
      {
        new: true,
      }
    );
    if (!order) {
      res.status(400).json({ message: 'No order found' });
    } else {
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = orderRoute;
