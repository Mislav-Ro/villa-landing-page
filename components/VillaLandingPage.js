import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export default function VillaLandingPage() {
  const [bookedDates, setBookedDates] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch('/api/availability')
        if (!res.ok) throw new Error('Failed to fetch availability')
        const data = await res.json()
        setBookedDates(data.booked || [])
      } catch (err) {
        console.error(err)
        setError('Could not load calendar. Please try again later.')
      }
    }
    fetchAvailability()
  }, [])

  function tileClassName({ date, view }) {
    if (view === 'month') {
      const formatted = date.toISOString().split('T')[0]
      if (bookedDates.includes(formatted)) {
        return 'bg-red-300 text-white rounded-md'
      }
    }
    return ''
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <header className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Villa Serenity</h1>

        <p className="text-lg text-gray-600">
          A luxurious retreat with breathtaking views and modern amenities.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-4xl">
        <img src="/villa1.jpg" alt="Villa exterior" className="rounded-2xl shadow-md" />
        <img src="/villa2.jpg" alt="Villa pool" className="rounded-2xl shadow-md" />
      </section>

      <section className="max-w-2xl w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Availability</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Calendar selectRange={false} tileClassName={tileClassName} />
        )}
        <p className="mt-3 text-sm text-gray-500">* Red dates indicate booked periods.</p>
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
    </div>
  )
}
