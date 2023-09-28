import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { themes } from '~/themes'
import { RootState } from '~/redux'

const initialState = {
  themes,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setAuthThemes: (state, action: PayloadAction<any>) => (state.themes = action.payload),
  },
})

export const themeSelector = (state: RootState) => state.themeMode

export default themeSlice.reducer
