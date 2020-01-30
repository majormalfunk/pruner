if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
const EventRecurrence = require('../../models/eventRecurrence')
const EventVenue = require('../../models/eventVenue')
const EventShow = require('../../models/eventShow')
const EventEntry = require('../../models/eventEntry')

const { checkCurrentUser } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      createEventRecurrence: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event recurrence')

          if (userId && userId !== '') {

            try {

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })

              const newRecurrence = new EventRecurrence({
                recurrencename: args.recurrencename,
                description: args.description,
                publicrecurrence: args.publicrecurrence,
                liverecurrence: args.liverecurrence,
                launched: false,
                event: args.eventId
              })
              const savedRecurrence = await newRecurrence.save()

              let newRecurrences = eventToUpdate.recurrences.concat(savedRecurrence)

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.eventId, owner: userId },
                {
                  $set: {
                    recurrences: newRecurrences
                  }
                },
                {
                  new: true
                }
              )

              //console.log('Updated event is', updatedEvent)

              return savedRecurrence
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
      updateEventRecurrence: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event recurrence')

          if (userId && userId !== '') {

            try {

              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: recurrenceToUpdate.event, owner: userId })

              if (eventToUpdate && recurrenceToUpdate) {

                recurrenceToUpdate.recurrencename = args.recurrencename
                recurrenceToUpdate.description = args.description
                recurrenceToUpdate.publicrecurrence = args.publicrecurrence
                recurrenceToUpdate.liverecurrence = args.liverecurrence
                recurrenceToUpdate.launched = args.launched

                const updatedRecurrence = await recurrenceToUpdate.save()

                const newRecurrences = eventToUpdate.recurrences.map((recurrence) => {
                  return (recurrence.id === args.id ? updatedRecurrence : recurrence)
                })

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      recurrences: newRecurrences
                    }
                  },
                  {
                    new: true
                  }
                )
                //console.log('Updated event is', updatedEvent)

                return updatedRecurrence

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
      deleteEventRecurrence: async (root, args, { currentUser, userId }) => {

        console.log('Deleting an event recurrence')

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'delete an event recurrence')

          if (userId && userId !== '') {

            try {

              let venuesExist = await EventVenue.find({ recurrence: args.id })

              if (venuesExist && venuesExist.length > 0 ) {
                console.log('Not deleting. Recurrence', args.id, 'has', venuesExist.length, 'associated venues')
                return 0
              }

              let showsExist = await EventShow.find({ recurrence: args.id })

              if (showsExist && showsExist.length > 0 ) {
                console.log('Not deleting. Recurrence', args.id, 'has', showsExist.length, 'associated shows')
                return 0
              }

              let entriesExist = await EventEntry.find({ recurrence: args.id })

              if (entriesExist && entriesExist.length > 0 ) {
                console.log('Not deleting. Recurrence', args.id, 'has', entriesExist.length, 'associated entries')
                return 0
              }

              let recurrenceToDelete = await EventRecurrence.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: recurrenceToDelete.event, owner: userId })

              if (eventToUpdate && recurrenceToDelete) {

                const result = await EventRecurrence.deleteOne(
                  { _id: args.id },
                )

                //console.log('Delete count is', result.deletedCount)

                const newRecurrences = eventToUpdate.recurrences.filter(recurrence => recurrence.id !== args.id)

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      recurrences: newRecurrences
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