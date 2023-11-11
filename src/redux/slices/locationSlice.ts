import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { locationService } from '~/service'
import { Province } from '~/interface'

const initialState = {
  provinces: [] as Province[]
}

export const fetchProvince = createAsyncThunk(
  'location/provinces', () => {
    return locationService.findAllProvince()
  }
)

const locationsSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvince.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.provinces = action.payload.data
        }
      })
  }
})

export const {  } = locationsSlice.actions
export const locationsSelector = (state: RootState) => state.location
export default locationsSlice.reducer
