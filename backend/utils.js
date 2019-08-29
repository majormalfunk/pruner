
const checkCurrentUser = ({ currentUser }, attempt) => {
  if (!currentUser) {
    // The call has to have had a token and the username resolved from the token
    // must match the username in arguments i.e. only a logged in user can
    // perform operation
    console.log(`Not logged in while trying to ${attempt}`)
    //throw new Error(`Not logged in while trying to ${attempt}`)
  }
  return null
}

const checkCurrentUserIsCorrect = ({ currentUser }, username, attempt) => {
  if (!currentUser || currentUser.username !== username) {
    // The call has to have had a token and the username resolved from the token
    // must match the username in arguments
    console.log(`Not logged in while trying to ${attempt}`)
    //throw new Error(`Not logged in while trying to ${attempt}`)
  }
  return null
}


module.exports = {
  checkCurrentUser,
  checkCurrentUserIsCorrect
}