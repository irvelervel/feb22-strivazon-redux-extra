// the reducer function is probably the single most important piece of the redux flow!
// it has to be a PURE function!
// 1) it will NOT mutate its arguments
// 2) from the same input, will always emit the same output
// 3) side-effects (like an API call) are NOT permitted in a pure function

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'

// let's think now about our initial state for the redux store!
const initialState = {
  // we'll put here everything belonging to the cart feature
  content: [],
  error: false,
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // every time you dispatch a new action, you'll have to think
    // on how to HANDLE it! you need a reducer case!
    case ADD_TO_CART:
      return {
        // state is now just the cart slice! just the object with content and error
        ...state,
        content: [...state.content, action.payload], // action.payload is the new book we're trying to add
        // content: state.content.concat(action.payload), // action.payload is the new book we're trying to add
        // content: state.content.push(action.payload) <-- SUPER BAD, PUSH IS NOT ALLOWED IN A REDUCER
        // because EDITS the state argument (which is forbidden) and returns a number
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        content: [
          ...state.content.slice(0, action.payload), // all the elements BEFORE action.payload
          ...state.content.slice(action.payload + 1), // all the elements AFTER action.payload
        ], // hardcore solution but more efficient :)
      }
    default:
      return state
    // the object you're returning from every case
    // is going to be the NEW value for the redux store!
  }
}

export default cartReducer
