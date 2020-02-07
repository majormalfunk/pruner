const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')
const constants = require('../constants')

const eventSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
    minlength: constants.EVENTNAME_LENGTH,
    index: true
  },
  description: {
    type: String,
    required: true,
    minlength: constants.DESCRIPTION_LENGTH
  },
  publicevent: {
    type: Boolean,
    required: true,
    index: true
  },
  liveevent: {
    type: Boolean,
    required: true,
    index: true
  },
  launched: {
    type: Boolean,
    required: true,
    index: true
  },
  recurrences: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence',
    autopopulate: {
      options: { sort: { 'recurrencename': 1 }},
      select: [ 'recurrencename', 'description', 'publicrecurrence', 'liverecurrence', 'launched', 'event', '_id'] }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { select: 'nickname' } 
  }
}, { autoIndex: true })

eventSchema.plugin(mongooseUniqueValidator)
eventSchema.plugin(autopopulate)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event