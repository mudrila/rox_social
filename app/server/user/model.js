const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  creationTime: {
    type: Date,
    required: true
  },
  avatarSrc: {
    type: String,
    trim: true
  }
});
let User = mongoose.model('User', UserSchema);
module.exports = User;
