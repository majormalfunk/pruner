if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const User = require('../../models/user')
const Event = require('../../models/event')
const EventRecurrence = require('../../models/eventRecurrence')

const { checkCurrentUser, checkCurrentUserIsCorrect } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      getAvailableEvents: async (root, args, { currentUser, userId }) => {

        try {
          try {
            const eventsFromDB = await Event.find({ liveevent: true, launched: true }).
              or([{ owner: userId }, { publicevent: true }]).
              sort({ eventname: 1 })
            return eventsFromDB
          } catch (error) {
            console.log('Error trying to get own events from database')
            throw error
          }
        } catch (error) {
          console.log('Error getting current user from database')
          console.log(error)
          throw error
        }


      },
      getOwnEvents: async (root, args, { currentUser, userId }) => {

        //console.log('Trying to get own events for', args.username)

        if (currentUser) {

          checkCurrentUserIsCorrect({ currentUser }, args.username, 'get own events')

          try {
            if (userId) {
              try {
                const eventsFromDB = await Event.find({ owner: userId }).
                  sort({ eventname: 1 })
                return eventsFromDB
              } catch (error) {
                console.log('Error trying to get own events from database')
                throw error
              }
            } else {
              console.log('No such user:', currentUser.username)
              return null
            }
          } catch (error) {
            console.log('Error getting current user from database')
            console.log(error)
            throw error
          }

        } else {

          console.log('No current user in request. This shouldnt happen.')
          console.log('Something wrong in the frontend state.')
          throw new AuthenticationError('Token was not in request for own events when one was expected')

        }

      },
      createEvent: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event')

          if (userId && userId !== '') {

            try {

              const userFromDB = await User.findById(userId)
              if (userFromDB) {
                const newEvent = new Event({
                  eventname: args.eventname,
                  description: args.description,
                  publicevent: args.publicevent,
                  liveevent: args.liveevent,
                  launched: false,
                  recurrences: [],
                  owner: userId
                })
                const savedEvent = await newEvent.save().then(newEvent => newEvent.populate('owner', 'nickname').execPopulate())

                return savedEvent
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
      updateEvent: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event')

          if (userId && userId !== '') {

            try {

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.id, owner: userId },
                {
                  $set: {
                    eventname: args.eventname,
                    description: args.description,
                    publicevent: args.publicevent,
                    liveevent: args.liveevent,
                    launched: args.launched,
                  }
                },
                {
                  new: true
                }
              )

              //console.log('Updated event is', updatedEvent)

              return updatedEvent
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
      deleteEvent: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'delete an event')

          if (userId && userId !== '') {

            try {

              let recurrencesExist = await EventRecurrence.find({ event: args.id })

              if (recurrencesExist && recurrencesExist.length > 0 ) {
                // Should probably throw an error and tell the user why can't delete
                console.log('Not deleting. Event', args.id, 'has', recurrencesExist.length, 'recurrences.')
                return 0
              }

              const result = await Event.deleteOne(
                { _id: args.id, owner: userId },
              )

              //console.log('Delete count is', result.deletedCount)

              return result.deletedCount
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
      launchEvent: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'update an event')

          if (userId && userId !== '') {

            try {

              let eventToLaunch = await Event.findOne({ _id: args.id, owner: userId })
              let recurrenceToLaunch = await EventRecurrence.findOne({ _id: args.recurrenceId, event: args.id })

              if (!eventToLaunch || !recurrenceToLaunch) {
                throw new UserInputError('Invelid parameters', { invalidArgs: args })
              }

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.id, owner: userId },
                {
                  $set: {
                    launched: true
                  }
                },
                {
                  new: true
                }
              )
              let updatedRecurrence = await EventRecurrence.findOneAndUpdate(
                { _id: args.recurrenceId, event: args.id },
                {
                  $set: {
                    launched: true
                  }
                },
                {
                  new: true
                }
              )
              //console.log('Updated event is', updatedEvent)

              return updatedEvent
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