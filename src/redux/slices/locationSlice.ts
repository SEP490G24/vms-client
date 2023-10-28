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
  'location/districts', (provinceId: number) => {
    return locationService.findAllDistrictByProvinceId(provinceId)
  }
)

export const fetchCommune = createAsyncThunk(
  'location/communes', (districtId: number) => {
    return locationService.findAllCommuneByDistrictId(districtId)
  }
)

const locationsSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    resetDistrict: (state) => {
      state.districts = []
    },
    resetCommune: (state) => {
      state.communes = []
    }
  },
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

export const { resetDistrict, resetCommune } = locationsSlice.actions
export const locationsSelector = (state: RootState) => state.location
export default locationsSlice.reducer
