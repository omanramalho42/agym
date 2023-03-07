import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'

// Define a type for the slice state
interface VideosSliceProps {
  value: any[];
}

// Define the initial state using that type
const initialState: VideosSliceProps = {
  value: [],
}

export const videosSlicer = createSlice({
  name: 'videos',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<any>) => {
      state.value = action.payload.map((i) => i);
    },
    cleanVideos: (state) => {
      state.value = []
    },
  },
})

export const { setVideos, cleanVideos } = videosSlicer.actions

// Other code such as selectors can use the imported `RootState` type
export const useVideos = (state: RootState) => state.videos.value

export default videosSlicer.reducer