if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} else {
  console.log("This is the production environment")
}
const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server-express')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

mongoose.set('useFindAndModify', false)

const DB_URL = process.env.DB_URL
const JWT_SECRET = process.env.JWT_SECRET

let urlToLog = `${DB_URL.substr(0, DB_URL.lastIndexOf(':'))}:*****${DB_URL.substr(DB_URL.indexOf('@'), DB_URL.length)}`
console.log('Connecting to', urlToLog, '...')

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to', urlToLog)
  })
  .catch((error) => {
    console.log('Error connecting to', urlToLog, ':', error.message)
  })

const typeDefs = gql`
  type CurrentUser {
    username: String!
    nickname: String!
    token: String!
  }
  type Token {
    value: String!
  }
  type Query {
    hello: CurrentUser
  }
  type Mutation {
    createAccount(
      username: String!
      password: String!
      nickname: String!
    ): CurrentUser
    login(
      username: String!
      password: String!
    ): CurrentUser
    updateNickname(
      username: String!
      nickname: String!
    ): CurrentUser
    relogin(
      token: String!
    ): CurrentUser
  }
`

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      console.log('Current user was resolved to:', context.currentUser.username)
      return context.currentUser
    }
  },
  Mutation: {
    createAccount: async (root, args) => {
      console.log('Mutation: createAccount was called')
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const trimmedUsername = args.username.trim()
      const trimmedNickname = args.nickname.trim()

      const user = new User({ username: trimmedUsername, passwordHash: passwordHash, nickname: trimmedNickname })

      try {
        const savedUser = await user.save()
        console.log('saved user id =', savedUser._id)
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
      console.log('****************************')
      console.log('Mutation: login was called')
      console.log('****************************')

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

      console.log('currentUser is', currentUser)
      console.log('args.username is', args.username)
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
          console.log('savedUser =', savedUser)
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
    relogin: async (root, args) => {
      console.log('****************************')
      console.log('Mutation: relogin was called')
      console.log('****************************')

      const decodedToken = jwt.verify(
        args.token, JWT_SECRET
      )
      const user = await User.findById(decodedToken.id)

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const CurrentUser = {
        username: user.username, nickname: user.nickname, token: jwt.sign(userForToken, JWT_SECRET)
      }

      return CurrentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: (process.env.NODE_ENV === 'development'),
  playground: (process.env.NODE_ENV === 'development'),
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    console.log("Auth is", auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      console.log('Next we try to decode it')
      let decodedToken = ''
      try {
        decodedToken = await jwt.verify(
          auth.substring(7), JWT_SECRET
        )
      } catch (error) {
        console.log('Something went wrong decoding token:')
        console.log(error.message)
        throw AuthenticationError(error.message)
      }
      //console.log('Decoded token =', decodedToken)
      const user = await User.findById(decodedToken.id)

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const currentUser = {
        username: user.username, nickname: user.nickname, token: jwt.sign(userForToken, JWT_SECRET)
      }

      console.log("Server says current user is", currentUser)

      return { currentUser }
    }
  }
})

app.use(cors())
app.use(express.static('build'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
server.applyMiddleware({
  path: '/graphql',
  app,
})
const port = (process.env.PORT || 4000)
app.listen({ port: port }, () => {
  console.log(`🚀 Server ready @ ${port}${server.graphqlPath}`);
})

