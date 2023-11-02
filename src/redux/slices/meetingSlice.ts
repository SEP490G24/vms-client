import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { MeetingDto } from '~/interface'
import { CreateMeetingInfo, roomService } from '~/service'
import meetingTicketService from '~/service/meetingTicketService.ts'

const initialState = {
  meetingSelected: {} as MeetingDto,
  meetingForm: {} as CreateMeetingInfo,
  meetings: [] as MeetingDto[]
}

export const fetchAllMeeting = createAsyncThunk(
  'meeting/fetchAll', () => {
    return meetingTicketService.findAll()
  }
)

export const fetchMeetingById = createAsyncThunk(
  'meeting/fetchById', (id: string) => {
    return roomService.findById(id)
  }
)

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setMeetingSelected: (state, action) => {
      state.meetingSelected = action.payload
    },
    patchMeetingForm: (state, action) => {
      state.meetingForm = { ...state.meetingForm, ...action.payload }
    },
    resetMeetingForm: (state) => {
      state.meetingForm = {} as CreateMeetingInfo
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMeeting.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.meetings = action.payload.data
      }
    })
    builder.addCase(fetchMeetingById.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.meetingSelected = action.payload.data
      }
    })
  }
})

export const { setMeetingSelected, patchMeetingForm, resetMeetingForm } = meetingSlice.actions
export const meetingSelector = (state: RootState) => state.meeting
export default meetingSlice.reducer
