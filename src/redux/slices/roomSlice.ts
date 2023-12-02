import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, RoomDto } from '~/interface'
import { RoomFilterPayload, roomService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<RoomDto>,
  rooms: [] as RoomDto[],
  roomSelected: {} as RoomDto
}

export const filterRooms = createAsyncThunk(
  'room/filter', (arg: any) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return roomService.filter(filterPayload || {}, isPageable, pageableRequest)
  }
)

export const findAllRoom = createAsyncThunk(
  'room/findAll', (filterPayload: RoomFilterPayload) => {
    return roomService.filter(filterPayload)
  }
)

export const fetchRoomById = createAsyncThunk(
  'room/fetchById', (id: string) => {
    return roomService.findById(id)
  }
)

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomSelected: (state, action) => {
      state.roomSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterRooms.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.rooms = action.payload.data.content
        }
      })
      .addCase(findAllRoom.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.rooms = action.payload.data
        }
      })
      .addCase(fetchRoomById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.roomSelected = action.payload.data
        }
      })
  }
})

export const { setRoomSelected } = roomsSlice.actions
export const roomsSelector = (state: RootState) => state.room
export default roomsSlice.reducer
