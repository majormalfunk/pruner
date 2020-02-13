import React, { useState, useEffect } from 'react'
import { Container, Row, Col, CardColumns, CardDeck } from 'react-bootstrap'
import NewPlanCard from './NewPlanCard'
import MyPlansCard from './MyPlansCard'
import NewEventCard from './NewEventCard'
import UpcomingEventsCard from './UpcomingEventsCard'
import PastEventsCard from './PastEventsCard'
import MyEventsCard from './MyEventsCard'

const Home = () => {

  const [cardColumns, setCardColumns] = useState(window.innerWidth >= 576 ? 3 : 2)

  useEffect(() => {
    window.addEventListener('resize', () => {
        setCardColumns(window.innerWidth >= 576 ? 3 : 2)
    })
    // This should be called when component is unmounted 
    // It gets called when cardColumns changes
    return () => {
      window.removeEventListener('resize', () => { })
    }
  }, [cardColumns])

  if (cardColumns === 3) {
    return (
      <Container>
        <Row>
          <CardDeck>
            <NewPlanCard cardStyle="Home-card-large" />
            <UpcomingEventsCard cardStyle="Home-card-large" />
            <NewEventCard cardStyle="Home-card-large" />
          </CardDeck>
        </Row>
        <Row>
          <CardDeck>
            <MyPlansCard cardStyle="Home-card-large" />
            <PastEventsCard cardStyle="Home-card-large" />
            <MyEventsCard cardStyle="Home-card-large" />
          </CardDeck>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <CardColumns>
              <NewPlanCard cardStyle="Home-card-small" />
              <UpcomingEventsCard cardStyle="Home-card-small" />
              <MyPlansCard cardStyle="Home-card-small" />
            </CardColumns>
          </Col>
          <Col>
            <CardColumns>
              <NewEventCard cardStyle="Home-card-small" />
              <PastEventsCard cardStyle="Home-card-small" />
              <MyEventsCard cardStyle="Home-card-small" />
            </CardColumns>
          </Col>
        </Row>
      </Container>
    )
  }

}
export default Home