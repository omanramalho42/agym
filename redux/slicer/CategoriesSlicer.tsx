import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface CategoriesSliceProps {
  value: any[];
}

// Define the initial state using that type
const initialState: CategoriesSliceProps = {
  value: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.value = action.payload.map((i) => i);
    },
    cleanCateogies: (state) => {
      state.value = []
    },
  },
})

export const { setCategories, cleanCateogies } = categoriesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const useCategories = (state: RootState) => state.categories.value

export default categoriesSlice.reducer