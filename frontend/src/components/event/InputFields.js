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

