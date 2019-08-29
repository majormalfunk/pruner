import { gql } from 'apollo-boost'

export const GET_OWN_EVENTS = gql`
  query getOwnEvents($token: String) {
    getOwnEvents(token: $token) {
      eventname
      description
      publicevent
      owner {
        nickname
        id
      }
      id
    }
  }
`

export const CREATE_EVENT = gql`
  mutation createEvent($eventname: String!, $description: String!, $publicevent: Boolean!) {
    createEvent(eventname: $eventname, description: $description, publicevent: $publicevent) {
      eventname
      description
      publicevent
      owner {
        nickname
        id
      }
      id
    }
  }
`
