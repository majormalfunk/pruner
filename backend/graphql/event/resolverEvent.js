if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const User = require('../../models/user')
const Event = require('../../models/event')
const EventVenue = require('../../models/eventVenue') // DELETE THIS WHEN TEST DATA OK
const EventShow = require('../../models/eventShow') // DELETE THIS WHEN TEST DATA OK

const { checkCurrentUser, checkCurrentUserIsCorrect } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      getOwnEvents: async (root, args, { currentUser, userId }) => {

        //console.log('Trying to get own events for', args.username)

        if (currentUser) {

          checkCurrentUserIsCorrect({ currentUser }, args.username, 'get own events')

          try {
            if (userId) {
              try {
                const eventsFromDB = await Event.find({ owner: userId })
                //console.log('Found events', eventsFromDB)
                //console.log('With recurrs', eventsFromDB.recurrences)
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
                  recurrences: [],
                  venues: [],
                  shows: [],
                  entries: [],
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

          let shows = await EventShow.find({ event: args.id }) // DELETE THIS WHEN TEST DATA OK
          let venues = await EventVenue.find({ event: args.id }) // DELETE THIS WHEN TEST DATA OK

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
                    venues: venues, // DELETE THIS WHEN TEST DATA OK
                    shows: shows // DELETE THIS WHEN TEST DATA OK
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
      }
    }
  }
}