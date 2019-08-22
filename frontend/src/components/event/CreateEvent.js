import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import { PAGE_EVENT_CREATE } from '../../constants'

const CreateEvent = ({ token, show, handleError }) => {

  if (!show || !token) {
    return null
  }

    return (
      <Container>
        Hello World! Let's create an event!
      </Container>
    )


}

export default CreateEvent