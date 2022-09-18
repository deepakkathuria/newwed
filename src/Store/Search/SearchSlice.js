import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = ''
    },

    setSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearch, reset } = SearchSlice.actions

export default SearchSlice.reducer
