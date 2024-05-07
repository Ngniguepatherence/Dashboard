const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  
  // Define user model
  const User = mongoose.model('VVIMS', userSchema);

  module.exports = User;