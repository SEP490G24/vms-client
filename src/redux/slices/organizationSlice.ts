import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { OrganizationEntity } from '~/interface'
import { organizationService } from '~/service'

const initialState = {
  myOrganization: {} as OrganizationEntity,
  organizations: [] as OrganizationEntity[]
}

export const fetchMyOrganization = createAsyncThunk(
  'organization/fetchMyOrganization', () => {
    return organizationService.getMyOrganization()
  }
)

export const fetchAll = createAsyncThunk(
  'organization/fetchAll', () => {
    return organizationService.findAll()
  }
)

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    updateMyOrganization: (state, action) => {
      state.myOrganization = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrganization.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.myOrganization = action.payload.data
        }
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.organizations = action.payload.data
        }
      })
  }
})

export const { updateMyOrganization } = organizationsSlice.actions
export const organizationsSelector = (state: RootState) => state.organization
export default organizationsSlice.reducer
