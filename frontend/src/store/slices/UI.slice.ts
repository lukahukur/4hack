import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  hideSidebar: boolean
}

export const UIslice = createSlice({
  name: 'UIslice',
  initialState: {
    hideSidebar: true,
  } as initialStateType,
  reducers: {
    hideSideBar(state, action: PayloadAction<boolean>) {
      state.hideSidebar = action.payload
    },
  },
})

export const { hideSideBar } = UIslice.actions
