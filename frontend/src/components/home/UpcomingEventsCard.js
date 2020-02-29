import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_upcoming_events from './images/upcoming_events.png'

import { setPageUpcomingEvents } from '../../reducers/pageReducer'

const UpcomingEventsCard = ({ cardStyle, setPageUpcomingEvents }) => {

  return (

      <Card className={cardStyle} role="button" onClick={() => setPageUpcomingEvents()}>
        <Card.Img src={img_upcoming_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">BROWSE UPCOMING EVENTS</Card.Title>
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
  setPageUpcomingEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEventsCard)