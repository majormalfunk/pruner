if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
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

              console.log('Create venue for event', args.eventId)

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })
              console.log('Event is', eventToUpdate)

              if (eventToUpdate && eventToUpdate !== null) {

                const newVenue = new EventVenue({
                  venuename: args.venuename,
                  event: args.eventId,
                  recurrence: args.recurrenceId
                })
                const savedVenue = await newVenue.save()

                let newVenues = eventToUpdate.venues.concat(savedVenue)

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: args.eventId },
                  {
                    $set: {
                      venues: newVenues
                    }
                  },
                  {
                    new: true
                  }
                )

                console.log('Updated event is', updatedEvent)

                return newVenue
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

              if (eventToUpdate && venueToUpdate) {

                venueToUpdate.venuename = args.venuename

                const updatedVenue = await venueToUpdate.save()

                const newVenues = eventToUpdate.venues.map((venue) => {
                  return (venue.id === args.id ? updatedVenue : venue)
                })

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      venues: newVenues
                    }
                  },
                  {
                    new: true
                  }
                )
                console.log('Updated event is', updatedEvent)

                return updatedVenue

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
      },
      deleteEventVenue: async (root, args, { currentUser, userId }) => {

        console.log('Deleting an event venue')

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

              if (eventToUpdate && venueToDelete) {

                const result = await EventVenue.deleteOne(
                  { _id: args.id },
                )

                console.log('Delete count is', result.deletedCount)

                const newVenues = eventToUpdate.venues.filter(venue => venue.id !== args.id)

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      venues: newVenues
                    }
                  },
                  {
                    new: true
                  }
                )
                console.log('Updated event is', updatedEvent)

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