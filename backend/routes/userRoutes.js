const userRoute = require('express').Router();
const Users = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { verifyToken, verifyEditor, verifyAdmin } = require('../utils/auth');
const Orders = require('../model/orderModel');
const Multer = require('multer');

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

userRoute.post('/register', upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please fill the requires fields' });
    }
    const exists = await Users.findOne({ email: email });
    const hashPassword = bcrypt.hashSync(password, 8);
    if (exists) {
      res.status(400).json({ message: 'Username already Exists' });
    } else {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const { url } = await cloudinary.uploader.upload(dataURI, {
        public_id: `${email}`,
        folder: 'mern-commerce/users/',
      });
      if (url) {
        const user = new Users({
          name: name,
          email: email,
          password: hashPassword,
          avatar: url,
        });
        if (!user) {
          res.status(400).json({ message: 'Please fill the requires fields' });
        } else {
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          const createduser = await user.save();
          const { password, ...others } = createduser._doc;
          res
            .cookie('token', token, {
              httpOnly: true,
              expires: new Date(Date.now() + 3000000),
            })
            .status(201)
            .json({ ...others });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Error Occured, please try again later' });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRoute.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Please fill the requires fields' });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Wrong Username or password' });
    } else {
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        res.status(400).json({ message: 'Wrong Username or password' });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        const { password, ...others } = user._doc;
        res
          .cookie('token', JSON.stringify(token), {
            // Options for the cookie
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            domain: 'https://mernecommercewebsite-backend.vercel.app',
            sameSite: 'None',
            path: '/',
          })
          .status(200)
          .json({ ...others });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all --users
userRoute.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//get individual user orders
userRoute.get('/induser/orders/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById({ _id: id });
    if (user) {
      const orders = await Orders.find();
      const order = orders.filter((x) => x.user == id);
      if (order) {
        res.status(200).json(order);
      }
    } else {
      res.status(200).json({ message: 'No Orders Placed by this user' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//get user by id
userRoute.get('/allusers', verifyAdmin, async (req, res) => {
  try {
    const user = await Users.find();
    if (!user) {
      res.status(201).json({ message: 'User Not Found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// single user
userRoute.get('/user/me', verifyToken, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await Users.findById(_id);
    if (!user) {
      res.status(201).json({ message: 'User Not Found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete user
userRoute.delete('/user', verifyToken, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await Users.findByIdAndDelete(_id);
    if (!user) {
      res.status(201).json({ message: 'Product Not Found' });
    } else {
      res.status(200).json({ message: 'User Deleted Successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update user
userRoute.put('/update', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { email, name, avatar, password } = req.body;
  try {
    const puser = await Users.findById(_id);
    if (!puser) {
      res.status(201).json({ message: 'user Not matched' });
    } else {
      const comparePassword = bcrypt.compareSync(password, puser.password);
      if (!comparePassword) {
        res.status(400).json({ message: 'Wrong Username or password' });
      } else {
        const user = await Users.findByIdAndUpdate(
          { _id: _id },
          {
            email: email,
            name: name,
            avatar: avatar,
          },
          {
            new: true,
          }
        );
        await user.save();
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//change password
userRoute.put('/changepassword', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { oldpassword, newpassword, confirmpassword } = req.body;
  try {
    if (newpassword !== confirmpassword) {
      res
        .status(401)
        .json({ message: 'new passowrd and cofirm password does not match' });
    } else {
      const user = await Users.findById(_id);
      if (!user) {
        res.status(201).json({ message: 'User Not Found' });
      }
      const comparepassword = await bcrypt.compareSync(
        oldpassword,
        user.password
      );
      if (!comparepassword) {
        res.status(401).json({ message: 'Wrong password' });
      } else {
        const hashPassword = await bcrypt.hashSync(newpassword, 8);
        const users = await Users.findByIdAndUpdate(
          _id,
          {
            password: hashPassword,
          },
          {
            new: true,
          }
        );
        const newUser = await users.save();
        res.status(200).json({ newUser });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//logout
userRoute.post('/logout', (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = userRoute;
