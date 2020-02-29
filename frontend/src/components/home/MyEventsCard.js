import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_my_events from './images/my_events.png'

import { setPageMyEvents } from '../../reducers/pageReducer'

const MyEventsCard = ({ cardStyle, setPageMyEvents }) => {

  return (

      <Card className={cardStyle} role="button" onClick={() => setPageMyEvents()}>
        <Card.Img src={img_my_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">VIEW MY SAVED EVENTS</Card.Title>
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
  setPageMyEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEventsCard)