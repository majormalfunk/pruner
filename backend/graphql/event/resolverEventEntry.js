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
      createEventEntry: async (root, args, { currentUser, userId }) => {

        //console.log('Trying to create an event entry')

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event entry')

          if (userId && userId !== '') {

            try {

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: args.recurrenceId })
              const venueFromDB = await EventVenue.findOne({ _id: args.venueId, recurrence: args.recurrenceId })
              const showFromDB = await EventShow.findOne({ _id: args.showId, recurrence: args.recurrenceId })

              let showtime = new Date(args.showtime)

              if (!eventToUpdate || !recurrenceToUpdate || !venueFromDB || !showFromDB || !showtime) {
                throw new UserInputError('Invelid parameters', { invalidArgs: args })
              }

              const newEntry = new EventEntry({
                showtime: showtime,
                event: args.eventId,
                recurrence: args.recurrenceId,
                venue: venueFromDB,
                show: showFromDB
              })
              const savedEntry = await newEntry.save()

              let newEntries = recurrenceToUpdate.entries.concat(savedEntry)

              let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                { _id: args.recurrenceId },
                {
                  $set: {
                    entries: newEntries
                  }
                },
                {
                  new: true
                }
              )
              //console.log('Saved entry', savedEntry)
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
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: entryToUpdate.recurrence })

              if (eventToUpdate && recurrenceToUpdate && entryToUpdate) {

                entryToUpdate.showtime = args.showtime

                const updatedEntry = await entryToUpdate.save()

                const newEntries = recurrenceToUpdate.entries.map((entry) => {
                  return (entry.id === args.id ? updatedEntry : entry)
                })

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      entries: newEntries
                    }
                  },
                  {
                    new: true
                  }
                )

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
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: entryToDelete.recurrence })

              if (eventToUpdate && recurrenceToUpdate && entryToDelete) {

                const result = await EventEntry.deleteOne(
                  { _id: args.id },
                )

                console.log('Delete count is', result.deletedCount)

                if (result.deletedCount === 0) {
                  return 0
                }
                const newEntries = recurrenceToUpdate.entries.filter(entry => entry.id !== args.id)

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      entries: newEntries
                    }
                  },
                  {
                    new: true
                  }
                )

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