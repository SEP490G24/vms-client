import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, DepartmentDto, PageableRequest } from '~/interface'
import { DepartmentFilterPayload, departmentService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<DepartmentDto>,
  departments: [] as DepartmentDto[],
  departmentSelected: {} as DepartmentDto
}

export const filterDepartments = createAsyncThunk(
  'department/filter', (arg: {
    filterPayload: DepartmentFilterPayload,
    isPageable?: boolean,
    pageableRequest?: PageableRequest
  }) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return departmentService.filter(filterPayload, isPageable, pageableRequest)
  }
)

export const fetchDepartmentById = createAsyncThunk(
  'department/fetchById', (id: string) => {
    return departmentService.findById(id)
  }
)

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    setDepartmentSelected: (state, action) => {
      state.departmentSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterDepartments.fulfilled, (state, action) => {
        if (action.payload?.data) {
          if (action.payload.data.content) {
            state.pageableResponse = action.payload.data
            state.departments = action.payload.data.content
          } else {
            state.departments = action.payload.data
          }
        }
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.departmentSelected = action.payload.data
        }
      })
  }
})

export const { setDepartmentSelected } = departmentsSlice.actions
export const departmentsSelector = (state: RootState) => state.department
export default departmentsSlice.reducer
