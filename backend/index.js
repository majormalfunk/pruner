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
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const { typeDefs, resolvers } = require('./graphql')

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: (process.env.NODE_ENV === 'development'),
  playground: (process.env.NODE_ENV === 'development'),
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    //console.log("Auth is", auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
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

      const user = await User.findById(decodedToken.id)

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const currentUser = {
        username: user.username,
        nickname: user.nickname,
        token: jwt.sign(userForToken, JWT_SECRET)
      }

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

