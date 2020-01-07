import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, DurationField, LinkField } from './InputFields'
import { ACTION_CREATE_SHOW, ACTION_CREATE_SHOW_CANCEL } from '../../constants'
import { FLD_CRE_HNT_SHO_DES, FLD_CRE_HNT_SHO_NAM, FLD_CRE_HNT_SHO_LNK, FLD_CRE_HNT_SHO_DUR } from '../../constants'
import { FLD_CRE_SET_SHO_DES, FLD_CRE_SET_SHO_NAM, FLD_CRE_SET_SHO_LNK, FLD_CRE_SET_SHO_DUR } from '../../constants'

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
              namehint={FLD_CRE_HNT_SHO_NAM} setname={FLD_CRE_SET_SHO_NAM} />
            &nbsp;
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={FLD_CRE_HNT_SHO_DES} setdescription={FLD_CRE_SET_SHO_DES} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DurationField duration={props.duration} trigger={props.handleDuration}
              durationhint={FLD_CRE_HNT_SHO_DUR} setduration={FLD_CRE_SET_SHO_DUR} />
            &nbsp;
          </Col>
          <Col>
            <LinkField link={props.link} trigger={props.handleLink}
              linkhint={FLD_CRE_HNT_SHO_LNK} setlink={FLD_CRE_SET_SHO_LNK} />
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