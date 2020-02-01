import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_new_event from './images/new_event.png'

import { setPageEventCreate } from '../../reducers/pageReducer'

import { PAGE_EVENT_CREATE } from '../../constants'

const NewEventCard = ({ cardStyle, setPageEventCreate }) => {

  return (

      <Card className={cardStyle} role="button" value={PAGE_EVENT_CREATE}
        onClick={() => setPageEventCreate()}>
        <Card.Img src={img_new_event} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">CREATE A NEW EVENT</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = {
  setPageEventCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEventCard)