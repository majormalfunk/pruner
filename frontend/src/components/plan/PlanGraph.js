import React, { useState, useEffect } from 'react'
import { parseISO, addMinutes, compareAsc, differenceInMinutes, isSameDay } from 'date-fns'

import { Container, Row, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap'

import { formatDate } from '../../utils/dates'

const PlanPaths = (props) => {

  const ENTRY_WIDTH = 40
  const ENTRY_GAP = 25
  const showRectStyle = {
    fill: '#880088'
  }

  const test = [1, 2 ,3, 4, 5, 6]

  const { paths, entryMap, entrySets } = props.prunedPaths

  const [rectsToDraw, setRectsToDraw] = useState([])
  const [svgHeight, setSvgHeight] = useState(window.innerHeight)
  const [svgWidth, setSvgWidth] = useState(window.innerWidth)

  useEffect(() => {

    const handleMakeRects = () => {

      let showRects = []
  
      if (entrySets && entrySets.length > 0) {

        function maxWidth() {
          let maxEntries = 0
          entrySets.forEach((slot) => {
            maxEntries = (slot.size > maxEntries ? slot.size : maxEntries)
          })
          return ENTRY_GAP + (maxEntries * (ENTRY_WIDTH + ENTRY_GAP))
        }
        function maxHeight(firstShowAt) {
          let lastEndingTime = firstShowAt
          paths[paths.length - 1].forEach((entry) => {
            let thisEndingTime = addMinutes(parseISO(entry.showtime), entry.show.duration)
            lastEndingTime = (compareAsc(lastEndingTime, thisEndingTime) < 0 ? thisEndingTime : lastEndingTime)
          })
          return differenceInMinutes(lastEndingTime, firstShowAt)
        }

        let firstShow = paths[0][0]
        let firstShowAt = parseISO(firstShow.showtime)

        setSvgWidth(maxWidth())
        setSvgHeight(maxHeight(firstShowAt))
    
        entrySets.forEach((set) => {
          let dayBreak = 0
          const entriesInSet = set.size
          let entryNum = 0
          set.forEach((entry) => {
            entryNum++
            let showStartAt = parseISO(entry.showtime)
            if (!isSameDay(showStartAt, firstShowAt)) {
              dayBreak = 600
            }
            const y = ENTRY_GAP + differenceInMinutes(showStartAt, firstShowAt) - dayBreak
            const x = ENTRY_GAP + (entryNum * (svgWidth / (entriesInSet + 1))) - (ENTRY_WIDTH / 2)
            const showRect = {
              id: entry.id, x: x, y: y, width: ENTRY_WIDTH, height: entry.show.duration,
              showname: entry.show.showname, venuename: entry.venue.venuename,
              showtime: formatDate(entry.showtime)
            }
            showRects.push(showRect)
          })
        })
    
      }

      setRectsToDraw(showRects)
    }
    console.log('Should make rects')
    handleMakeRects()
  }, [entrySets, paths, svgWidth])

  useEffect(() => {
    console.log('Rects changed')
  }, [rectsToDraw])

  const handleMouseEnter = (event) => {
    console.log(event.target.getAttribute('showname'))
  }

  const drawShowRects = () => {
    return (
      rectsToDraw.map((entry, index) => {
        return (
          <OverlayTrigger
          trigger="click"
          key={entry.id}
            placement='right'
            overlay={
              <Popover id={`popover-positioned-right`}>
                <Popover.Title as="h3">{entry.showname}</Popover.Title>
                <Popover.Content>
                  {entry.venuename} @ {entry.showtime}
                </Popover.Content>
                <Popover.Content>
                  <Button variant='primary'>OK!</Button>
                </Popover.Content>
              </Popover>
            } >
            <rect x={entry.x} y={entry.y} width={entry.width} height={entry.height}
              style={showRectStyle} key={entry.id} onMouseEnter={handleMouseEnter}
              showname={entry.showname} venuename={entry.venuename}>
              <title>
                {entry.showname}, {entry.venuename} @ {entry.showtime}
              </title>
            </rect>
          </OverlayTrigger>
        )
      })
    )
  }

  if (!rectsToDraw || rectsToDraw.length === 0) {

    console.log('No graph to draw')

    return (
      <Container>
        <Row>
          <Col>For some reason we can't draw the graph right now so here's a rect:</Col>
        </Row>
      </Container>
    )
  }

  console.log('There are', rectsToDraw.length, 'rects to draw')

  return (
    <Container>
      <Row>
        <Col>
          <svg width={svgWidth} height={svgHeight}>
           {drawShowRects()}
          </svg>
        </Col>
      </Row>
    </Container>
  )

}

export default PlanPaths