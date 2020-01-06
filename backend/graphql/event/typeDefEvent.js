const { gql } = require('apollo-server')

module.exports = {
  typeDef: gql`
    type User {
      nickname: String!
      id: ID!
    }
    type EventShow {
      showname: String!
      description: String!
      link: String
      duration: Int!
      event: ID!
      recurrence: ID!
      id: ID!
    }
    type EventVenue {
      venuename: String!
      event: ID!
      recurrence: ID!
      id: ID!
    }
    type EventRecurrence {
      recurrencename: String!
      description: String!
      publicrecurrence: Boolean!
      liverecurrence: Boolean!
      event: ID!
      id: ID!
    }
    type Event {
      eventname: String!
      description: String!
      publicevent: Boolean!
      liveevent: Boolean!
      recurrences: [EventRecurrence]
      venues: [EventVenue]
      shows: [EventShow]
      owner: User!
      id: ID!
    }
    extend type Mutation {
      getOwnEvents(
        username: String!
      ): [Event]
    }
    extend type Mutation {
      createEvent(
        eventname: String!
        description: String!
        publicevent: Boolean!
        liveevent: Boolean!
        ): Event
    }
    extend type Mutation {
      updateEvent(
        id: ID!
        eventname: String!
        description: String!
        publicevent: Boolean!
        liveevent: Boolean!
        ): Event
    }
    extend type Mutation {
      deleteEvent(
        id: ID!
      ): Int!
    }
    extend type Mutation {
      createEventRecurrence(
        eventId: ID!
        recurrencename: String!
        description: String!
        publicrecurrence: Boolean!
        liverecurrence: Boolean!
        ): EventRecurrence
    }
    extend type Mutation {
      updateEventRecurrence(
        id: ID!
        recurrencename: String!
        description: String!
        publicrecurrence: Boolean!
        liverecurrence: Boolean!
        ): EventRecurrence
    }
    extend type Mutation {
      deleteEventRecurrence(
        id: ID!
        ): Int!
    }
    extend type Mutation {
      createEventVenue(
        eventId: ID!
        recurrenceId: ID!
        venuename: String!
        ): EventVenue
    }
    extend type Mutation {
      updateEventVenue(
        id: ID!
        venuename: String!
        ): EventVenue
    }
    extend type Mutation {
      deleteEventVenue(
        id: ID!
        ): Int!
    }
    extend type Mutation {
      createEventShow(
        eventId: ID!
        recurrenceId: ID!
        showname: String!
        description: String
        link: String
        duration: Int!
        ): EventShow
    }
    extend type Mutation {
      updateEventShow(
        id: ID!
        showname: String!
        description: String
        link: String
        duration: Int!
        ): EventShow
    }
    extend type Mutation {
      deleteEventShow(
        id: ID!
        ): Int!
    }
  `
}