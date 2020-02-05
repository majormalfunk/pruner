const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')
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
  venues: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventVenue',
    autopopulate: {
      options: { sort: { 'venuename': 1 }},
      select: ['venuename', 'event', 'recurrence', '_id'] }
  }],
  shows: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventShow',
    autopopulate: {
      options: { sort: { 'showname': 1 }},
      select: ['showname', 'description', 'link', 'duration', 'event', 'recurrence', '_id'] }
  }],
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventEntry',
    autopopulate: {
      options: { sort: { 'showtime': 1 }},
      select: ['showtime', 'event', 'recurrence', 'venue', 'show', '_id'] }
  }],
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  }
})

eventRecurrenceSchema.plugin(mongooseUniqueValidator)
eventRecurrenceSchema.plugin(autopopulate)

const EventRecurrence = mongoose.model('EventRecurrence', eventRecurrenceSchema)

module.exports = EventRecurrence