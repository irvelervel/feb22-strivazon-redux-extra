import { GET_BOOKS, TOGGLE_ERROR, TOGGLE_SPINNER } from '../actions'

const initialState = {
  stock: [],
  isLoading: true,
  isError: false,
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload,
      }
    case TOGGLE_SPINNER:
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case TOGGLE_ERROR:
      return {
        ...state,
        isError: !state.isError,
      }
    default:
      return state
  }
}

export default bookReducer
