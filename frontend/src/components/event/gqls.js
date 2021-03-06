import { gql } from 'apollo-boost'

export const EVENT_DETAILS = gql`
  fragment EventDetails on Event {
    eventname
    description
    publicevent
    liveevent
    launched
    id
  }
`

export const RECURRENCE_DETAILS = gql`
  fragment RecurrenceDetails on EventRecurrence {
    recurrencename
    description
    publicrecurrence
    liverecurrence
    launched
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
    entries {
      showtime
      event
      recurrence
      venue {
        venuename
        event
        recurrence
        id
      }
      show {
        showname
        description
        link
        duration
        event
        recurrence
        id
      }
      id
    }
    event
    id
  }
`

export const VENUE_DETAILS = gql`
  fragment VenueDetails on EventVenue {
    venuename
    event
    recurrence
    id
  }
`

export const SHOW_DETAILS = gql`
  fragment ShowDetails on EventShow {
    showname
    description
    link
    duration
    event
    recurrence
    id
  }
`

export const ENTRY_DETAILS = gql`
  fragment EntryDetails on EventEntry {
    showtime
    event
    recurrence
    venue {
      venuename
      event
      recurrence
      id
    }
    show {
      showname
      description
      link
      duration
      event
      recurrence
      id
    }
    id
  }
`

export const OWNER_DETAILS = gql`
  fragment OwnerDetails on User {
    nickname
    id
  }
`

export const GET_AVAILABLE_EVENTS = gql`
  mutation getAvailableEvents($username: String) {
    getAvailableEvents(username: $username) {
      ...EventDetails
      recurrences { ...RecurrenceDetails }
      owner { ...OwnerDetails }
    }
  }
  ${EVENT_DETAILS}
  ${RECURRENCE_DETAILS}
  ${OWNER_DETAILS}
`

export const GET_OWN_EVENTS = gql`
  mutation getOwnEvents($username: String!) {
    getOwnEvents(username: $username) {
      ...EventDetails
      recurrences { ...RecurrenceDetails }
      owner { ...OwnerDetails }
    }
  }
  ${EVENT_DETAILS}
  ${RECURRENCE_DETAILS}
  ${OWNER_DETAILS}
`

export const CREATE_EVENT = gql`
  mutation createEvent(
    $eventname: String!, $description: String!,
    $publicevent: Boolean!, $liveevent: Boolean!) {
    createEvent(
      eventname: $eventname, description: $description,
      publicevent: $publicevent, liveevent: $liveevent) {
        ...EventDetails
        recurrences { ...RecurrenceDetails }
        owner { ...OwnerDetails }
    }
  }
  ${EVENT_DETAILS}
  ${RECURRENCE_DETAILS}
  ${OWNER_DETAILS}
`

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!, $eventname: String!, $description: String!,
    $publicevent: Boolean!, $liveevent: Boolean!, $launched: Boolean!) {
    updateEvent(
      id: $id, eventname: $eventname, description: $description,
      publicevent: $publicevent, liveevent: $liveevent, launched: $launched) {
        ...EventDetails
        recurrences { ...RecurrenceDetails }
        owner { ...OwnerDetails }
    }
  }
  ${EVENT_DETAILS}
  ${RECURRENCE_DETAILS}
  ${OWNER_DETAILS}
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`

export const LAUNCH_EVENT = gql`
  mutation launchEvent(
    $eventId: ID!, $recurrenceId: ID!) {
    launchEvent(
      id: $eventId, recurrenceId: $recurrenceId) {
        ...EventDetails
        recurrences { ...RecurrenceDetails }
        owner { ...OwnerDetails }
    }
  }
  ${EVENT_DETAILS}
  ${RECURRENCE_DETAILS}
  ${OWNER_DETAILS}
`

export const CREATE_EVENT_RECURRENCE = gql`
  mutation createEventRecurrence(
    $eventId: ID!, $recurrencename: String!, $description: String!,
    $publicrecurrence: Boolean!, $liverecurrence: Boolean!) {
    createEventRecurrence(
      eventId: $eventId, recurrencename: $recurrencename, description: $description,
      publicrecurrence: $publicrecurrence, liverecurrence: $liverecurrence) {
        ...RecurrenceDetails
    }
  }
  ${RECURRENCE_DETAILS}
`

export const UPDATE_EVENT_RECURRENCE = gql`
  mutation updateEventRecurrence(
    $id: ID!, $recurrencename: String!, $description: String!,
    $publicrecurrence: Boolean!, $liverecurrence: Boolean!, $launched: Boolean!) {
    updateEventRecurrence(
      id: $id, recurrencename: $recurrencename, description: $description,
      publicrecurrence: $publicrecurrence, liverecurrence: $liverecurrence, launched: $launched) {
        ...RecurrenceDetails
    }
  }
  ${RECURRENCE_DETAILS}
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
        ...VenueDetails
    }
  }
  ${VENUE_DETAILS}
`

export const UPDATE_EVENT_VENUE = gql`
  mutation updateEventVenue(
    $id: ID!, $venuename: String!) {
    updateEventVenue(
      id: $id, venuename: $venuename) {
        ...VenueDetails
    }
  }
  ${VENUE_DETAILS}
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
        ...ShowDetails
    }
  }
  ${SHOW_DETAILS}
`

export const UPDATE_EVENT_SHOW = gql`
  mutation updateEventShow(
    $id: ID!, $showname: String!, $description: String,
    $link: String, $duration: Int!) {
    updateEventShow(
      id: $id, showname: $showname description: $description,
      link: $link, duration: $duration) {
        ...ShowDetails
    }
  }
  ${SHOW_DETAILS}
`

export const DELETE_EVENT_SHOW = gql`
  mutation deleteEventShow($id: ID!) {
    deleteEventShow(id: $id)
  }
`

export const CREATE_EVENT_ENTRY = gql`
  mutation createEventEntry(
    $eventId: ID!, $recurrenceId: ID!, $venue: ID!, $show: ID! $showtimeint: Date!) {
    createEventEntry(
      eventId: $eventId, recurrenceId: $recurrenceId, venueId: $venue, showId: $show, showtime: $showtimeint) {
        ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`

export const UPDATE_EVENT_ENTRY = gql`
  mutation updateEventEntry(
    $id: ID!, $showtimeint: Date!) {
    updateEventEntry(
      id: $id, showtime: $showtimeint) {
        ...EntryDetails
    }
  }
  ${ENTRY_DETAILS}
`

export const DELETE_EVENT_ENTRY = gql`
  mutation deleteEventEntry($id: ID!) {
    deleteEventEntry(id: $id)
  }
`
