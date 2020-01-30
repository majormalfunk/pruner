const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')
const constants = require('../constants')

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
    minlength: constants.EVENTNAME_LENGTH
  },
  description: {
    type: String,
    required: true,
    minlength: constants.DESCRIPTION_LENGTH
  },
  publicevent: {
    type: Boolean,
    required: true
  },
  liveevent: {
    type: Boolean,
    required: true
  },
  launched: {
    type: Boolean,
    required: true
  },
  recurrences: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence',
    autopopulate: {
      options: { sort: { 'recurrencename': 1 }},
      select: [ 'recurrencename', 'description', 'publicrecurrence', 'liverecurrence', 'launched', 'event', '_id'] }
  }],
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