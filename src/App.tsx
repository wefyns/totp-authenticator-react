import i18n from 'i18next'
import * as Yup from 'yup'
import * as Locales from 'yup-locales'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { GuestRoute } from './config/routes/index'
import { TotpPage } from './pages/totp'

function App(): JSX.Element {
  const locales: Record<string, Yup.LocaleObject> = { ...Locales }
  Yup?.setLocale(locales[i18n.language ?? 'ru'])

  return (
    <Router>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <TotpPage />
              </GuestRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  )
}

export default App
