const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
const constants = require('../constants')

const eventVenueSchema = new mongoose.Schema({
  venuename: {
    type: String,
    required: true,
    minlength: constants.VENUENAME_LENGTH
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

eventVenueSchema.plugin(mongooseUniqueValidator)

const EventVenue = mongoose.model('EventVenue', eventVenueSchema)

module.exports = EventVenue