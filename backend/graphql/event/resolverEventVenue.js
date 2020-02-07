if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
const EventRecurrence = require('../../models/eventRecurrence')
const EventVenue = require('../../models/eventVenue')
const EventEntry = require('../../models/eventEntry')

const { checkCurrentUser } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      createEventVenue: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event venue')

          if (userId && userId !== '') {

            try {

              //console.log('Create venue for event', args.eventId)

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })
              //console.log('Event is', eventToUpdate)

              if (eventToUpdate && eventToUpdate !== null) {

                let recurrenceToUpdate = await EventRecurrence.findOne({ event: args.eventId, _id: args.recurrenceId })

                if (recurrenceToUpdate && recurrenceToUpdate !== null) {

                  const newVenue = new EventVenue({
                    venuename: args.venuename,
                    event: args.eventId,
                    recurrence: args.recurrenceId
                  })
                  const savedVenue = await newVenue.save()

                  let newVenues = recurrenceToUpdate.venues.concat(savedVenue)

                  let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                    { _id: args.recurrenceId },
                    {
                      $set: {
                        venues: newVenues
                      }
                    },
                    {
                      new: true
                    }
                  )

                  //console.log('Updated event is', updatedEvent)

                  return newVenue
                }

              }

              return null

            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }

          } else {
            throw AuthenticationError('Failure recognizing user.')
          }
        }

      },
      updateEventVenue: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event venue')

          if (userId && userId !== '') {

            try {

              let venueToUpdate = await EventVenue.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: venueToUpdate.event, owner: userId })
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: venueToUpdate.recurrence })

              if (eventToUpdate && venueToUpdate && recurrenceToUpdate) {

                venueToUpdate.venuename = args.venuename

                const updatedVenue = await venueToUpdate.save()

                const newVenues = recurrenceToUpdate.venues.map((venue) => {
                  return (venue.id === args.id ? updatedVenue : venue)
                })

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      venues: newVenues
                    }
                  },
                  {
                    new: true
                  }
                )

                return updatedVenue

              } else {

                throw new AuthenticationError('The event is not yours to update')

              }

            return null

            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }

          } else {
            throw AuthenticationError('Failure decoding token.')
          }
        }
      },
      deleteEventVenue: async (root, args, { currentUser, userId }) => {

        //console.log('Deleting an event venue')

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'delete an event venue')

          if (userId && userId !== '') {

            try {

              let entriesExist = await EventEntry.find({ venue: args.id })

              if (entriesExist && entriesExist.length > 0 ) {
                console.log('Not deleting. Venue', args.id, 'has', entriesExist.length, 'associated entries')
                return 0
              }

              let venueToDelete = await EventVenue.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: venueToDelete.event, owner: userId })
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: venueToDelete.recurrence })

              if (eventToUpdate && recurrenceToUpdate && venueToDelete) {

                const result = await EventVenue.deleteOne(
                  { _id: args.id },
                )

                //console.log('Delete count is', result.deletedCount)

                if (result.deletedCount === 0) {
                  return 0
                }

                const newVenues = recurrenceToUpdate.venues.filter(venue => venue.id !== args.id)

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      venues: newVenues
                    }
                  },
                  {
                    new: true
                  }
                )
                //console.log('Updated event is', updatedEvent)

                return result.deletedCount

              } else {

                throw new AuthenticationError('The event is not yours to update')

              }
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }

          } else {
            throw AuthenticationError('Failure decoding token.')
          }
        }
      }
    }
  }
}