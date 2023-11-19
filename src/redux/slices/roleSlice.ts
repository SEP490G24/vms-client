import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { RoleDto } from '~/interface'
import { roleService } from '~/service'

const initialState = {
  roles: [] as RoleDto[],
  roleSelected: {} as RoleDto
}

export const fetchRoleBySiteId = createAsyncThunk(
  'role/fetchBySiteId', (siteId: string) => {
    return roleService.getAll(siteId)
  }
)

export const fetchRoleById = createAsyncThunk(
  'role/fetchById', (id: string) => {
    return roleService.getById(id)
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
      .addCase(fetchRoleBySiteId.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.roles = action.payload.data
        }
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.roleSelected = action.payload.data
        }
      })
  }
})

export const { setRoleSelected } = rolesSlice.actions
export const rolesSelector = (state: RootState) => state.role
export default rolesSlice.reducer
