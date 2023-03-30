import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type appState = 'editing' | 'creating' | 'none'

type initialStateType = {
  appState: appState
}

export const GlobalState = createSlice({
  name: 'appState',
  initialState: {
    appState: 'none',
  } as initialStateType,
  reducers: {
    setAppState(state, action: PayloadAction<appState>) {
      state.appState = action.payload
    },
  },
})

export const { setAppState } = GlobalState.actions
