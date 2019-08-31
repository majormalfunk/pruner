const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
//const autopopulate = require('mongoose-autopopulate')

const eventRecurrenceSchema = new mongoose.Schema({
  recurrencename: {
    type: String,
    required: true,
    unique: true,
    minlength: 10
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  publicrecurrence: {
    type: Boolean,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  }
})

eventRecurrenceSchema.plugin(mongooseUniqueValidator)
//eventRecurrenceSchema.plugin(autopopulate)

const EventRecurrence = mongoose.model('EventRecurrence', eventRecurrenceSchema)

module.exports = EventRecurrence