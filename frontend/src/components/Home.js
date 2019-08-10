import React from 'react'

const Home = ({ show, result, handleError }) => {

  if (!show) {
    return null
  }

  //if (result.loading) {
  //  return <div>Loading...</div>
  //}

  //if (result.data.availableEvents) {
  //  return (
  //    <span>Welcome!</span>
  //  )
  //} else {
    return (
      <span>Welcome anyway!</span>
    )
  //}

}
export default Home