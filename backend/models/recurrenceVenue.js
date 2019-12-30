const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')
//const autopopulate = require('mongoose-autopopulate')

const recurrenceVenueSchema = new mongoose.Schema({
  venuename: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  recurrence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventRecurrence' 
  }
})

recurrenceVenueSchema.plugin(mongooseUniqueValidator)
//eventRecurrenceSchema.plugin(autopopulate)

const RecurrenceVenue = mongoose.model('RecurrenceVenue', recurrenceVenueSchema)

module.exports = RecurrenceVenue