if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
const EventEntry = require('../../models/eventEntry')

const { checkCurrentUser } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      createEventEntry: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event entry')

          if (userId && userId !== '') {

            try {

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })

              const newEntry = new EventEntry({
                showtime: args.showtime,
                event: args.eventId,
                recurrence: args.recurrenceId,
                venue: args.venueId,
                show: args.showId
              })
              const savedEntry = await newEntry.save()

              let newEntries = eventToUpdate.entries.concat(savedEntry)

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.eventId, owner: userId },
                {
                  $set: {
                    entries: newEntries
                  }
                },
                {
                  new: true
                }
              )

              console.log('Updated event is', updatedEvent)

              return savedEntry
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
      updateEventEntry: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event entry')

          if (userId && userId !== '') {

            try {

              let entryToUpdate = await EventEntry.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: entryToUpdate.event, owner: userId })

              if (eventToUpdate && entryToUpdate) {

                entryToUpdate.showtime = args.showtime

                const updatedEntry = await entryToUpdate.save()

                const newEntries = eventToUpdate.entries.map((entry) => {
                  return (entry.id === args.id ? updatedEntry : entry)
                })

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      entries: newEntries
                    }
                  },
                  {
                    new: true
                  }
                )
                console.log('Updated event is', updatedEvent)

                return updatedEntry

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
      deleteEventEntry: async (root, args, { currentUser, userId }) => {

        console.log('Deleting an event entry')

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'delete an event entry')

          if (userId && userId !== '') {

            try {

              let entryToDelete = await EventEntry.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: entryToDelete.event, owner: userId })

              if (eventToUpdate && entryToDelete) {

                const result = await EventEntry.deleteOne(
                  { _id: args.id },
                )

                console.log('Delete count is', result.deletedCount)

                const newEntries = eventToUpdate.entries.filter(entry => entry.id !== args.id)

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      entries: newEntries
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