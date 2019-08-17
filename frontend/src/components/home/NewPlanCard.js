import React from 'react'
import { Card } from 'react-bootstrap'
import img_new_plan from './images/new_plan.png'

const NewPlanCard = ({ cardStyle, handleError }) => {

  return (

      <Card className={cardStyle} style={{ width: '10em', height: '10em' }}>
        <Card.Img src={img_new_plan} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">MAKE A NEW PLAN</Card.Title>
        </Card.ImgOverlay>
      </Card>

  )

}
export default NewPlanCard