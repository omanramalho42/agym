import { configureStore } from '@reduxjs/toolkit'

import CategoriesReducer from '../slicer/CategoriesSlicer'
import ThemeSlicer from '../slicer/ThemeSlicer'
import VideosReducer from '../slicer/VideosSlicer'

export const store = configureStore({
  reducer: {
    videos: VideosReducer,
    categories: CategoriesReducer,
    theme: ThemeSlicer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch