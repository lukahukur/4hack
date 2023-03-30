import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const EditorState = createSlice({
  name: 'EditorState',
  initialState: {
    preview: false,
  },
  reducers: {
    previewState(state, action: PayloadAction<boolean>) {
      state.preview = action.payload
    },
    reversePreviewState(state) {
      state.preview = !state.preview
    },
  },
})

export const { previewState, reversePreviewState } =
  EditorState.actions
