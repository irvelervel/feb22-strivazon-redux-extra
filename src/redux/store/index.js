import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from '../reducers/book'
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // this is the localStorage engine

import { encryptTransform } from 'redux-persist-transform-encrypt'

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
//     stock: [],
//     isLoading: true,
//     isError: false
//   }
// }

const persistConfig = {
  key: 'root',
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SUPER_SECRET_KEY,
      onError: (error) => {
        console.log(error)
      },
    }),
  ],
}

const bigReducer = combineReducers({
  cart: cartReducer, // cartReducer is going to recreate a slice called 'cart'
  user: userReducer, // userReducer is going to recreate a slice called 'user'
  book: bookReducer, // bookReducer is going to recreate a slice called 'book'
})

const persistedReducer = persistReducer(persistConfig, bigReducer)
// this is the persisted version of our big reducer

// you need to create a match between the name of the slice you want to mantain
// and the property names of the object you pass to combineReducers

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
