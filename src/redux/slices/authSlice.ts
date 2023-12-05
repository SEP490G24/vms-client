import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { UserDto } from '~/interface'
import { userService } from '~/service'

const initialState: { profile: UserDto | null } = {
  profile: null
}

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile', () => {
    return userService.getUserProfile()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.profile = action.payload.data
        }
      })
  }
})

export const { setProfile } = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer
