import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
import { ACTION_UPDATE_VENUE, ACTION_UPDATE_VENUE_CANCEL, ACTION_DELETE_VENUE } from '../../constants'

const UpdateEventVenue = (props) => {

  const { venue } = props

  return (
        <Row>
          <Col>
            {venue.venuename}
          </Col>
        </Row>
  )

}

export default UpdateEventVenue