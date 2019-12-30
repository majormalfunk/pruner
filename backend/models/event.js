const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')

const eventSchema = new mongoose.Schema({
  eventname: {
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
  publicevent: {
    type: Boolean,
    required: true
  },
  liveevent: {
    type: Boolean,
    required: true
  },
  recurrences: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence',
    autopopulate: { select: [ 'recurrencename', 'description', 'publicrecurrence', 'liverecurrence', 'event', '_id'] }
  }],
  venues: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecurrenceVenue',
    autopopulate: { select: ['venuename', 'recurrence', '_id'] } }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { select: 'nickname' } 
  }
})

eventSchema.plugin(mongooseUniqueValidator)
eventSchema.plugin(autopopulate)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event