import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Directory from './Directory.jsx'
import Booking from './Booking.jsx'
import Admin from './Admin.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planners" element={<Directory />} />
      <Route path="/planners/:id" element={<Booking />} />
      <Route path="/admin" element={<Admin />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-canvas-dark text-body flex items-center justify-center">
            <div className="text-center">
              <p className="font-num text-primary text-4xl font-bold">404</p>
              <p className="mt-2 text-muted">Page not found.</p>
            </div>
          </div>
        }
      />
    </Routes>
  )
}
