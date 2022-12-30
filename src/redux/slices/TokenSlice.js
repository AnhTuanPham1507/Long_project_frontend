import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('token'),
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    create: (state, action) => {
      state.value = action.payload
      localStorage.setItem('token', action.payload)
    },
    remove: (state) => {
      state.value = null
      localStorage.removeItem('token')
    }
  },
})

// Action creators are generated for each case reducer function
export const { create, remove} = tokenSlice.actions

export default tokenSlice.reducer