import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { settingGroupService, settingService, settingSiteService } from '~/service'
import { SettingDto, SettingGroupDto, SettingSiteDto } from '~/interface/Setting.ts'

const initialState = {
  settingGroup: [] as SettingGroupDto[],
  settings: [] as SettingDto[],
  settingSiteValue: {} as SettingSiteDto
}

export const fetchSettingGroup = createAsyncThunk(
  'setting/fetchSettingGroup', () => {
    return settingGroupService.findAll()
  }
)

export const fetchSettingsByGroupId = createAsyncThunk(
  'setting/fetchSettingsByGroupId', (groupId: number) => {
    return settingService.findAll(groupId)
  }
)

export const findAllSettingSiteValueByGroupId = createAsyncThunk(
  'setting/findAllSettingSiteValueByGroupId', (arg: { groupId: number, siteId?: string }) => {
    const { groupId, siteId } = arg
    return settingSiteService.findAllByGroupId(groupId, siteId)
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingGroup.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.settingGroup = action.payload.data
        }
      })
      .addCase(fetchSettingsByGroupId.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.settings = action.payload.data
        }
      })
      .addCase(findAllSettingSiteValueByGroupId.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.settingSiteValue = action.payload.data
        }
      })
  }
})

export const {} = settingsSlice.actions
export const settingsSelector = (state: RootState) => state.setting
export default settingsSlice.reducer
