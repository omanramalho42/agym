import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

interface ThemeSlicerProps {
  theme: 'light' | 'dark';
}

const initialState: ThemeSlicerProps = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    dark: (state) => {
      state.theme = 'dark'
    },
    light: (state) => {
      state.theme = 'light'
    }
  },
})

// Action creators are generated for each case reducer function
export const { dark, light } = themeSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const useTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer