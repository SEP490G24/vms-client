import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, UserDto } from '~/interface'
import { siteService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<UserDto>,
  sites: [] as UserDto[],
  siteSelected: {} as UserDto
}

export const filterSites = createAsyncThunk(
  'site/filter', (arg: any) => {
    const { payload, isPageable, pageableRequest } = arg
    return siteService.filter(payload, isPageable, pageableRequest)
  }
)

export const fetchSitesById = createAsyncThunk(
  'site/fetchById', (id: string) => {
    return siteService.findById(id)
  }
)

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSiteSelected: (state, action) => {
      state.siteSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterSites.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.sites = action.payload.data.content
        }
      })
      .addCase(fetchSitesById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.siteSelected = action.payload.data
        }
      })
  }
})

export const { setSiteSelected } = sitesSlice.actions
export const sitesSelector = (state: RootState) => state.site
export default sitesSlice.reducer
