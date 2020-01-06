const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const constants = require('../constants')

const eventShowSchema = new mongoose.Schema({
  showname: {
    type: String,
    required: true,
    minlength: constants.SHOWNAME_LENGTH
  },
  description: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  duration: {
    type: Number,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  },
  recurrence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence' 
  }
})

eventShowSchema.plugin(mongooseUniqueValidator)

const EventShow = mongoose.model('EventShow', eventShowSchema)

module.exports = EventShow