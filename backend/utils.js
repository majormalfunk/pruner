
const checkCurrentUser = ({ currentUser }, attempt) => {
  if (!currentUser) {
    // The call has to have had a token i.e. only a logged in user can
    // perform operation
    // console.log(`Not logged in while trying to ${attempt}`)
    //throw new Error(`Not logged in while trying to ${attempt}`)
    return false
  }
  return true
}

const checkCurrentUserIsCorrect = ({ currentUser }, username, attempt) => {
  if (!currentUser || currentUser.username !== username) {
    // The call has to have had a token and the username resolved from the token
    // must match the username in arguments i.e. only the correct logged in user can
    // perform operation
    // console.log(`Not logged in while trying to ${attempt}`)
    // throw new Error(`Not logged in while trying to ${attempt}`)
    return false
  }
  return true
}


module.exports = {
  checkCurrentUser,
  checkCurrentUserIsCorrect
}