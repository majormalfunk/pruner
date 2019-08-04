const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 8
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 6
  }
})

module.exports = mongoose.model('User', schema)