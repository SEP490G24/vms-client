import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, UserDto } from '~/interface'
import { userService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<UserDto>,
  users: [] as UserDto[],
  userSelected: {} as UserDto
}

export const filterUsers = createAsyncThunk(
  'user/filter', (arg: any) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return userService.filter(filterPayload, isPageable, pageableRequest)
  }
)

export const fetchUserById = createAsyncThunk(
  'user/fetchById', (id: string) => {
    return userService.findById(id)
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSelected: (state, action) => {
      state.userSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterUsers.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.users = action.payload.data.content
        }
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.userSelected = action.payload.data
        }
      })
  }
})

export const { setUserSelected } = usersSlice.actions
export const usersSelector = (state: RootState) => state.user
export default usersSlice.reducer
