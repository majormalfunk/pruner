const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'TEST':
      return state
    // case 'INIT_BOUSERS':
    //   return action.data
    // case 'CREATE_BOUSER':
    //   state = [...state, action.data]
    //   state.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
    //   return state
    // case 'UPDATE_BOUSER':
    //   state = state.map((bouser) => {
    //     return (bouser._id === action.data._id ? action.data : bouser)
    //   })
    //   state.sort((a, b) => a.username.toUpperCase().localeCompare(b.username.toUpperCase()))
    //   return state
    // case 'DELETE_BOUSER':
    //   return state.filter(bouser => bouser._id !== action.data._id)
    // case 'CLEAR_BOUSERS':
    //   return null
    default:
      return state
  }
}

export default userReducer