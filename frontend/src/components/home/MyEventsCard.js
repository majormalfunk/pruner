import React from 'react'
import { Card } from 'react-bootstrap'
import img_my_events from './images/my_events.png'

const MyEventsCard = ({ cardStyle, handleError }) => {

  return (

      <Card className={cardStyle}>
        <Card.Img src={img_my_events} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">VIEW SAVED EVENTS</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default MyEventsCard