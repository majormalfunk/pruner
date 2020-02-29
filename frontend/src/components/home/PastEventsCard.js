import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_past_events from './images/past_events.png'

import { setPagePastEvents } from '../../reducers/pageReducer'

const PastEventsCard = ({ cardStyle, setPagePastEvents }) => {

  return (

      <Card className={cardStyle} role="button" onClick={() => setPagePastEvents()}>
        <Card.Img src={img_past_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">BROWSE PAST EVENTS</Card.Title>
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
  setPagePastEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(PastEventsCard)