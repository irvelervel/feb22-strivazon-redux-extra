import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from '../reducers/book'
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'

// with combineReducers we're going to join back together ALL our reducers
// functions! because at the end of the day we need to have just one

// the state I want to end up having is the exact state I declared initially:

// {
//   cart: {
//     content: [],
//     error: false
//   },
//   user: {
//     name: ''
//   },
//   book: {
//     stock: []
//   }
// }

const bigReducer = combineReducers({
  cart: cartReducer, // cartReducer is going to recreate a slice called 'cart'
  user: userReducer, // userReducer is going to recreate a slice called 'user'
  book: bookReducer, // bookReducer is going to recreate a slice called 'book'
})

// you need to create a match between the name of the slice you want to mantain
// and the property names of the object you pass to combineReducers

const store = configureStore({
  reducer: bigReducer,
})

export default store
