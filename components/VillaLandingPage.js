import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

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

      <section className="max-w-2xl w-full text-center">
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
