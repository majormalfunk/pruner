import React from 'react'
import { Card } from 'react-bootstrap'
import img_new_event from './images/new_event.png'

import { PAGE_EVENT_CREATE } from '../../constants'

const NewEventCard = ({ cardStyle, handleSetPage }) => {

  return (

      <Card className={cardStyle} role="button" value={PAGE_EVENT_CREATE}
        onClick={() => handleSetPage(PAGE_EVENT_CREATE)}>
        <Card.Img src={img_new_event} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">CREATE A NEW EVENT</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default NewEventCard