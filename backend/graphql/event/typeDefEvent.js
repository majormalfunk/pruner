const { gql } = require('apollo-server')

module.exports = {
  typeDef: gql`
    type User {
      nickname: String!
      id: ID!
    }
    type Event {
      eventname: String!
      description: String!
      publicevent: Boolean!
      owner: User!
      id: ID!
    }
    extend type Mutation {
      createEvent(
        eventname: String!
        description: String!
        publicevent: Boolean!
      ): Event
    }
  `
}