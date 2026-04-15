import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StasPayProvider } from 'stas-pay'
import { BrowserRouter, Routes, Route } from 'react-router'
import { RedstoneProvider } from '@prohetamine/redstone'
import App from './app.jsx'
import Home from './pages/home.jsx'
import Create from './pages/create.jsx'
import Prediction from './pages/prediction.jsx'
import { SelectIdProvider } from './lib/select-id.jsx'
import { LanguageProvider } from './lib/language'
import { LoadingProvider } from './lib/loading.jsx'
import './index.css'

const config = {
  metadata: {
    name: 'Crypto Tarot',
    description: 'Web3 DApp tarot',
    url: 'https://tarot.prohetamine.ru',
    icons: ['https://tarot.prohetamine.ru/icon.svg']
  },
  projectId: '1febfd92481d4ea997711d2ac4a363c0',
  host: '/crypto-tarot-testnet-00000/'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <LanguageProvider>
        <SelectIdProvider>
          <RedstoneProvider config={config}>
            <StasPayProvider>
              <BrowserRouter basename='/'>
                <Routes>
                  <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/prediction/:dataBase64' element={<Prediction />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </StasPayProvider>
          </RedstoneProvider>
        </SelectIdProvider>
      </LanguageProvider>
    </LoadingProvider>
  </StrictMode>
)