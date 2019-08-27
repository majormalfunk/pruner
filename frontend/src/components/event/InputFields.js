import React from 'react'
import { Form } from 'react-bootstrap'

export const EventnameField = (props) => {
  return (
    <>
      <Form.Label>Eventname</Form.Label>
      <Form.Control type="text" required placeholder="Event name" name="eventnameField" id={props.seteventname}
        defaultValue={props.eventname} onChange={props.trigger} disabled={props.disabled} />
      <Form.Text className="text-muted" id={props.eventnamehint}></Form.Text>
    </>
  )
}

export const DescriptionField = (props) => {
  return (
    <>
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" required placeholder="Description" name="decriptionField" id={props.setdescription}
        defaultValue={props.description} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.descriptionhint}></Form.Text>
    </>
  )
}

export const PublicEventField = (props) => {
  return (
    <>
      <Form.Label>Is this event public?</Form.Label>
      <Form.Check type="checkbox" label="Check this if your event is public to everybody" name="publiceventField"
        id={props.setpublicevent} defaultValue={props.publicevent} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.publiceventhint}></Form.Text>
    </>
  )
}



