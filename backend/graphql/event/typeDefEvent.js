const { gql } = require('apollo-server')

module.exports = {
  typeDef: gql`
    type User {
      nickname: String!
      id: ID!
    }
    type EventRecurrence {
      recurrencename: String!
      description: String!
      publicrecurrence: Boolean!
      id: ID!
    }
    type Event {
      eventname: String!
      description: String!
      publicevent: Boolean!
      recurrences: [EventRecurrence]
      owner: User!
      id: ID!
    }
    extend type Query {
      getOwnEvents(token: String): [Event]
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