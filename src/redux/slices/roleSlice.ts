import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, RoleDto } from '~/interface'
import { roleService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<RoleDto>,
  roles: [] as RoleDto[],
  roleSelected: {} as RoleDto
}

export const filterRoles = createAsyncThunk(
  'role/filter', (arg: any) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return roleService.filter(filterPayload, isPageable, pageableRequest)
  }
)

export const fetchRolesById = createAsyncThunk(
  'role/fetchById', (id: string) => {
    return roleService.findById(id)
  }
)

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRoleSelected: (state, action) => {
      state.roleSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterRoles.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.roles = action.payload.data.content
        }
      })
      .addCase(fetchRolesById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.roleSelected = action.payload.data
        }
      })
  }
})

export const { setRoleSelected } = rolesSlice.actions
export const rolesSelector = (state: RootState) => state.role
export default rolesSlice.reducer
