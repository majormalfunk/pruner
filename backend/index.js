if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
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
  type User {
    username: String!
    passwordHash: String!
    nickname: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    me: User
  }
  type Mutation {
    createAccount(
      username: String!
      password: String!
      nickname: String!
    ): Token
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createAccount: async (root, args) => {

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({ username: args.username, passwordHash: passwordHash, nickname: args.nickname })

      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
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

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

app.use(cors())
app.use(express.static('public'))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  playground: false,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.applyMiddleware({
  path: '/graphql',
  app,
})
const port = (process.env.PORT || 4000)
app.listen({ port: port }, () => {
  console.log(`🚀 Server ready @ ${port}${server.graphqlPath}`);
})
