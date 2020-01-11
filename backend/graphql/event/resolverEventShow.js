if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const Event = require('../../models/event')
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

              const newShow = new EventShow({
                showname: args.showname,
                description: args.description,
                link: args.link,
                duration: args.duration,
                event: args.eventId,
                recurrence: args.recurrenceId
              })
              const savedShow = await newShow.save()

              let newShows = eventToUpdate.shows.concat(savedShow)

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.eventId, owner: userId },
                {
                  $set: {
                    shows: newShows
                  }
                },
                {
                  new: true
                }
              )

              console.log('Updated event is', updatedEvent)

              return savedShow
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

              if (eventToUpdate && showToUpdate) {

                showToUpdate.showname = args.showname
                showToUpdate.description = args.description
                showToUpdate.link = args.link
                showToUpdate.duration = args.duration

                const updatedShow = await showToUpdate.save()

                const newShows = eventToUpdate.shows.map((show) => {
                  return (show.id === args.id ? updatedShow : show)
                })

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      shows: newShows
                    }
                  },
                  {
                    new: true
                  }
                )
                console.log('Updated event is', updatedEvent)

                return updatedShow

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
      deleteEventShow: async (root, args, { currentUser, userId }) => {

        console.log('Deleting an event show')

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

              if (eventToUpdate && showToDelete) {

                const result = await EventShow.deleteOne(
                  { _id: args.id },
                )

                console.log('Delete count is', result.deletedCount)

                const newShows = eventToUpdate.shows.filter(show => show.id !== args.id)

                let updatedEvent = await Event.findOneAndUpdate(
                  { _id: eventToUpdate._id, owner: userId },
                  {
                    $set: {
                      shows: newShows
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