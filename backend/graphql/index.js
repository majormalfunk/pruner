const { gql } = require('apollo-server')
const { merge } = require('lodash')

// TYPEDEFS
const { typeDef: typeDefForUser } = require('./user/typeDefUser')
const { typeDef: typeDefForEvent } = require('./event/typeDefEvent')

const Query = gql`
  type Query {
    _empty: String
  }
`
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`
const typeDefs = [
  Query,
  Mutation,
  typeDefForUser,
  typeDefForEvent
]

// RESOLVERS
const { resolvers: resolverForUser } = require('./user/resolverUser')
const { resolvers: resolverForEvent } = require('./event/resolverEvent')

const resolvers = merge(
  resolverForUser,
  resolverForEvent
)

module.exports = {
  typeDefs, resolvers
}