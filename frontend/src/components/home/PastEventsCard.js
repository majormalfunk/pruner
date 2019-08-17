import React from 'react'
import { Card } from 'react-bootstrap'
import img_past_events from './images/past_events.png'

const PastEventsCard = ({ cardStyle, handleError }) => {

  return (

      <Card className={cardStyle} style={{ width: '10em', height: '10em' }}>
        <Card.Img src={img_past_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">BROWSE PAST EVENTS</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default PastEventsCard