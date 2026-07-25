import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import About from './About.jsx'
import Services from './Services.jsx'
import Gallery from './Gallery.jsx'
import Contact from './Contact.jsx'
import Directory from './Directory.jsx'
import Booking from './Booking.jsx'
import Admin from './Admin.jsx'
import Navbar from './Navbar.jsx'
import SEO from './SEO.jsx'

function NotFound() {
  return (
    <div className="min-h-screen bg-canvas-dark text-body flex flex-col">
      <SEO title="Page Not Found" description="This page doesn't exist." path="/404" noindex />
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center px-4">
        <div>
          <p className="font-num text-primary text-4xl font-bold">404</p>
          <p className="mt-2 text-muted">This page doesn't exist.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-pill bg-primary hover:bg-primary-active text-on-primary font-semibold text-sm px-6 py-3 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/planners" element={<Directory />} />
      <Route path="/planners/:id" element={<Booking />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
