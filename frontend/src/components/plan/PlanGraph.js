import React, { useState, useEffect } from 'react'
import { parseISO, addMinutes, compareAsc, differenceInMinutes, isSameDay } from 'date-fns'

import { Container, Row, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap'

import { formatDate } from '../../utils/dates'
import { de } from 'date-fns/locale'

const PlanPaths = (props) => {

  const ENTRY_WIDTH = 60
  const ENTRY_GAP = 20
  const showRectStyle = {
    fill: '#880088'
  }
  const showRectTextStyle = {
    textLength: ENTRY_WIDTH,
    color: '#fff',
    fill: '#fff',
    fontSize: '8px',
    overflowY: 'auto'
  }
  const spaceEvenly = {
    display: 'flex', 
    justifyContent: 'space-evenly'
  }
  const popOverButtons = {
    fontSize: '.800rem',
    fontWeight: 'bold'
  }

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
              showtime: formatDate(entry.showtime), duration: entry.show.duration
            }
            showRects.push(showRect)
          })
        })
    
      }

      setRectsToDraw(showRects)
    }
    console.log('Should make rects')
    if (paths && paths.length > 0) {
      handleMakeRects()
    }
  }, [entrySets, paths, svgWidth])

  useEffect(() => {
    console.log('Rects changed')
  }, [rectsToDraw])

  if (entrySets.length === 0) {
    return null
  }

  /*
  useEffect(() => {
    window.addEventListener('resize', () => {
        console.log('Rrrrreeesize!')
        setSvgWidth(window.innerWidth)
    })
    return () => {
      window.removeEventListener('resize', () => { })
    }
  }, [])
  */

  const handleActOnEntry = (event) => {
    const entryId = event.target.getAttribute('id')
    const action = event.target.getAttribute('action')
    const showname = event.target.parentNode.getAttribute('showname')
    const showtime = event.target.parentNode.getAttribute('showtime')
    const venuename = event.target.parentNode.getAttribute('venuename')
    document[`overlay${entryId}`].handleHide(true)
    let shallowEntry = { id: entryId, showname: showname, showtime: showtime, venuename: venuename }
    switch (action) {
      case 'reject':
        console.log(`Rejecting ${showname} @ ${showtime}`)
        props.handleRejectEntry(shallowEntry)
        return
      default:
        console.log(`Action ${action} not yet implemented`)
    }
  }

  const handleMouseEnter = (event) => {
    console.log(event.target.getAttribute('showname'))
  }

  const drawShowRects = () => {
    return (
      rectsToDraw.map((entry, index) => {
        return (
          <OverlayTrigger ref={(ref) => document[`overlay${entry.id}`] = ref}
          trigger="click"
          rootClose
          key={entry.id}
            placement='right'
            overlay={
              <Popover>
                <Popover.Title as="h3">{entry.showname}</Popover.Title>
                <Popover.Content>
                  {entry.venuename} @ {entry.showtime}, {entry.duration} min
                </Popover.Content>
                <Popover.Content style={spaceEvenly} showname={entry.showname}
                  showtime={entry.showtime} venuename={entry.venuename}>
                  <Button variant='success' type="button" size="sm" onClick={handleActOnEntry}
                    action='choose' id={entry.id} style={popOverButtons}>
                      THIS!
                  </Button>
                  <Button variant='primary' type="button" size="sm" onClick={handleActOnEntry}
                    action='maybe' id={entry.id} style={popOverButtons}>
                      MAYBE
                  </Button>
                  <Button variant='danger' type="button" size="sm" onClick={handleActOnEntry}
                    action='reject' id={entry.id} style={popOverButtons}>
                      NAH..
                  </Button>
                </Popover.Content>
              </Popover>
            } >
              <rect x={entry.x} y={entry.y} width={entry.width} height={entry.height}
                style={showRectStyle} key={entry.id} onMouseEnter={handleMouseEnter}
                showname={entry.showname} venuename={entry.venuename} id={`rect${entry.id}`}>
              <title>
                {entry.showname}, {entry.venuename} @ {entry.showtime}
              </title>
              </rect>
          </OverlayTrigger>
        )
      })
    )
  }

  const drawTextInRects = () => {
    return (
      rectsToDraw.map((entry, index) => {
        return (
          <text key={entry.id} x={entry.x + (entry.width / 2)} y={entry.y + (entry.height / 2)}
          style={showRectTextStyle} dominantBaseline='middle' textAnchor='middle'>{entry.showname}</text>
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
           {drawTextInRects()}
          </svg>
        </Col>
      </Row>
    </Container>
  )

}

export default PlanPaths