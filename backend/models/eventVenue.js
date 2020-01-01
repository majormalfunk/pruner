const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
//const autopopulate = require('mongoose-autopopulate')

const eventVenueSchema = new mongoose.Schema({
  venuename: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event' 
  }
})

eventVenueSchema.plugin(mongooseUniqueValidator)
//eventRecurrenceSchema.plugin(autopopulate)

const EventVenue = mongoose.model('EventVenue', eventVenueSchema)

module.exports = EventVenue