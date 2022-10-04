import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import Cta from './components/Cta'
import Layout from './components/Layout'
import Login from './components/Login'
import Footer from './components/Footer'
import 'normalize.css'
import './index.css'

const root = document.getElementById('root') as HTMLDivElement

ReactDOM.createRoot(root).render(
  <Footer>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/cta" element={<Cta />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Footer>
)
