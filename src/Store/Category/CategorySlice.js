import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    category: 'Hotel',
    type: 'venue',
  },
}

export const Category = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = {
        category: 'Hotel',
        type: 'venue',
      }
    },

    setCategory: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategory, reset } = Category.actions

export default Category.reducer
