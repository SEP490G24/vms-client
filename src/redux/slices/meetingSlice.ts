import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { MeetingDto, MeetingQRDto } from '~/interface'
import { CreateMeetingInfo } from '~/service'
import { meetingTicketService } from '~/service'

const initialState = {
  meetingSelected: {} as MeetingDto,
  meetingTicketQR: {} as MeetingQRDto,
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
    return meetingTicketService.findById(id)
  }
)

export const fetchMeetingByQR = createAsyncThunk(
  'meeting/fetchByQR', (arg: string) => {
    return meetingTicketService.findByQRCode(arg)
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
    },
    resetMeetingSelected: (state) => {
      state.meetingSelected = {} as MeetingDto
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMeeting.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.meetings = action.payload.data
      }
    })
    builder.addCase(fetchMeetingByQR.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.meetingTicketQR = action.payload.data
      }
    })
    builder.addCase(fetchMeetingById.fulfilled, (state, action) => {
      if (action.payload?.data) {
        state.meetingSelected = action.payload.data
        state.meetingForm = {
          startTime: new Date(action.payload.data.startTime),
          endTime: new Date(action.payload.data.endTime),
          draft: false
        } as CreateMeetingInfo
      }
    })
  }
})

export const { setMeetingSelected, patchMeetingForm, resetMeetingForm, resetMeetingSelected } = meetingSlice.actions
export const meetingSelector = (state: RootState) => state.meeting
export default meetingSlice.reducer
