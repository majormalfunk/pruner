const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const autopopulate = require('mongoose-autopopulate')

const eventEntrySchema = new mongoose.Schema({
  showtime: {
    type: Date,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  },
  recurrence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence' 
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventVenue',
    autopopulate: { select: ['venuename', 'event', 'recurrence', '_id'] }
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventShow',
    autopopulate: { select: ['showname', 'description', 'link', 'duration', 'event', 'recurrence', '_id'] }
  }
})

eventEntrySchema.plugin(mongooseUniqueValidator)
eventEntrySchema.plugin(autopopulate)

const EventEntry = mongoose.model('EventEntry', eventEntrySchema)

module.exports = EventEntry