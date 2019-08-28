if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const jwt = require('jsonwebtoken')
const Event = require('../../models/event')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  resolvers: {
    Mutation: {
      createEvent: async (root, args, { currentUser }) => {

        if (!currentUser) {
          // The call has to have had a token and the username resolved from the token
          // must match the username in arguments i.e. only a logged in user can change
          // their own nickname
          console.log('Not logged in when trying to create event')
          throw new AuthenticationError('Authetication error while creating an event', {
            invalidArgs: args
          })
        }
  
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
            const newEvent = new Event({
              eventname: args.eventname, description: args.description, publicevent: args.publicevent, owner: userId
            })
            const savedEvent = await newEvent.save().then(newEvent => newEvent.populate('owner', 'nickname').execPopulate())
            //console.log('Saved event is', savedEvent)
            return savedEvent
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