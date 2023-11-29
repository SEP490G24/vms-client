import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/redux'
import { PageableResponse, CustomerDto } from '~/interface'
import { CustomerAvailablePayload, customerService } from '~/service'

const initialState = {
  pageableResponse: {} as PageableResponse<CustomerDto>,
  customers: [] as CustomerDto[],
  customerSelected: {} as CustomerDto
}

export const filterCustomers = createAsyncThunk(
  'customer/filter', (arg: any) => {
    const { filterPayload, isPageable, pageableRequest } = arg
    return customerService.filter(filterPayload || {}, isPageable, pageableRequest)
  }
)

export const fetchCustomerById = createAsyncThunk(
  'customer/fetchById', (id: string) => {
    return customerService.findById(id)
  }
)

export const fetchAllCustomerAvailable = createAsyncThunk(
  'customer/fetchAllAvailable', (args: CustomerAvailablePayload) => {
    return customerService.findCustomerAvailable(args)
  }
)

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomerSelected: (state, action) => {
      state.customerSelected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterCustomers.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.pageableResponse = action.payload.data
          state.customers = action.payload.data.content
        }
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.customerSelected = action.payload.data
        }
      })
      .addCase(fetchAllCustomerAvailable.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.customers = action.payload.data
        }
      })
  }
})

export const { setCustomerSelected } = customersSlice.actions
export const customersSelector = (state: RootState) => state.customer
export default customersSlice.reducer
