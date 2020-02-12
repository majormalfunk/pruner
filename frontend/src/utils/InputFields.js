import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

// Date picker
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale, setDefaultLocale } from  "react-datepicker"
import en from 'date-fns/locale/en-GB'
import { parseISO } from 'date-fns'
registerLocale('en-GB', en)
setDefaultLocale('en-GB')

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

export const TimeField = (props) => {

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  let showtime = null
  if (props.showtime) {
    if (!isValidDate(props.showtime)) {
      showtime = parseISO(props.showtime)
    } else {
      showtime = props.showtime
    }
  }
  
  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <Form.Row>&nbsp;
        <DatePicker className="form-control" id={props.settime}
          selected={showtime}
          onChange={props.trigger}
          popperPlacement="right"
          showTimeSelect
          locale="en-GB"
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </Form.Row>
      <Form.Text className="text-muted" id={props.timehint}></Form.Text>
    </>
  )
}

export const TimeRangeField = (props) => {

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  const selectsStart = props.selectsStart
  let minTime = null
  let startTime = null
  let endTime = null
  let maxTime = null
  try {
    minTime = (isValidDate(props.minTime) ? props.minTime : parseISO(props.minTime))
    maxTime = (isValidDate(props.maxTime) ? props.maxTime : parseISO(props.maxTime))
    if (props.startTime === null) {
      startTime = minTime
    } else {
      startTime = (isValidDate(props.startTime) ? props.startTime : parseISO(props.startTime))
    }
    if (props.endTime === null) {
      endTime = maxTime
    } else {
      endTime = (isValidDate(props.endTime) ? props.endTime : parseISO(props.endTime))
    }
  } catch (error) {
    console.log('Couldnt parse some date')
  }

  return (
    <>
      <Form.Label>{props.label}</Form.Label>
      <Form.Row>&nbsp;
        <DatePicker className="form-control" id={props.settime}
          selected={selectsStart ? startTime : endTime}
          onChange={props.trigger}
          selectsStart={selectsStart}
          selectsEnd={!selectsStart}
          startDate={startTime}
          endDate={endTime}
          minDate={minTime}
          maxDate={maxTime}
          popperPlacement="right"
          showTimeSelect
          locale="en-GB"
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="dd.MM.yyyy HH:mm" />
      </Form.Row>
      <Form.Text className="text-muted" id={props.timehint}></Form.Text>
    </>

  )
}

export const VenueSelectField = (props) => {

  if (props.venues) {
    return (
      <>
        <Form.Label>Venue</Form.Label>
        <Form.Control as="select"
          required placeholder="Select venue" name="venueSelectField" id={props.setvenue}
          defaultValue={props.venue ? props.venue : "-1"} onChange={props.trigger}>
          <option hidden disabled value={-1}> -- Select a venue -- </option>
          {
            props.venues.map((venue) => {
              return (<option key={venue.id} value={venue.id}>{venue.venuename}</option>)
            })
          }
        </Form.Control>
        <Form.Text className="text-muted" id={props.venuehint}></Form.Text>
      </>
    )
  } else {
    return (
      <>
        <Form.Label>Venue</Form.Label>
        <Form.Text>No venues available</Form.Text>
        <Form.Text className="text-muted" id={props.venuehint}></Form.Text>
      </>
    )
  }
}

export const ShowSelectField = (props) => {

  if (props.shows) {
    return (
      <>
        <Form.Label>Show</Form.Label>
        <Form.Control as="select"
          required placeholder="Select show" name="showSelectField" id={props.setshow}
          defaultValue={props.show ? props.show : "-1"} onChange={props.trigger} >
          <option hidden disabled value={-1}> -- Select a show -- </option>
          {
            props.shows.map((show) => {
              return (<option key={show.id} value={show.id}>{show.showname}</option>)
            })
          }
        </Form.Control>
        <Form.Text className="text-muted" id={props.showhint}></Form.Text>
      </>
    )
  } else {
    return (
      <>
        <Form.Label>Show</Form.Label>
        <Form.Text>No shows available</Form.Text>
        <Form.Text className="text-muted" id={props.showhint}></Form.Text>
      </>
    )
  }

}

export const NumberSelectField = (props) => {
  return (
    <Form.Group as={Row}>
      <Col>
        <Form.Label>{props.label}</Form.Label>
      </Col>
      <Col>
        <Form.Control style={{width: '50%'}} type="number" step="1" min="1" max={props.totalShows}
          required placeholder="Select" name="selectNumberField" id={props.setnumber}
          defaultValue={props.number} onChange={props.trigger} />
      </Col>
      <Form.Text className="text-muted" id={props.numberhint}></Form.Text>
    </Form.Group>
  )
}
