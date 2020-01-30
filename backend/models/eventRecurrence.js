const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const constants = require('../constants')

const eventRecurrenceSchema = new mongoose.Schema({
  recurrencename: {
    type: String,
    required: true,
    minlength: constants.RECURRENCENAME_LENGTH
  },
  description: {
    type: String,
    required: true,
    minlength: constants.DESCRIPTION_LENGTH
  },
  publicrecurrence: {
    type: Boolean,
    required: true
  },
  liverecurrence: {
    type: Boolean,
    required: true
  },
  launched: {
    type: Boolean,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  }
})

eventRecurrenceSchema.plugin(mongooseUniqueValidator)

const EventRecurrence = mongoose.model('EventRecurrence', eventRecurrenceSchema)

module.exports = EventRecurrence