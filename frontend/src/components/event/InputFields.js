import React from 'react'
import { Form } from 'react-bootstrap'

export const NameField = (props) => {
  return (
    <>
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" required placeholder="Name" name="nameField" id={props.setname}
        defaultValue={props.name} onChange={props.trigger} disabled={props.disabled} />
      <Form.Text className="text-muted" id={props.namehint}></Form.Text>
    </>
  )
}

export const DescriptionField = (props) => {
  return (
    <>
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" required placeholder="Description" name="descriptionField" id={props.setdescription}
        defaultValue={props.description} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.descriptionhint}></Form.Text>
    </>
  )
}

export const IsPublicField = (props) => {
  return (
    <>
      <Form.Check type="checkbox" label="Check this if you want to make it public to everybody" name="isPublicField"
        id={props.setpublic} defaultChecked={props.ispublic} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.ispublichint}></Form.Text>
    </>
  )
}

export const IsLiveField = (props) => {
  return (
    <>
      <Form.Check type="checkbox" label="Check this if you want to make it live" name="isLiveField"
        id={props.setlive} defaultChecked={props.islive} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.islivehint}></Form.Text>
    </>
  )
}

export const LinkField = (props) => {
  return (
    <>
      <Form.Label>Link</Form.Label>
      <Form.Control type="text" required placeholder="Link" name="linkField" id={props.setlink}
        defaultValue={props.link} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.linkhint}></Form.Text>
    </>
  )
}

export const DurationField = (props) => {
  return (
    <>
      <Form.Label>Duration</Form.Label>
      <Form.Control type="number" step="1" min="0"
        required placeholder="Duration" name="durationField" id={props.setduration}
        defaultValue={props.duration} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.durationhint}></Form.Text>
    </>
  )
}

export const DateField = (props) => {
  return (
    <>
      <Form.Label>Date</Form.Label>
      <Form.Control type="text"
        required placeholder="dd.mm.yyyy" name="dateField" id={props.setDate}
        defaultValue={props.date} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.datehint}></Form.Text>
    </>
  )
}

export const TimeField = (props) => {
  return (
    <>
      <Form.Label>Time</Form.Label>
      <Form.Control type="text"
        required placeholder="hh.mi" name="timeField" id={props.setTime}
        defaultValue={props.time} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.timehint}></Form.Text>
    </>
  )
}

export const VenueSelectField = (props) => {
  return (
    <>
      <Form.Label>Venue</Form.Label>
      <Form.Control as="select"
        required placeholder="Select venue" name="venueSelectField" id={props.setVenue}
        defaultValue={props.venue} onChange={props.trigger} >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
      <Form.Text className="text-muted" id={props.venuehint}></Form.Text>
    </>
  )
}

export const ShowSelectField = (props) => {
  return (
    <>
      <Form.Label>Show</Form.Label>
      <Form.Control as="select"
        required placeholder="Select show" name="showSelectField" id={props.setShow}
        defaultValue={props.show} onChange={props.trigger} >
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
      <Form.Text className="text-muted" id={props.showhint}></Form.Text>
    </>
  )
}