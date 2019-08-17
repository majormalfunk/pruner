import React from 'react'
import { Card } from 'react-bootstrap'
import img_my_plans from './images/my_plans.png'

const MyPlansCard = ({ cardStyle, handleError }) => {

  return (

      <Card className={cardStyle} style={{ width: '10em', height: '10em' }}>
        <Card.Img src={img_my_plans} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">VIEW SAVED PLANS</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default MyPlansCard