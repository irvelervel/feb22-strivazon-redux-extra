// the reducer function is probably the single most important piece of the redux flow!
// it has to be a PURE function!
// 1) it will NOT mutate its arguments
// 2) from the same input, will always emit the same output
// 3) side-effects (like an API call) are NOT permitted in a pure function

import { SET_USERNAME } from '../actions'

// let's think now about our initial state for the redux store!
const initialState = {
  name: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // every time you dispatch a new action, you'll have to think
    // on how to HANDLE it! you need a reducer case!
    case SET_USERNAME:
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
    // the object you're returning from every case
    // is going to be the NEW value for the redux store!
  }
}

export default userReducer
