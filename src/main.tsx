
import { createRoot } from 'react-dom/client'
import './styles/globals.scss'
import '@/app/i18n'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <App />,
)
