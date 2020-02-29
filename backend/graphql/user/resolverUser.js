if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const { UserInputError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const JWT_SECRET = process.env.JWT_SECRET

const { checkCurrentUser, checkCurrentUserIsCorrect } = require('../../utils')

module.exports = {
  resolvers: {
    Mutation: {
      createAccount: async (root, args) => {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.password, saltRounds)
        const trimmedUsername = args.username.trim()
        const trimmedNickname = args.nickname.trim()

        const user = new User({
          username: trimmedUsername,
          passwordHash: passwordHash,
          nickname: trimmedNickname
        })

        try {
          const savedUser = await user.save()
          const userForToken = {
            username: savedUser.username,
            id: savedUser._id,
          }

          const currentUser = {
            username: savedUser.username,
            nickname: savedUser.nickname,
            token: jwt.sign(userForToken, JWT_SECRET)
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
          throw new AuthenticationError("Wrong username or password")
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        const currentUser = {
          username: user.username,
          nickname: user.nickname,
          token: jwt.sign(userForToken, JWT_SECRET)
        }

        return currentUser
      },
      relogin: async (root, args, { currentUser, userId }) => {

        //console.log('Trying to relogin, got id', userId)

        try {
          let userFromDB = await User.findById(userId)

          const userForToken = {
            username: userFromDB.username,
            id: userFromDB._id,
          }

          const reloginUser = {
            username: userFromDB.username,
            nickname: userFromDB.nickname,
            token: jwt.sign(userForToken, JWT_SECRET)
          }

          return reloginUser
        } catch (error) {
          console.log(error.message)
          throw new AuthenticationError(error.message)
        }

      },
      updateNickname: async (root, args, { currentUser, userId }) => {

        checkCurrentUser({ currentUser }, 'update nickname')

        const userFromDB = await User.findById(userId)
        if (userFromDB) {
          userFromDB.nickname = args.nickname
          try {
            const savedUser = await userFromDB.save()
            const updatedUser = {
              username: savedUser.username,
              nickname: savedUser.nickname,
              token: currentUser.token
            }
            return updatedUser
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        } else {
          const message = `No such user ${currentUser.username}`
          console.log(message)
          throw new AuthenticationError(message)
        }

      },
      updatePassword: async (root, args, { currentUser, userId }) => {

        checkCurrentUser({ currentUser }, 'update password')

        const userFromDB = await User.findById(userId)
        //const user = await User.findOne({ username: args.username })
        const passwordCorrect =
          (userFromDB === null ? false : await bcrypt.compare(args.oldPassword, userFromDB.passwordHash))

        if (!(userFromDB && passwordCorrect)) {
          throw new UserInputError("Wrong username or password")
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.newPassword, saltRounds)

        if (userFromDB) {
          userFromDB.passwordHash = passwordHash
          try {
            const savedUser = await userFromDB.save()
            const updatedUser = {
              username: savedUser.username,
              nickname: savedUser.nickname,
              token: currentUser.token
            }
            return updatedUser
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        } else {
          const message = `No such user ${currentUser.username}`
          console.log(message)
          throw new AuthenticationError(message)
        }

      }
    }
  }
}