const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
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
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    autopopulate: { select: ['eventname', 'description', 'publicevent', 'recurrences'] } }]
})

userSchema.plugin(mongooseUniqueValidator)
userSchema.plugin(autopopulate)

const User = mongoose.model('User', userSchema)

module.exports = User