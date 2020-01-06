import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, DurationField, LinkField } from './InputFields'
import { ACTION_CREATE_SHOW, ACTION_CREATE_SHOW_CANCEL } from '../../constants'

const CreateEventShowForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-expl">
            Add a new show to your event recurrence
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.showname} trigger={props.handleShowname}
              namehint={`shownamehintcreate`} setname={`setshownamecreate`} />
            &nbsp;
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`showdescriptionhintcreate`} setdescription={`setshowdescriptioncreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DurationField duration={props.duration} trigger={props.handleDuration}
              durationhint={`showdurationhintcreate`} setduration={`setshowdurationcreate`} />
            &nbsp;
          </Col>
          <Col>
            <LinkField link={props.link} trigger={props.handleLink}
              linkhint={`showlinkhintcreate`} setlink={`setshowlinkcreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="FormAlignedBtn" variant="success" type="button"
              value={ACTION_CREATE_SHOW} id={ACTION_CREATE_SHOW}
              onClick={props.handleCreateShow}>Create new show</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="primary" type="button"
              value={ACTION_CREATE_SHOW_CANCEL} id={ACTION_CREATE_SHOW_CANCEL}
              onClick={props.handleCreateShowCancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Container >
  )

}

export default CreateEventShowForm