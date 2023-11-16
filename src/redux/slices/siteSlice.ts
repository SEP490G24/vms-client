import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, SiteDto } from '~/interface'
import { siteService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<SiteDto>,
  sites: [] as SiteDto[],
  siteSelected: {} as SiteDto
}

export const filterSites = createAsyncThunk(
  'site/filter', (arg: any) => {
    const { payload, isPageable, pageableRequest } = arg
    return siteService.filter(payload || {}, isPageable, pageableRequest)
  }
)

export const findAllSitesInOrganization = createAsyncThunk(
  'room/findAllInOrganization', () => {
    return siteService.findAllByOrganization()
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
      .addCase(findAllSitesInOrganization.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.sites = action.payload.data
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
