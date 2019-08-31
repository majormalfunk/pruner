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
      recurrences {
        recurrencename
        description
        publicrecurrence
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
      recurrences {
        recurrencename
        description
        publicrecurrence
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
