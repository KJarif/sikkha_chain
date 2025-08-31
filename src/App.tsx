import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/home/Header.tsx'
import Home from './pages/Home.tsx'
import Admin from './pages/Admin.tsx'
import Regulator from './pages/Regulator.tsx'
import Report from './pages/Report.tsx'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/regulator" element={<Regulator />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App