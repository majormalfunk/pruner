import React, { useState, useEffect } from 'react'
import { parseISO, addMinutes, compareAsc, endOfDay, isSameDay, startOfHour,
  differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns'
import { Container, Row, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap'

import { formatDate } from '../../utils/dates'
import { GRAPH_PLAN } from '../../constants'

const PlanPaths = (props) => {

  const { prunedPaths, handleRejectEntry, handleFavoriteEntry, handleMaybeEntry } = props
  const { venues, paths, entryMap } = prunedPaths

  const GAP = 25
  const DAYBREAK = 600

  const hourBlockStyle = {
    fill: '#330033',
    stroke: '#550055',
    strokeWidth: 2
  }

  const showRectStyle = {
    fill: '#880088',
    cursor: 'pointer'
  }
  const showFavoriteStyle = {
    fill: '#008800',
    cursor: 'pointer'
  }
  const showRectTextStyle = {
    textLength: 60,
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

  const [rectsToDraw, setRectsToDraw] = useState([])
  const [svgHeight, setSvgHeight] = useState(window.innerHeight)
  const [svgWidth, setSvgWidth] = useState(window.innerWidth)

  useEffect(() => {

    const handleMakeRects = () => {

      let showRects = []

      if (paths && paths.length > 0) {

        function maxHeight(firstShowAt) {
          let lastEndingTime = firstShowAt
          paths[paths.length - 1].forEach((entry) => {
            let thisEndingTime = addMinutes(parseISO(entry.showtime), entry.show.duration)
            lastEndingTime = (compareAsc(lastEndingTime, thisEndingTime) < 0 ? thisEndingTime : lastEndingTime)
          })
          const fullDifference = differenceInMinutes(lastEndingTime, firstShowAt)
          const dayBreaks = differenceInDays(endOfDay(lastEndingTime), firstShowAt) * DAYBREAK
          console.log('Total day breaks:', dayBreaks)
          return (fullDifference - dayBreaks)
        }

        function graphCols() {
          const venuesArr = Array.from(venues.values())
          venuesArr.sort((a, b) => (a.venuename > b.venuename) ? 1 : -1)
          return venuesArr
        }

        const firstShow = paths[0][0]
        const firstShowAt = parseISO(firstShow.showtime)
        const firstHour = startOfHour(firstShowAt)
        setSvgHeight(maxHeight(firstShowAt)+300)
        console.log('Height set')
        const venueCols = graphCols()
        let visited = new Set()
        let venueCol = 0
        paths.forEach((path) => {
          let dayBreak = 0
          path.forEach((entry) => {
            venueCols.forEach((venue, index) => {
              venueCol = (venue.id === entry.venue.id ? index : venueCol)
            })
            let showStartAt = parseISO(entry.showtime)
            if (!isSameDay(showStartAt, firstShowAt)) {
              dayBreak = differenceInDays(endOfDay(showStartAt), firstShowAt) * DAYBREAK
            }
            if (!visited.has(entry.id)) {
              visited.add(entry.id)
              const y = GAP + differenceInMinutes(showStartAt, firstHour) - dayBreak
              const entryWidth = (((svgWidth - GAP) / (venueCols.length)) * 0.75)
              const entryGap = (((svgWidth - GAP) / (venueCols.length)) * 0.10)
              const x = GAP + ((entryWidth + entryGap) * venueCol)
              //console.log('First', formatDate(firstShowAt), 'This', formatDate(showStartAt), dayBreak, y)
              const showRect = {
                id: entry.id, x: x, y: y, width: entryWidth, height: entry.show.duration,
                favorited: entry.favorited, showname: entry.show.showname, venuename: entry.venue.venuename,
                showtime: entry.showtime, duration: entry.show.duration
              }
              showRects.push(showRect)
            }
          })
        })

      }

      setRectsToDraw(showRects)
    }

    if (paths && paths.length > 0) {
      handleMakeRects()
      console.log('Rects done')
    }
  }, [venues, paths, svgWidth])

  useEffect(() => {
    console.log('Rects changed')
  }, [rectsToDraw])

  if (paths.length === 0) {
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
    const favorited = event.target.getAttribute('favorited')
    switch (action) {
      case 'reject':
        console.log(`Rejecting ${showname} @ ${showtime}`)
        handleRejectEntry(entryId)
        break
      case 'maybe':
        console.log(`Maybe ${showname} @ ${showtime} (${favorited})`)
        if (favorited === 'true') {
          handleMaybeEntry(entryId)
        }
        document[`overlay${entryId}`].handleHide(true)
        break
      case 'choose':
        console.log(`Wanna see this ${showname} @ ${showtime}!`)
        handleFavoriteEntry(entryId)
        document[`overlay${entryId}`].handleHide(true)
        break
      default:
        console.log(`Action ${action} not yet implemented`)
        break
    }
  }

  //const handleMouseEnter = (event) => {
  //  console.log(event.target.getAttribute('showname'))
  //}

  function makeHourSlots() {
    const startHour = startOfHour(parseISO((rectsToDraw[0]).showtime))
    let lastHour = startHour
    console.log(lastHour)
    rectsToDraw.map((entry) => {
      const entryEnds = addMinutes(parseISO(entry.showtime), entry.duration)
      if (compareAsc(lastHour, entryEnds) < 1) {
        lastHour = entryEnds
      }
    })
    let hours = []
    const hourSlots = differenceInHours(lastHour, startHour)
    for (let h = 0; h < hourSlots; h++) {
      hours.push({ x: 0, y: (GAP + (h * 60)), width: svgWidth, height: 60 })
    }
    return hours
  }

  const drawBackGround = () => {
    const slots = makeHourSlots()
    return (
      slots.map((slot, index) => {
        return (
          <rect key={`hour${index}`} x={slot.x} y={slot.y} width={slot.width*0.875} height={slot.height} style={hourBlockStyle} />
        )
      })
    )
  }

  const drawShowRects = () => {
    return (
      rectsToDraw.map((entry, index) => {
        return (
          <OverlayTrigger ref={(ref) => document[`overlay${entry.id}`] = ref}
          trigger="click"
          rootClose
          key={entry.id}
            placement='auto'
            overlay={
              <Popover>
                <Popover.Title as="h3">{entry.showname}</Popover.Title>
                <Popover.Content>
                  {entry.venuename} @ {formatDate(entry.showtime)}, {entry.duration} min
                </Popover.Content>
                <Popover.Content style={spaceEvenly} showname={entry.showname}
                  showtime={formatDate(entry.showtime)} venuename={entry.venuename}>
                  <Button variant='success' type="button" size="sm" onClick={handleActOnEntry}
                    action='choose' id={entry.id} favorited={entry.favorited.toString()} style={popOverButtons}>
                      THIS!
                  </Button>
                  <Button variant='primary' type="button" size="sm" onClick={handleActOnEntry}
                    action='maybe' id={entry.id} favorited={entry.favorited.toString()} style={popOverButtons}>
                      MAYBE
                  </Button>
                  <Button variant='danger' type="button" size="sm" onClick={handleActOnEntry}
                    action='reject' id={entry.id} favorited={entry.favorited.toString()} style={popOverButtons}>
                      NAH..
                  </Button>
                </Popover.Content>
              </Popover>
            } >
              <rect x={entry.x} y={entry.y} width={entry.width} height={entry.height} key={entry.id}
                style={entry.favorited ? showFavoriteStyle : showRectStyle} //onMouseEnter={handleMouseEnter}
                showname={entry.showname} venuename={entry.venuename} id={`rect${entry.id}`}>
              <title>
                {entry.showname}, {entry.venuename} @ {formatDate(entry.showtime)}
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
          <Col>For some reason we can't draw the graph right now.</Col>
        </Row>
      </Container>
    )
  }

  console.log('There are', rectsToDraw.length, 'rects to draw')

  return (
          <svg width={svgWidth} height={svgHeight} id={GRAPH_PLAN} >
            {drawBackGround()}
            {drawShowRects()}
            {drawTextInRects()}
          </svg>
  )

}

export default PlanPaths