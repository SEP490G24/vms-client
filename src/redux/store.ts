import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import userReduce from './slices/userSlice'
import organizationReduce from './slices/organizationSlice'
import siteReduce from './slices/siteSlice'
import departmentReduce from './slices/departmentSlice'
import roomReduce from './slices/roomSlice'
import roleReduce from './slices/roleSlice'
import locationReduce from './slices/locationSlice'
import settingReduce from './slices/settingSlice'
import meetingReduce from './slices/meetingSlice'
import customerReduce from './slices/customerSlice'
import reasonReduce from './slices/reasonSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme']
}

const rootReducer = combineReducers({
  auth: authReducer,
  themeMode: themeReducer,
  user: userReduce,
  organization: organizationReduce,
  site: siteReduce,
  department: departmentReduce,
  room: roomReduce,
  role: roleReduce,
  location: locationReduce,
  setting: settingReduce,
  meeting: meetingReduce,
  customer: customerReduce,
  reason: reasonReduce
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persist = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
