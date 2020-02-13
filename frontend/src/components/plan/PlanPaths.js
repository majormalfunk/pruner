import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { makePaths } from '../../utils/pruner'
import { drawGraph } from '../../utils/graph'

const PlanPaths = (props) => {

  const { displayError, prunedEntries, minShows, maxShows } = props

  const [prunedPaths, setPrunedPaths] = useState([])

  const handleMakePaths = async (entries) => {
    const minBreak = 5 // minutes
    const maxBreak = 150 // minutes
    const cutOffAfterMidnight = 0 // minutes
    const results = await makePaths(entries, minShows, maxShows, minBreak, maxBreak, cutOffAfterMidnight)
    if (results) {
      console.log('Ready paths', results.paths.length)
      console.log('Interrupted paths', results.interruptedPaths.length)
    }
    setPrunedPaths(results.paths)
    //results.interruptedPaths.forEach((path, index) => {
    //  console.log('Path #', index)
    //  path.forEach((entry) => {
    //    console.log('  ', entry.showtime, entry.venue.venuename, entry.show.showname)
    //  })
    //})
    return
  }

  useEffect(() => {
    console.log('PLAN: Using effect')
    handleMakePaths(prunedEntries)
    console.log('PLAN: Effect used')
    // eslint-disable-next-line
  }, [prunedEntries])

  if (!prunedEntries || prunedEntries.length === 0) {
    console.log('No shows to display')
    drawGraph([])
    return (
      <Container>
        <Row>
          <Col><span>There are no shows to display</span></Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )
  }

  if (!prunedPaths || prunedPaths.length === 0) {
    console.log('No paths to display')
    drawGraph([])
    return (
      <Container>
        <Row>
          <Col><span>Can't make any paths with your selected options</span></Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )
  }

  console.log('We got something')

  drawGraph(prunedPaths)

  const pathfindingSummary = (prunedPaths.length === 1 ? 
    'Easy to choose! Just one possible path with your selected options!' :
    `These options give you ${prunedPaths.length} different paths to choose from.`)

  return (
    <Container>
      <Row className="Component-title">
        <Col><span>{pathfindingSummary}</span></Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
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