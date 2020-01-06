import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, DurationField, LinkField } from './InputFields'
import { ACTION_UPDATE_SHOW, ACTION_UPDATE_SHOW_CANCEL, ACTION_DELETE_SHOW } from '../../constants'

const UpdateEventShowForm = (props) => {

  return (
    <Container>
      <Form>
      <Row>
          <Col>
            <NameField name={props.showname} trigger={props.handleShowname}
              namehint={`shownamehintupdate`} setname={`setshownameupdate`} />
            &nbsp;
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`showdescriptionhintupdate`} setdescription={`setshowdescriptionupdate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DurationField duration={props.duration} trigger={props.handleDuration}
              durationhint={`showdurationhintupdate`} setduration={`setshowdurationupdate`} />
            &nbsp;
          </Col>
          <Col>
            <LinkField link={props.link} trigger={props.handleLink}
              linkhint={`showlinkhintupdate`} setlink={`setshowlinkupdate`} />
          </Col>
        </Row>
        <Row>
          <Col>
          <Button className="FormAlignedBtn"  variant="success" type="button"
              value={ACTION_UPDATE_SHOW} id={ACTION_UPDATE_SHOW}
              onClick={props.handleUpdateShow}>Update show info</Button>
            &nbsp;
            <Button className="FormAlignedBtn"  variant="primary" type="button"
              value={ACTION_UPDATE_SHOW_CANCEL} id={ACTION_UPDATE_SHOW_CANCEL}
              onClick={props.handleUpdateShowCancel}>Cancel</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="danger" type="button"
              value={ACTION_DELETE_SHOW} id={ACTION_DELETE_SHOW}
              onClick={props.handleDeleteShow}>Delete this show</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventShowForm