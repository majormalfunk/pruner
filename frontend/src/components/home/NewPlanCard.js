import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_new_plan from './images/new_plan.png'

import { setPagePlanCreate } from '../../reducers/pageReducer'

const NewPlanCard = ({ cardStyle, setPagePlanCreate }) => {

  return (

      <Card className={cardStyle} role="button" onClick={() => setPagePlanCreate()}>
        <Card.Img src={img_new_plan} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">MAKE A NEW PLAN</Card.Title>
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
  setPagePlanCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlanCard)