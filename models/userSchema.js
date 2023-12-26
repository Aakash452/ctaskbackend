// Assuming you have a 'models' directory in your project
// Create a new file, e.g., 'userModel.js'

const mongoose = require('mongoose');

// Define the schema for the 'user' model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  
    trim: true, 
    lowercase: true, 
  },
  PhoneNumber:{
    type:Number,
    required:true,
  },
  password:{
    type:String,
    required:true
  }
});

// Create and export the 'User' model
const User = mongoose.model('User', userSchema);

module.exports = User;
