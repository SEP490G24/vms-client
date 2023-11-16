import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { UserDto } from '~/interface'
import { userService } from '~/service'

const initialState: {profile: UserDto | null, auth: {token: string | null}} = {
  profile: null,
  auth: {
    token: null
  }
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile', () => {
    return userService.getUserProfile()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  }
})

export const { setAuth, setProfile } = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer
