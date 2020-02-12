import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { makePaths } from '../../utils/pruner'

const PlanPaths = (props) => {

  const { displayError, prunedEntries } = props

  const [prunedPaths, setPrunedPaths] = useState([])

  const handleMakePaths = async (entries) => {
    const minEntries = 2
    const maxEntries = 3
    const minBreak = 5 // minutes
    const maxBreak = 150 // minutes
    const cutOffAfterMidnight = 0 // minutes
    const paths = await makePaths(entries, minEntries, maxEntries, minBreak, maxBreak, cutOffAfterMidnight)
    console.log('Paths', paths.length)
    setPrunedPaths(paths)
    //paths.forEach((path, index) => {
    //  console.log('Path #', index)
    //  path.forEach((entry) => {
    //    console.log('  ', entry.showtime, entry.venue.venuename, entry.show.showname)
    //  })
    //})
    return paths
  }

  useEffect(() => {
    console.log('PLAN: Using effect')
    handleMakePaths(prunedEntries)
    console.log('PLAN: Effect used')
    // eslint-disable-next-line
  }, [prunedEntries])

  console.log('Paths', prunedPaths.length)

  if (!prunedEntries || prunedEntries.length === 0) {
    console.log('No shows to display')
    return (
      <Container>
        <Row>
          <Col><span>There are no shows to display</span></Col>
        </Row>
      </Container>
    )
  }

  if (!prunedPaths || prunedPaths.length === 0) {
    console.log('No paths to display')
    return (
      <Container>
        <Row>
          <Col><span>Can't make any paths with your selected options</span></Col>
        </Row>
      </Container>
    )
  }

  console.log('We got something')

  const pathfindingSummary = (prunedPaths.length === 1 ? 
    'Easy to choose! Just one possible path with your selected options!' :
    `These options give you ${prunedPaths.length} different paths to choose from.`)

  return (
    <Container>
      <Row className="Component-title">
        <Col><span>{pathfindingSummary}</span></Col>
      </Row>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPaths)