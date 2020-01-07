import { gql } from 'apollo-boost'

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
        recurrence
        id
      }
      shows {
        showname
        description
        link
        duration
        event
        recurrence
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
        recurrence
        id
      }
      shows {
        showname
        description
        link
        duration
        event
        recurrence
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
        recurrence
        id
      }
      shows {
        showname
        description
        link
        duration
        event
        recurrence
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
    $eventId: ID!, $recurrenceId: ID!, $venuename: String!) {
    createEventVenue(
      eventId: $eventId, recurrenceId: $recurrenceId, venuename: $venuename) {
      venuename
      event
      recurrence
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
      recurrence
      id
    }
  }
`

export const DELETE_EVENT_VENUE = gql`
  mutation deleteEventVenue($id: ID!) {
    deleteEventVenue(id: $id)
  }
`

export const CREATE_EVENT_SHOW = gql`
  mutation createEventShow(
    $eventId: ID!, $recurrenceId: ID!, $showname: String!, $description: String,
    $link: String, $duration: Int!) {
    createEventShow(
      eventId: $eventId, recurrenceId: $recurrenceId, showname: $showname, description: $description,
      link: $link, duration: $duration) {
      showname
      description
      link
      duration
      event
      recurrence
      id
    }
  }
`

export const UPDATE_EVENT_SHOW = gql`
  mutation updateEventShow(
    $id: ID!, $showname: String!, $description: String,
    $link: String, $duration: Int!) {
    updateEventShow(
      id: $id, showname: $showname description: $description,
      link: $link, duration: $duration) {
      showname
      description
      link
      duration
      event
      recurrence
      id
    }
  }
`

export const DELETE_EVENT_SHOW = gql`
  mutation deleteEventShow($id: ID!) {
    deleteEventShow(id: $id)
  }
`

export const CREATE_EVENT_ENTRY = gql`
  mutation createEventEntry(
    $eventId: ID!, $recurrenceId: ID!, $venueId: ID!, $showId: ID! $showtime: Date!) {
    createEventEntry(
      eventId: $eventId, recurrenceId: $recurrenceId, venueId: $venueId, showId: $showId, showtime: $showtime) {
      showtime
      event
      recurrence
      venue
      show
      id
    }
  }
`

export const UPDATE_EVENT_ENTRY = gql`
  mutation updateEventEntry(
    $id: ID!, $showtime: Date!) {
    updateEventEntry(
      id: $id, showtime: $showtime) {
      showtime
      event
      recurrence
      venue
      show
      id
    }
  }
`

export const DELETE_EVENT_ENTRY = gql`
  mutation deleteEventEntry($id: ID!) {
    deleteEventEntry(id: $id)
  }
`
