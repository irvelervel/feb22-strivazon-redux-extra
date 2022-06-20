export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const TOGGLE_SPINNER = 'TOGGLE_SPINNER'
export const TOGGLE_ERROR = 'TOGGLE_ERROR'

// here we can write ACTION CREATORS
// wtf is an action creator? is a function returning an action

export const addToCartAction = (bookToAdd) => ({
  type: ADD_TO_CART,
  payload: bookToAdd, // I really want the book object here!
  // the payload is another piece of info, giving the reducer the necessary piece of data
})

// when invoked, the action creator returns the action
// now the components are going to dispatch the action creator instead of the action
// which is less error-prone, and you're avoiding writing manually the action
// (with the type and the payload) every time you want to use it!

export const removeFromCartAction = (indexToRemove) => ({
  type: REMOVE_FROM_CART,
  payload: indexToRemove,
})

export const setUsernameAction = (name) => ({
  type: SET_USERNAME,
  payload: name,
})

// redux-thunk allows you to write more powerful action-creators!
// if we want to fill a redux store property with a value coming from an API call,
// we CANNOT put this async logic in any reducer file! because the outcome of an
// API call is unpredictable! so we have just one place left for achieving this:
// feeding the reducer with the data already fetched!

export const addToCartActionWithThunk = (bookToAdd) => {
  return async (dispatch, getState) => {
    // thunk allows you to write action creators that return a FUNCTION
    // instead of simply the redux action! (so a js object)

    // here you can put all the logic you want!
    // and after that, dispatch your action
    console.log('this action has been dispatched by a thunk action creator!')
    console.log(
      'you can even check the current state before the dispatch!',
      getState()
    )
    if (getState().cart.content.length < 5) {
      dispatch({
        type: ADD_TO_CART,
        payload: bookToAdd, // I really want the book object here!
        // the payload is another piece of info, giving the reducer the necessary piece of data
      })
    } else {
      alert('your cart is already full!')
    }
  }
}

export const getBooksAction = () => {
  // return {} // <- previously you could just do this... returning an object
  return async (dispatch, getState) => {
    try {
      if (!getState().book.isLoading) {
        dispatch({
          type: TOGGLE_SPINNER,
        })
      }
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let books = await resp.json() // the array of books
        // this.setState({ books }); // this is not what we're looking for...
        // we're supposed to dispatch an action now!
        dispatch({
          type: GET_BOOKS,
          payload: books,
        })
        // let's toggle the spinner off!
        dispatch({
          type: TOGGLE_SPINNER,
        })
      } else {
        // let's toggle the spinner off!
        dispatch({
          type: TOGGLE_SPINNER,
        })
        dispatch({
          type: TOGGLE_ERROR,
        })
      }
    } catch (error) {
      // let's toggle the spinner off!
      dispatch({
        type: TOGGLE_SPINNER,
      })
      dispatch({
        type: TOGGLE_ERROR,
      })
    }
  }
}
