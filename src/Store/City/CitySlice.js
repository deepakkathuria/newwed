import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const CitySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    reset: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = ''
    },

    setCity: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCity, reset } = CitySlice.actions

export default CitySlice.reducer
