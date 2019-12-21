import React from 'react'
import { Card } from 'react-bootstrap'
import img_my_plans from './images/my_plans.png'

const MyPlansCard = ({ cardStyle }) => {

  return (

      <Card className={cardStyle}>
        <Card.Img src={img_my_plans} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">VIEW MY SAVED PLANS</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default MyPlansCard