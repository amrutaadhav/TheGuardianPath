const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  completedModules: {
    type: [String],
    default: [],
  },
  scores: {
    type: Map,
    of: Number,
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
