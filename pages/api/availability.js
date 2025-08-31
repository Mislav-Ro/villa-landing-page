import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState({
    title: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in both title and message.' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Your message has been sent successfully!' })
        setFormData({ title: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Send us a message</h2>
      
      {submitStatus && (
        <div className={`mb-4 p-3 rounded ${
          submitStatus.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300' 
            : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {submitStatus.message}
        </div>
      )}

      <div onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Booking inquiry for September"
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            placeholder="Tell us about your booking dates, number of guests, or any special requirements..."
            disabled={isSubmitting}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Or email us directly at:</p>
        <a href="mailto:mislavrogulj@gmail.com" className="text-blue-500 hover:underline">
          mislavrogulj@gmail.com
        </a>
      </div>
    </div>
  )
}

export default function VillaLandingPage() {
  const [bookedDates, setBookedDates] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        console.log('Fetching availability data...')
        const res = await fetch('/api/availability')
        if (!res.ok) throw new Error('Failed to fetch availability')
        const data = await res.json()
        console.log('Received availability data:', data)
        setBookedDates(data.booked || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching availability:', err)
        setError('Could not load calendar. Please try again later.')
        setLoading(false)
      }
    }
    fetchAvailability()
  }, [])

  function tileClassName({ date, view }) {
    if (view === 'month') {
      // Format the date to match the API format (YYYY-MM-DD)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formatted = `${year}-${month}-${day}`
      
      console.log('Checking date:', formatted, 'Is booked:', bookedDates.includes(formatted))
      
      if (bookedDates.includes(formatted)) {
        return 'booked-date'
      }
    }
    return ''
  }

  function tileDisabled({ date, view }) {
    if (view === 'month') {
      // Format the date to match the API format (YYYY-MM-DD)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formatted = `${year}-${month}-${day}`
      
      return bookedDates.includes(formatted)
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Villa Esquel</h1>
        <p className="text-lg text-gray-600">
          A luxurious retreat with breathtaking views and modern amenities.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-4xl">
        <img src="/villa1.jpg" alt="Villa exterior" className="rounded-2xl shadow-md" />
        <img src="/villa2.jpg" alt="Villa pool" className="rounded-2xl shadow-md" />
      </section>

      <section className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Availability Calendar */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Availability Calendar</h2>
            
            {loading && (
              <p className="text-gray-500 mb-4">Loading calendar...</p>
            )}
            
            {error ? (
              <p className="text-red-500 mb-4">{error}</p>
            ) : (
              <div className="calendar-container">
                <Calendar 
                  selectRange={false} 
                  tileClassName={tileClassName}
                  tileDisabled={tileDisabled}
                  minDate={new Date()}
                />
              </div>
            )}
            
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>🔴 Red dates are not available for booking</p>
              <p>📅 Click on available dates to check pricing</p>
              {bookedDates.length > 0 && (
                <p className="text-xs">
                  Debug: {bookedDates.length} blocked dates loaded
                </p>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      <footer className="mt-12 max-w-xl text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact</h2>
        <p className="text-gray-600">
          For inquiries, please email us at
          <a href="mailto:mislavrogulj@gmail.com" className="text-blue-500 hover:underline ml-1">
            mislavrogulj@gmail.com
          </a>
        </p>
      </footer>

      <style jsx>{`
        .calendar-container :global(.booked-date) {
          background-color: #ef4444 !important;
          color: white !important;
          border-radius: 4px;
        }
        
        .calendar-container :global(.react-calendar__tile:disabled) {
          background-color: #fca5a5 !important;
          color: #7f1d1d !important;
          cursor: not-allowed;
        }
        
        .calendar-container :global(.react-calendar__tile:disabled:hover) {
          background-color: #ef4444 !important;
        }
      `}</style>
    </div>
  )
}
