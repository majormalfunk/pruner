import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Badge } from 'react-bootstrap'

import { formatDate } from '../../utils/dates'
import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanFavoritedEntries = (props) => {

  const { currentUser, favoritedEntries, handleUnfavoriteEntry } = props

  console.log('Favorited entries =', favoritedEntries)

  if (!favoritedEntries || favoritedEntries.length === 0) {
    return (
      null
    )
  }

  console.log('Rendering favorited entries')

  return (
    <Container>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col className="Component-title">
          You have favorited these entries (Click name badge to un-favorite it)
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                {favoritedEntries.map((entry) => {
                    return <Badge pill variant='success' key={entry.id} id={entry.id} onClick={handleUnfavoriteEntry}>
                      {entry.show.showname} @ {formatDate(entry.showtime)}
                      </Badge>
                })}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanFavoritedEntries)