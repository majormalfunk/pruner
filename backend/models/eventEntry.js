const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

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
    ref: 'EventVenue' 
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventShow' 
  }
})

eventEntrySchema.plugin(mongooseUniqueValidator)

const EventEntry = mongoose.model('EventEntry', eventEntrySchema)

module.exports = EventEntry