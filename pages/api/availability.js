import ical from 'node-ical'

export default async function handler(req, res) {
  try {
    const ICAL_URL = 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f'
    
    console.log('Fetching calendar data from:', ICAL_URL)
    
    const data = await ical.async.fromURL(ICAL_URL)
    console.log('Calendar data received, processing events...')

    const booked = []
    const events = Object.values(data)
    
    console.log(`Found ${events.length} calendar entries`)

    for (const event of events) {
      if (event.type === 'VEVENT') {
        console.log('Processing event:', event.summary, event.start, event.end)
        
        const start = new Date(event.start)
        const end = new Date(event.end)
        
        // Handle all-day events and multi-day bookings
        let current = new Date(start)
        current.setHours(0, 0, 0, 0) // Reset to start of day
        
        const endDate = new Date(end)
        endDate.setHours(0, 0, 0, 0) // Reset to start of day
        
        while (current <= endDate) {
          const dateString = current.toISOString().split('T')[0]
          if (!booked.includes(dateString)) {
            booked.push(dateString)
          }
          current.setDate(current.getDate() + 1)
        }
      }
    }

    console.log(`Total booked dates: ${booked.length}`)
    console.log('Booked dates:', booked.slice(0, 10)) // Log first 10 dates

    res.status(200).json({ booked: booked.sort() })
  } catch (err) {
    console.error('Error fetching calendar:', err.message)
    console.error('Full error:', err)
    res.status(500).json({ 
      error: 'Failed to load calendar',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
}
