import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { makePaths } from '../../utils/bfsEntries'
import PlanGraph from './PlanGraph'

const PlanPaths = (props) => {

  const { displayError, prunedEntries, minShows, maxShows,
    handleRejectEntry, handleFavoriteEntry, handleMaybeEntry } = props

  const [prunedPaths, setPrunedPaths] = useState({})

  //console.log('Pruned entries in PlanPaths', prunedEntries)

  useEffect(() => {
    const handleMakePaths = () => {
      const minBreak = 5 // minutes
      const maxBreak = 150 // minutes
      const cutOffAfterMidnight = 0 // minutes
      const results = makePaths(prunedEntries, minShows, maxShows, minBreak, maxBreak, cutOffAfterMidnight)
      setPrunedPaths(results)
    }
    handleMakePaths()
  }, [prunedEntries, minShows, maxShows])

  useEffect(() => {
    console.log('Plans changed')
  }, [prunedPaths])

  if (!prunedEntries.entries || prunedEntries.entries.length === 0) {
    console.log('No shows to display')
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

  if (!prunedPaths || !prunedPaths.paths) {
    console.log('No paths to display')
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

  if (prunedPaths && prunedPaths.paths) {

    let pathfindingSummary = ''
    let pathsExist = false

    if (prunedPaths.interruptedPaths && prunedPaths.interruptedPaths.length > 0 ) {
      if (prunedPaths.paths.length === 0) {
        pathfindingSummary = 'These options give too many paths. You could try with a shorter path first.'
      } else {
        pathfindingSummary = `Showing ${prunedPaths.paths.length} paths. Some paths were left out because there were too many.`
        pathsExist = true
      }
    } else {
      pathfindingSummary = ((prunedPaths.paths.length === 1) ? 
      'Easy to choose! Just one possible path with your selected options!' :
      `These options give you ${prunedPaths.paths.length} different paths to choose from.`)
      pathsExist = true
    }

    return (
      <Container>
        <Row className="Component-title">
          <Col><span>{pathfindingSummary}</span></Col>
        </Row>
        {(pathsExist && prunedPaths.paths.length > 0) &&
          <Row>
            <Col>
              <PlanGraph prunedPaths={prunedPaths}
                handleRejectEntry={handleRejectEntry}
                handleFavoriteEntry={handleFavoriteEntry}
                handleMaybeEntry={handleMaybeEntry} />
            </Col>
          </Row>
        }
      </Container>
    )
  
  }

  return (
    <Container>
      <Row>
        <Col><span>Fell through</span></Col>
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