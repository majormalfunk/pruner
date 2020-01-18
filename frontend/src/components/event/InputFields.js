import React from 'react'
import { Form } from 'react-bootstrap'

// Day picker
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css'
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

// Date picker
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

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

export const DatePickerX = (props) => {
  const FORMAT = 'dd.MM.yyyy';
  const FIRSTDAY = 1
  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
  function CustomOverlay({ classNames, selectedDay, children, ...props }) {
    return (
      <div className={classNames.overlayWrapper} {...props} >
        <div className={classNames.overlay} style={{ color: "#ebc20c", background: "black" }}>
          {children}
        </div>
    </div>
    )
  }

  return (
    <>
      <Form.Label>Date</Form.Label>
      <Form.Row>&nbsp;
        <DayPickerInput
          inputProps={{ className: "form-control" }}
          overlayComponent={CustomOverlay}
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          placeholder="dd.mm.yyyy"//{`${dateFnsFormat(new Date(), FORMAT)}`}
          dayPickerProps={{
            month: new Date(),
            format: {FORMAT},
            showWeekNumbers: true,
            firstDayOfWeek: FIRSTDAY,
            onDayClick: props.trigger
          }} />
      </Form.Row>
      <Form.Text className="text-muted" id={props.datehint}></Form.Text>
    </>
  )
}

export const TimeField = (props) => {
  return (
    <>
      <Form.Label>Time</Form.Label>
      <Form.Row>&nbsp;
        <DatePicker className="form-control"
          onChange={props.trigger}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          //timeCaption="Showtime"
          dateFormat="dd.MM.yyyy"
        />
      </Form.Row>
      <Form.Text className="text-muted" id={props.datehint}></Form.Text>
    </>
  )
  /*
  return (
    <>
      <Form.Label>Time</Form.Label>
      <Form.Control as="select"
        required name="timeField" id={props.setTime} style={{ width: "75%" }}
        defaultValue={props.showtime} onChange={props.trigger}>
        {
          props.venues.map((venue) => {
            return (<option key={venue.id} value={venue.id}>{venue.venuename}</option>)
          })
        }
      </Form.Control>


      <Form.Control type="text" style={{ width: "75%" }}
        required placeholder="hh.mi" name="timeField" id={props.setTime}
        defaultValue={props.time} onChange={props.trigger} />
      <Form.Text className="text-muted" id={props.timehint}></Form.Text>
    </>
  )
  */
}

export const VenueSelectField = (props) => {

  if (props.venues) {
    return (
      <>
        <Form.Label>Venue</Form.Label>
        <Form.Control as="select"
          required placeholder="Select venue" name="venueSelectField" id={props.setVenue}
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
          required placeholder="Select show" name="showSelectField" id={props.setShow}
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