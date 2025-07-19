// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: String
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'], // no 'provider' role because admin creates providers
//     default: 'user'
//   }
// }, { timestamps: true });
// // Add inside userSchema
// userSchema.methods.matchPassword = function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };


// export default mongoose.model('User', userSchema);


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // not required for Google-auth users
  },
  googleId: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

// Match password method
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
