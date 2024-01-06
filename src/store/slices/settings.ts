import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface SettingsState {
  language: string
  token: string | null
  theme: 'light' | 'dark'
}

const initialState: SettingsState = {
  token: null,
  theme: 'light',
  language: localStorage.getItem('i18nextLng') ?? navigator.language.split('-')[0],
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state: SettingsState, action: PayloadAction<string>) {
      state.language = action.payload
    },
    setToken(state: SettingsState, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setTheme(state: SettingsState, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
  },
})

const settingsStore = (store: RootState): SettingsState => store.settings

export const selectToken = createSelector([settingsStore], store => store?.token)
export const selectTheme = createSelector([settingsStore], store => store?.theme)

export const {
  reducer: settingsReducer,
  actions: { setLanguage, setTheme, setToken },
} = settingsSlice
