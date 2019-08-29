if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Event = require('../../models/event')
const JWT_SECRET = process.env.JWT_SECRET

const { checkCurrentUser } = require('../../utils')

module.exports = {
  resolvers: {
    Query: {
      getOwnEvents: async (root, args, { currentUser }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'get own events')

          try {
            const userFromDB = await User.findOne({ username: currentUser.username })
            if (userFromDB) {
              try {
                const eventsFromDB = await Event.find({ owner: userFromDB._id })
                //console.log('Found events', eventsFromDB)
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
        }
      }
    },
    Mutation: {
      createEvent: async (root, args, { currentUser }) => {

        if (currentUser) {

          checkCurrentUser({ currentUser }, 'create an event')

          let userId = ''

          try {
            //console.log('Fishing out the user id from current user')
            decodedToken = await jwt.verify(
              currentUser.token, JWT_SECRET
            )
            //console.log('Decoded token is', decodedToken)
            userId = decodedToken.id
          } catch (error) {
            console.log('Something went wrong decoding token:')
            console.log(error.message)
            throw AuthenticationError(error.message)
          }

          if (userId && userId !== '') {

            try {

              const userFromDB = await User.findById(userId)
              if (userFromDB) {
                const newEvent = new Event({
                  eventname: args.eventname, description: args.description, publicevent: args.publicevent, owner: userId
                })
                const savedEvent = await newEvent.save().then(newEvent => newEvent.populate('owner', 'nickname').execPopulate())
                //console.log('Saved event is', savedEvent)

                userFromDB.events = userFromDB.events.concat(savedEvent.id)
                await userFromDB.save()

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

      }
    }
  }
}