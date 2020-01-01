if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Event = require('../../models/event')
const EventRecurrence = require('../../models/eventRecurrence')
const EventVenue = require('../../models/eventVenue')
const JWT_SECRET = process.env.JWT_SECRET

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
                console.log('Found events', eventsFromDB)
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
                    liveevent: args.liveevent
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

      },
      createEventRecurrence: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event recurrence')

          if (userId && userId !== '') {

            try {

              let eventToUpdate = await Event.findOne({ _id: args.id, owner: userId })

              const newRecurrence = new EventRecurrence({
                recurrencename: args.recurrencename,
                description: args.description,
                publicrecurrence: args.publicrecurrence,
                liverecurrence: args.liverecurrence,
                venues: [],
                event: args.id
              })
              const savedRecurrence = await newRecurrence.save()

              let newRecurrences = eventToUpdate.recurrences.concat(savedRecurrence)

              let updatedEvent = await Event.findOneAndUpdate(
                { _id: args.id, owner: userId },
                {
                  $set: {
                    recurrences: newRecurrences
                  }
                },
                {
                  new: true
                }
              )

              console.log('Updated event is', updatedEvent)

              return updatedEvent
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

                const updatedRecurrence = await recurrenceToUpdate.save()

                const updatedEvent = await Event.findOne({ _id: eventToUpdate._id })

                //console.log('Updated event is', updatedEvent)

                return updatedEvent

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

              let recurrenceToDelete = await EventRecurrence.findOne({ _id: args.id })
              let eventToUpdate = await Event.findOne({ _id: recurrenceToDelete.event, owner: userId })

              if (eventToUpdate && recurrenceToDelete) {

                const result = await EventRecurrence.deleteOne(
                  { _id: args.id },
                )

                console.log('Delete count is', result.deletedCount)

                const updatedEvent = await Event.findOne({ _id: eventToUpdate._id })

                return updatedEvent

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
      createEventVenue: async (root, args, { currentUser, userId }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create a recurrence venue')

          if (userId && userId !== '') {

            try {

              console.log('Create venue for event', args.eventId)

              let eventToUpdate = await Event.findOne({ _id: args.eventId, owner: userId })
              console.log('Event is', eventToUpdate)

              if (eventToUpdate && eventToUpdate !== null) {

                const newVenue = new EventVenue({
                  venuename: args.venuename,
                  event: args.eventId
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

      }
    }
  }
}