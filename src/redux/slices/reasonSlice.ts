import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { ReasonDto } from '~/interface'
import { reasonService } from '~/service'
import { Reason } from '~/constants'

const initialState = {
  cancelReasons: [] as ReasonDto[],
  rejectReasons: [] as ReasonDto[]
}

export const fetchCancelReasons = createAsyncThunk(
  'reason/fetchCancelReasons', () => {
    return reasonService.findAllByType(Reason.CANCEL)
  }
)

export const fetchRejectReasons = createAsyncThunk(
  'reason/fetchRejectReasons', () => {
    return reasonService.findAllByType(Reason.REJECT)
  }
)

const reasonsSlice = createSlice({
  name: 'reasons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCancelReasons.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.cancelReasons = action.payload.data
        }
      })
      .addCase(fetchRejectReasons.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.rejectReasons = action.payload.data
        }
      })
  }
})

export const {  } = reasonsSlice.actions
export const reasonsSelector = (state: RootState) => state.reason
export default reasonsSlice.reducer
