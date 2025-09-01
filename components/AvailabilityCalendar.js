import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function AvailabilityCalendar() {
  const [bookedDates, setBookedDates] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarValue, setCalendarValue] = useState(new Date())

  useEffect(() => {
    async function fetchAvailability() {
      try {
        console.log('Fetching availability data...')
        const res = await fetch('/api/availability')
        if (!res.ok) throw new Error(`Failed to fetch availability: ${res.status}`)
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

  // Check if a date is booked
  const isDateBooked = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formatted = `${year}-${month}-${day}`
    return bookedDates.includes(formatted)
  }

  // Check if a date is in the past
  const isDateInPast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  function tileClassName({ date, view }) {
    if (view === 'month') {
      const classes = []
      
      if (isDateBooked(date)) {
        classes.push('booked-date')
      } else if (isDateInPast(date)) {
        classes.push('past-date')
      } else {
        classes.push('available-date')
      }
      
      return classes.join(' ')
    }
    return ''
  }

  function tileDisabled({ date, view }) {
    if (view === 'month') {
      return isDateBooked(date) || isDateInPast(date)
    }
    return false
  }

  const handleDateClick = (date) => {
    if (!isDateBooked(date) && !isDateInPast(date)) {
      setSelectedDate(date)
    }
  }

  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getAvailableStats = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const next30Days = new Date(today)
    next30Days.setDate(next30Days.getDate() + 30)
    
    let availableDays = 0
    let current = new Date(today)
    
    while (current <= next30Days) {
      if (!isDateBooked(current)) {
        availableDays++
      }
      current.setDate(current.getDate() + 1)
    }
    
    return { availableDays, totalDays: 30 }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Availability Calendar</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading calendar...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Availability Calendar</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-500 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const stats = getAvailableStats()

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-gray-700">Availability Calendar</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Available ({stats.availableDays} days in next 30)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span>Booked ({bookedDates.length} total dates)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
            <span>Past dates</span>
          </div>
        </div>
      </div>
      
      <div className="calendar-container mb-4">
        <Calendar 
          value={calendarValue}
          onChange={setCalendarValue}
          onClickDay={handleDateClick}
          selectRange={false} 
          tileClassName={tileClassName}
          tileDisabled={tileDisabled}
          minDate={new Date()}
          locale="en-US"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
        />
      </div>
      
      {selectedDate && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Selected Date</h3>
          <p className="text-blue-700">{formatDateForDisplay(selectedDate)}</p>
          <p className="text-sm text-blue-600 mt-2">
            This date appears to be available! Contact us to make a booking.
          </p>
        </div>
      )}
      
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
          <div>
            <p className="font-medium">Available dates</p>
            <p className="text-xs">Click on available dates to select and inquire about booking</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
          <div>
            <p className="font-medium">Blocked dates</p>
            <p className="text-xs">These dates are not available for booking</p>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Calendar data is updated in real-time from our booking platforms.
            {bookedDates.length > 0 && ` Last updated: ${new Date().toLocaleDateString()}`}
          </p>
        </div>
      </div>

      {/* Custom CSS styles for the calendar */}
      <style jsx>{`
        .calendar-container :global(.available-date) {
          background-color: #22c55e !important;
          color: white !important;
          border-radius: 4px;
        }
        
        .calendar-container :global(.available-date:hover) {
          background-color: #16a34a !important;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }
        
        .calendar-container :global(.booked-date) {
          background-color: #ef4444 !important;
          color: white !important;
          border-radius: 4px;
        }
        
        .calendar-container :global(.past-date) {
          background-color: #d1d5db !important;
          color: #6b7280 !important;
          border-radius: 4px;
        }
        
        .calendar-container :global(.react-calendar__tile:disabled) {
          cursor: not-allowed !important;
        }
        
        .calendar-container :global(.react-calendar__tile:disabled:hover) {
          background-color: inherit !important;
          transform: none !important;
        }
        
        .calendar-container :global(.react-calendar__navigation button) {
          color: #374151;
          font-weight: 600;
        }
        
        .calendar-container :global(.react-calendar__navigation button:hover) {
          background-color: #f3f4f6;
        }
        
        .calendar-container :global(.react-calendar__month-view__weekdays) {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          color: #6b7280;
        }
      `}</style>
    </div>
  )
}
