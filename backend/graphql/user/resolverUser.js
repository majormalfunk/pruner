if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  resolvers: {
    Query: {
      relogin: async (root, args, { currentUser }) => {
        return currentUser
      }
    },
    Mutation: {
      createAccount: async (root, args) => {
  
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.password, saltRounds)
        const trimmedUsername = args.username.trim()
        const trimmedNickname = args.nickname.trim()
  
        const user = new User({ username: trimmedUsername, passwordHash: passwordHash, nickname: trimmedNickname })
  
        try {
          const savedUser = await user.save()
          const userForToken = {
            username: savedUser.username,
            id: savedUser._id,
          }
  
          const currentUser = {
            username: savedUser.username, nickname: savedUser.nickname, token: jwt.sign(userForToken, JWT_SECRET)
          }
  
          return currentUser
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
  
      },
      login: async (root, args) => {
  
        const user = await User.findOne({ username: args.username })
        const passwordCorrect = (user === null ? false : await bcrypt.compare(args.password, user.passwordHash))
  
        if (!(user && passwordCorrect)) {
          throw new UserInputError("Wrong username or password")
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        const currentUser = {
          username: user.username, nickname: user.nickname, token: jwt.sign(userForToken, JWT_SECRET)
        }

        return currentUser
      },
      updateNickname: async (root, args, { currentUser }) => {
  
        if (!currentUser || currentUser.username !== args.username) {
          // The call has to have had a token and the username resolved from the token
          // must match the username in arguments i.e. only a logged in user can change
          // only their own nickname
          console.log('Authentication error in updateNickname')
          throw new AuthenticationError('Authetication error while changing the nickname', {
            invalidArgs: args
          })
        }
  
        const userFromDB = await User.findOne({ username: args.username })
        if (userFromDB) {
          userFromDB.nickname = args.nickname
          try {
            const savedUser = await userFromDB.save()
            const updatedUser = {
              username: savedUser.username, nickname: savedUser.nickname, token: currentUser.token
            }
            return updatedUser
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        } else {
          console.log('No such user:', args.username)
          return null
        }
  
      },
      updatePassword: async (root, args, { currentUser }) => {
  
        if (!currentUser || currentUser.username !== args.username) {
          // The call has to have had a token and the username resolved from the token
          // must match the username in arguments i.e. only a logged in user can change
          // their own nickname
          console.log('Authentication error in updatePassword')
          throw new AuthenticationError('Authetication error while changing the nickname', {
            invalidArgs: args
          })
        }
  
        const user = await User.findOne({ username: args.username })
        const passwordCorrect = (user === null ? false : await bcrypt.compare(args.oldPassword, user.passwordHash))
  
        if (!(user && passwordCorrect)) {
          throw new UserInputError("Wrong username or password")
        }
  
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.newPassword, saltRounds)
  
        if (user) {
          user.passwordHash = passwordHash
          try {
            const savedUser = await user.save()
            const updatedUser = {
              username: savedUser.username, nickname: savedUser.nickname, token: currentUser.token
            }
            return updatedUser
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        } else {
          console.log('No such user:', args.username)
          return null
        }
  
      }
    }
  }
}