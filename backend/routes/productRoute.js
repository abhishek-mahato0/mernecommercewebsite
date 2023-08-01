const productRoute = require('express').Router();
const Product = require('../model/productModel');
const Users = require('../model/userModel');
const { verifyAdmin, verifyEditor, verifyToken } = require('../utils/auth');
const Multer = require('multer');
const cloudinary = require('cloudinary').v2;

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
//create prod
productRoute.post(
  '/products',
  verifyAdmin,
  upload.single('myfile'),
  async (req, res) => {
    try {
      const { name, price, desc, stock, category, rating } = req.body;
      if (!name || !price || !desc || !stock || !category || !rating) {
        res.status(400).json({ message: 'Please fill the requires fields' });
      } else {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });
        const date = new Date();
        const { url } = await cloudinary.uploader.upload(dataURI, {
          public_id: `${name}+ ${date.toString()}`,
          folder: 'mern-commerce/products/',
        });
        const product = new Product({
          name,
          price,
          desc,
          stock,
          category,
          rating,
          img: url,
          createdby: req.user._id,
        });
        const createdproduct = await product.save();
        if (!product) {
          res.status(400).json({ message: 'Please fill the requires fields' });
        }

        res.status(200).json(createdproduct);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//get all products --users
productRoute.get('/products', async (req, res) => {
  try {
    const { cat, val } = req.query;
    if (cat) {
      const product = await Product.find({
        category: { $regex: cat, $options: 'i' },
      });
      res.status(200).json(product);
    } else if (val) {
      const query = { $name: { $search: val.toLowerCase() } };
      const product = await Product.find({
        name: { $regex: val, $options: 'i' },
      });
      res.status(200).json(product);
    } else if (cat && val) {
      const product = await Product.find({
        $or: [
          { name: { $regex: val, $options: 'i' } },
          { category: { $regex: cat, $options: 'i' } },
        ],
      });
      res.status(200).json(product);
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

//get all prod admin
productRoute.get('/adminproducts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Users.findById({ _id: id });
    if (admin.roles === 'admin') {
      const products = await Product.find();
      res.status(200).json(products);
    } else {
      res.status(201).json({ message: 'You are not auhtenticated' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// single products
productRoute.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(201).json({ message: 'Product Not Found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete Product
productRoute.delete('/product/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(201).json({ message: 'Product Not Found' });
    }
    res.status(200).json({ message: 'Product Deleted Successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update Product
productRoute.put('/product/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      res.status(201).json({ message: 'Product Not Found' });
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//create and updating review
productRoute.put('/review/:id', verifyToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { comment, rating } = req.body;
    const user = await Users.findById(_id);
    const review = {
      user: _id,
      name: user.name,
      rating: rating,
      comment: comment,
    };
    const product = await Product.findById(id);
    let avg = 0;
    if (user && product) {
      const isreviewed = product.reviews.find(
        (x) => x.user.toString() == _id.toString()
      );
      if (isreviewed) {
        product.reviews.forEach(async (ele) => {
          if (ele.user.toString() == _id.toString()) {
            ele.rating = rating;
            ele.comment = comment;
            await product.reviews.forEach((ele) => (avg = avg + ele.rating));
            product.rating = avg / product.totalreviews;
          }
        });
      } else {
        await product.reviews.push(review);
        product.totalreviews = product.reviews.length;
        product.reviews.forEach((ele) => (avg = avg + ele.rating));
        product.rating = avg / product.totalreviews;
      }
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: 'No user and product found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///delete own review
productRoute.put('/delreview/:id', verifyToken, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const user = await Users.findById(_id);
    const product = await Product.findById(id);
    let avg = 0;
    if (user && product) {
      const review = product.reviews.filter(
        (ele) => ele.user.toString() != _id.toString()
      );
      const updatedprod = await Product.findByIdAndUpdate(
        id,
        {
          reviews: review,
        },
        {
          new: true,
        }
      );

      updatedprod.totalreviews = updatedprod.reviews.length;
      if (updatedprod.reviews.length > 0) {
        await updatedprod.reviews.forEach((ele) => (avg = avg + ele.rating));
        updatedprod.rating = avg / updatedprod.totalreviews;
        await updatedprod.save();
      } else {
        updatedprod.rating = 5;
        await updatedprod.save();
      }
      res.status(200).json(updatedprod);
    } else {
      res.status(400).json({ message: 'No user and product found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

productRoute.get('/getCat', async (req, res) => {
  try {
    const cat = await Product.find();
    if (cat) {
      let category = [];
      for (let i = 0; i < cat.length; i++) {
        if (category.includes(cat[i].category)) {
        } else {
          category.push(cat[i].category);
        }
      }
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = productRoute;
