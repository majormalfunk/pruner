import React from 'react'
import { Card } from 'react-bootstrap'
import img_new_event from './images/new_event.png'

const NewEventCard = ({ cardStyle, handleError }) => {

  return (

      <Card className={cardStyle}>
        <Card.Img src={img_new_event} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">CREATE A NEW EVENT</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default NewEventCard