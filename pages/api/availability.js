import ical from 'node-ical'

export default async function handler(req, res) {
  try {
    const ICAL_URL = 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f'
    
    console.log('Fetching calendar data from:', ICAL_URL)
    
    // Fetch with proper headers to handle Booking.com's requirements
    const response = await fetch(ICAL_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/calendar,text/plain,*/*',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const icalData = await response.text()
    console.log('Raw iCal data length:', icalData.length)
    console.log('First 200 chars of iCal data:', icalData.substring(0, 200))
    
    // Parse the iCal data
    const data = ical.parseICS(icalData)
    console.log('Calendar data received, processing events...')

    const booked = []
    const events = Object.values(data)
    
    console.log(`Found ${events.length} calendar entries`)

    for (const event of events) {
      if (event.type === 'VEVENT') {
        console.log('Processing event:', {
          summary: event.summary,
          start: event.start,
          end: event.end,
          dtstart: event.dtstart,
          dtend: event.dtend
        })
        
        // Handle different date formats from Booking.com
        let startDate, endDate
        
        if (event.start) {
          startDate = new Date(event.start)
        } else if (event.dtstart) {
          startDate = event.dtstart.type === 'date-time' ? new Date(event.dtstart.val) : new Date(event.dtstart.val)
        }
        
        if (event.end) {
          endDate = new Date(event.end)
        } else if (event.dtend) {
          endDate = event.dtend.type === 'date-time' ? new Date(event.dtend.val) : new Date(event.dtend.val)
        }
        
        if (!startDate || !endDate) {
          console.log('Skipping event due to missing dates')
          continue
        }
        
        console.log('Parsed dates:', { startDate, endDate })
        
        // Handle all-day events and multi-day bookings
        let current = new Date(startDate)
        current.setHours(0, 0, 0, 0) // Reset to start of day
        
        const finalEndDate = new Date(endDate)
        finalEndDate.setHours(0, 0, 0, 0) // Reset to start of day
        
        // For all-day events, don't include the end date
        if (current.getTime() === finalEndDate.getTime()) {
          const dateString = current.toISOString().split('T')[0]
          if (!booked.includes(dateString)) {
            booked.push(dateString)
          }
        } else {
          while (current < finalEndDate) {
            const dateString = current.toISOString().split('T')[0]
            if (!booked.includes(dateString)) {
              booked.push(dateString)
            }
            current.setDate(current.getDate() + 1)
          }
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
