if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
const EventRecurrence = require('../../models/eventRecurrence')
const EventShow = require('../../models/eventShow')
const EventEntry = require('../../models/eventEntry')

const { checkCurrentUser } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      createEventShow: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event show')

          if (userId && userId !== '') {

            try {

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })

              if (eventToUpdate && eventToUpdate !== null) {

                let recurrenceToUpdate = await EventRecurrence.findOne({ event: args.eventId, _id: args.recurrenceId })

                if (recurrenceToUpdate && recurrenceToUpdate !== null) {

                  const newShow = new EventShow({
                    showname: args.showname,
                    description: args.description,
                    link: args.link,
                    duration: args.duration,
                    event: args.eventId,
                    recurrence: args.recurrenceId
                  })
                  const savedShow = await newShow.save()

                  let newShows = recurrenceToUpdate.shows.concat(savedShow)

                  let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                    { _id: args.recurrenceId },
                    {
                      $set: {
                        shows: newShows
                      }
                    },
                    {
                      new: true
                    }
                  )

              //console.log('Updated event is', updatedEvent)

                  return savedShow

                }
              }

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
      updateEventShow: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event show')

          if (userId && userId !== '') {

            try {

              let showToUpdate = await EventShow.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: showToUpdate.event, owner: userId })
              let recurrenceToUpdate = await EventRecurrence.findOne({ recurrence: showToUpdate.recurrence })

              if (eventToUpdate && showToUpdate && recurrenceToUpdate) {

                showToUpdate.showname = args.showname
                showToUpdate.description = args.description
                showToUpdate.link = args.link
                showToUpdate.duration = args.duration

                const updatedShow = await showToUpdate.save()

                const newShows = recurrenceToUpdate.shows.map((show) => {
                  return (show.id === args.id ? updatedShow : show)
                })

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      shows: newShows
                    }
                  },
                  {
                    new: true
                  }
                )

                return updatedShow

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
      deleteEventShow: async (root, args, { currentUser, userId }) => {

        //console.log('Deleting an event show')

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'delete an event show')

          if (userId && userId !== '') {

            try {

              let entriesExist = await EventEntry.find({ show: args.id })

              if (entriesExist && entriesExist.length > 0 ) {
                console.log('Not deleting. Show', args.id, 'has', entriesExist.length, 'associated entries')
                return 0
              }

              let showToDelete = await EventShow.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: showToDelete.event, owner: userId })
              let recurrenceToUpdate = await EventRecurrence.findOne({ _id: showToDelete.recurrence })

              if (eventToUpdate && recurrenceToUpdate && showToDelete) {

                const result = await EventShow.deleteOne(
                  { _id: args.id },
                )

                //console.log('Delete count is', result.deletedCount)

                if (result.deletedCount === 0) {
                  return 0
                }

                const newShows = recurrenceToUpdate.shows.filter(show => show.id !== args.id)

                let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                  { _id: recurrenceToUpdate._id },
                  {
                    $set: {
                      shows: newShows
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