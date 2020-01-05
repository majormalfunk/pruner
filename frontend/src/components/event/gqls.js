import { gql } from 'apollo-boost'

// eventrecurrences {
//   recurrencename
//   publicrecurrence
//   recurrencethings {
//     thingname
//     thingdescription
//     thinglink
//     thingduration
//     thingrecurrences {
//       startdatetime
//       thingvenue {
//         venuename
//       }
//     }
//   }
//   recurrencevenues {
//     venuename
//   }
// }

export const EVENT_RECURRENCE = gql`
  fragment EventRecurrences on CurrentUser {
    recurrences {
      recurrencename
      description
      publicrecurrence
      liverecurrence
    id
    }
  }
`

export const EVENT_DETAILS = gql`
  fragment EventDetails on CurrentUser {
    events {
      eventname
      description
      publicevent
      liveevent
      recurrences {
        recurrencename
        description
        publicrecurrence
        liverecurrence
        venues {
          venuename
          recurrence
          id
        }
        id
      }
      venues {
        venuename
        event
        id
      }
      owner {
        nickname
        id
      }
      id
    }
  }
`

export const GET_OWN_EVENTS = gql`
  mutation getOwnEvents($username: String!) {
    getOwnEvents(username: $username) {
      eventname
      description
      publicevent
      liveevent
      recurrences {
        recurrencename
        description
        publicrecurrence
        liverecurrence
        event
        id
      }
      venues {
        venuename
        event
        id
      }
      owner {
        nickname
        id
      }
      id
    }
  }
`

export const CREATE_EVENT = gql`
  mutation createEvent(
    $eventname: String!, $description: String!,
    $publicevent: Boolean!, $liveevent: Boolean!) {
    createEvent(
      eventname: $eventname, description: $description,
      publicevent: $publicevent, liveevent: $liveevent) {
      eventname
      description
      publicevent
      liveevent
      recurrences {
        recurrencename
        description
        publicrecurrence
        liverecurrence
        event
        id
      }
      venues {
        venuename
        event
        id
      }
      owner {
        nickname
        id
      }
      id
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!, $eventname: String!, $description: String!,
    $publicevent: Boolean!, $liveevent: Boolean!) {
    updateEvent(
      id: $id, eventname: $eventname, description: $description,
      publicevent: $publicevent, liveevent: $liveevent) {
      eventname
      description
      publicevent
      liveevent
      recurrences {
        recurrencename
        description
        publicrecurrence
        liverecurrence
        event
        id
      }
      venues {
        venuename
        event
        id
      }
      owner {
        nickname
        id
      }
      id
    }
  }
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`

export const CREATE_EVENT_RECURRENCE = gql`
  mutation createEventRecurrence(
    $eventId: ID!, $recurrencename: String!, $description: String!,
    $publicrecurrence: Boolean!, $liverecurrence: Boolean!) {
    createEventRecurrence(
      eventId: $eventId, recurrencename: $recurrencename, description: $description,
      publicrecurrence: $publicrecurrence, liverecurrence: $liverecurrence) {
      recurrencename
      description
      publicrecurrence
      liverecurrence
      event
      id
    }
  }
`

export const UPDATE_EVENT_RECURRENCE = gql`
  mutation updateEventRecurrence(
    $id: ID!, $recurrencename: String!, $description: String!,
    $publicrecurrence: Boolean!, $liverecurrence: Boolean!) {
    updateEventRecurrence(
      id: $id, recurrencename: $recurrencename, description: $description,
      publicrecurrence: $publicrecurrence, liverecurrence: $liverecurrence) {
      recurrencename
      description
      publicrecurrence
      liverecurrence
      event
      id
    }
  }
`

export const DELETE_EVENT_RECURRENCE = gql`
  mutation deleteEventRecurrence($id: ID!) {
    deleteEventRecurrence(id: $id)
  }
`

export const CREATE_EVENT_VENUE = gql`
  mutation createEventVenue(
    $eventId: ID!, $venuename: String!) {
    createEventVenue(
      eventId: $eventId, venuename: $venuename) {
      venuename
      event
      id
    }
  }
`

export const UPDATE_EVENT_VENUE = gql`
  mutation updateEventVenue(
    $id: ID!, $venuename: String!) {
    updateEventVenue(
      id: $id, venuename: $venuename) {
      venuename
      event
      id
    }
  }
`

export const DELETE_EVENT_VENUE = gql`
  mutation deleteEventVenue($id: ID!) {
    deleteEventVenue(id: $id)
  }
`
