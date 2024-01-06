import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

import App from './App'
import { store } from './store'
import { persistor } from './store/store'

import { AlertProvider } from './common/alert'
import { ThemeWrap } from './config/theme'
import './styles/global.css'

dayjs.extend(isYesterday)
dayjs.extend(isToday)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeWrap>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ThemeWrap>
    </PersistGate>
  </Provider>
)
