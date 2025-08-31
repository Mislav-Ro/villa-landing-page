import ical from 'node-ical'

export default async function handler(req, res) {
  try {
    // Multiple iCal sources
    const ICAL_SOURCES = [
      {
        name: 'Booking.com',
        url: 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f'
      },
      {
        name: 'Airbnb',
        url: 'https://www.airbnb.com/calendar/ical/33287681.ics?s=d62b44bb665593bb511faaf0f880fcd0'
      }
    ]
    
    console.log('=== DEBUG: Fetching calendar data from multiple sources ===')
    
    const allBookedDates = new Set() // Use Set to avoid duplicates
    
    // Process each iCal source
    for (const source of ICAL_SOURCES) {
      try {
        console.log(`\n=== Processing ${source.name} ===`)
        console.log('URL:', source.url)
        
        // Fetch with proper headers
        const response = await fetch(source.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/calendar,text/plain,*/*',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        })
        
        console.log(`${source.name} HTTP Response:`, response.status, response.statusText)
        
        if (!response.ok) {
          console.error(`${source.name} HTTP error! status: ${response.status}`)
          continue // Skip this source but continue with others
        }
        
        const icalData = await response.text()
        console.log(`${source.name} iCal data length:`, icalData.length)
        console.log(`${source.name} first 200 chars:`, icalData.substring(0, 200))
        
        // Parse the iCal data
        const data = ical.parseICS(icalData)
        const events = Object.values(data)
        
        console.log(`${source.name}: Found ${events.length} calendar entries`)

        for (const event of events) {
          if (event.type === 'VEVENT') {
            console.log(`${source.name} - Processing event:`, {
              summary: event.summary,
              start: event.start,
              end: event.end,
              dtstart: event.dtstart,
              dtend: event.dtend
            })
            
            // Handle different date formats from different sources
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
              console.log(`${source.name} - Skipping event due to missing dates`)
              continue
            }
            
            console.log(`${source.name} - Parsed dates:`, { startDate, endDate })
            
            // Handle all-day events and multi-day bookings
            let current = new Date(startDate)
            current.setHours(0, 0, 0, 0) // Reset to start of day
            
            const finalEndDate = new Date(endDate)
            finalEndDate.setHours(0, 0, 0, 0) // Reset to start of day
            
            // For all-day events, don't include the end date for single-day events
            if (current.getTime() === finalEndDate.getTime()) {
              const dateString = current.toISOString().split('T')[0]
              console.log(`${source.name} - Adding single date:`, dateString)
              allBookedDates.add(dateString)
            } else {
              // For multi-day events, include all dates except the end date
              while (current < finalEndDate) {
                const dateString = current.toISOString().split('T')[0]
                console.log(`${source.name} - Adding date in range:`, dateString)
                allBookedDates.add(dateString)
                current.setDate(current.getDate() + 1)
              }
            }
          }
        }
        
        console.log(`${source.name} - Completed processing`)
        
      } catch (sourceError) {
        console.error(`Error processing ${source.name}:`, sourceError.message)
        // Continue with other sources even if one fails
      }
    }

    // Convert Set to sorted array
    const bookedDatesArray = Array.from(allBookedDates).sort()
    
    console.log('=== DEBUG: Final Results ===')
    console.log(`Total unique booked dates from all sources: ${bookedDatesArray.length}`)
    console.log('All booked dates:', bookedDatesArray)

    res.status(200).json({ booked: bookedDatesArray })
    
  } catch (err) {
    console.error('=== DEBUG: General Error occurred ===')
    console.error('Error message:', err.message)
    console.error('Full error:', err)
    res.status(500).json({ 
      error: 'Failed to load calendar',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
      debugMessage: err.message
    })
  }
}
