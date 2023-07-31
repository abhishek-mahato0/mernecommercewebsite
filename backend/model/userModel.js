const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
  },
  password: {
    type: String,
    required: true,
    min: 7,
  },
  avatar: {
    type: String,
    required: true,
  },

  roles: {
    type: String,
    required: true,
    default: 'user',
  },
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;
