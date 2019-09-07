import React from 'react'
import { Card } from 'react-bootstrap'
import img_upcoming_events from './images/upcoming_events.png'

const UpcomingEventsCard = ({ cardStyle }) => {

  return (

      <Card className={cardStyle}>
        <Card.Img src={img_upcoming_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">BROWSE UPCOMING EVENTS</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default UpcomingEventsCard