import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { locationService } from '~/service'
import { District, Province, Commune } from '~/interface'

const initialState = {
  provinces: [] as Province[],
  districts: [] as District[],
  communes: [] as Commune[]
}

export const fetchProvince = createAsyncThunk(
  'location/provinces', () => {
    return locationService.findAllProvince()
  }
)

export const fetchDistrict = createAsyncThunk(
  'location/districts', () => {
    return locationService.findAllDistrict()
  }
)

export const fetchCommune = createAsyncThunk(
  'location/communes', () => {
    return locationService.findAllCommune()
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
      .addCase(fetchDistrict.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.districts = action.payload.data
        }
      })
      .addCase(fetchCommune.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.communes = action.payload.data
        }
      })
  }
})

export const {} = locationsSlice.actions
export const locationsSelector = (state: RootState) => state.location
export default locationsSlice.reducer
