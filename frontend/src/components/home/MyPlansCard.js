import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import img_my_plans from './images/my_plans.png'

import { setPageMyPlans } from '../../reducers/pageReducer'

const MyPlansCard = ({ cardStyle, setPageMyPlans }) => {

  return (

      <Card className={cardStyle} role="button" onClick={() => setPageMyPlans()}>
        <Card.Img src={img_my_plans} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title className="Home-card">VIEW MY SAVED PLANS</Card.Title>
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
  setPageMyPlans
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlansCard)