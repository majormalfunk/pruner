import React, { useState, useEffect } from 'react'
import { Container, Row, Col, CardColumns, CardDeck } from 'react-bootstrap'
import NewPlanCard from './NewPlanCard'
import MyPlansCard from './MyPlansCard'
import NewEventCard from './NewEventCard'
import UpcomingEventsCard from './UpcomingEventsCard'
import PastEventsCard from './PastEventsCard'
import MyEventsCard from './MyEventsCard'

const Home = ({ show, handleSetPage }) => {

  const [cardColumns, setCardColumns] = useState(window.innerWidth >= 576 ? 3 : 2)

  useEffect(() => {
    window.addEventListener('resize', () => {
        setCardColumns(window.innerWidth >= 576 ? 3 : 2)
    })

    // This should be called when component is unmounted 
    // It apparently gets called when cardColumns changes
    // Point in that?
    return () => {
      window.removeEventListener('resize', () => { })
    }
  }, [cardColumns])

  if (!show) {
    return null
  }

  if (cardColumns === 3) {
    return (
      <Container>
        <Row>
          <CardDeck>
            <NewPlanCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
            <UpcomingEventsCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
            <NewEventCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
          </CardDeck>
        </Row>
        <Row>
          <CardDeck>
            <MyPlansCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
            <PastEventsCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
            <MyEventsCard cardStyle="Home-card-large" handleSetPage={handleSetPage} />
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
              <NewPlanCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
              <UpcomingEventsCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
              <MyPlansCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
            </CardColumns>
          </Col>
          <Col>
            <CardColumns>
              <NewEventCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
              <PastEventsCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
              <MyEventsCard cardStyle="Home-card-small" handleSetPage={handleSetPage} />
            </CardColumns>
          </Col>
        </Row>
      </Container>
    )
  }

}
export default Home