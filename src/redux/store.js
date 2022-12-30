import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slices/TokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer
  },
})