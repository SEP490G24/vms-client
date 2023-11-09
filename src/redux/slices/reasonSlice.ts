import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableRequest, PageableResponse, ReasonDto } from '~/interface'
import { ReasonFilterPayload, reasonService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<ReasonDto>,
  reasons: [] as ReasonDto[],
  reasonSelected: {} as ReasonDto
}

export const filterReasons = createAsyncThunk(
  'reason/filter', (arg: {
    filterPayload: ReasonFilterPayload,
    isPageable?: boolean,
    pageableRequest?: PageableRequest
  }) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return reasonService.filter(filterPayload || {}, isPageable, pageableRequest)
  }
)

export const findAllReasons = createAsyncThunk(
  'reason/findAll', (filterPayload: ReasonFilterPayload) => {
    return reasonService.filter(filterPayload)
  }
)

export const fetchReasonBySiteId = createAsyncThunk(
  'reason/fetchBySiteId', (siteId: string) => {
    return reasonService.findBySiteId(siteId)
  }
)

export const fetchReasonsById = createAsyncThunk(
  'reason/fetchById', (id: string) => {
    return reasonService.findById(id)
  }
)

const reasonsSlice = createSlice({
  name: 'reasons',
  initialState,
  reducers: {
    setReasonSelected: (state, action) => {
      state.reasonSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterReasons.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.reasons = action.payload.data.content
        }
      })
      .addCase(fetchReasonBySiteId.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.reasons = action.payload.data
        }
      })
      .addCase(findAllReasons.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.reasons = action.payload.data
        }
      })
      .addCase(fetchReasonsById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.reasonSelected = action.payload.data
        }
      })
  }
})

export const { setReasonSelected } = reasonsSlice.actions
export const reasonsSelector = (state: RootState) => state.reason
export default reasonsSlice.reducer
