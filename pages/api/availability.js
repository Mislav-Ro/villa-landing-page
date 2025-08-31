import ical from 'node-ical'

export default async function handler(req, res) {
  try {
    const ICAL_URL = 'https://ical.booking.com/v1/export?t=af103c92-e046-4e15-88de-d565f430045f' // TODO: replace with your iCal URL
    const data = await ical.async.fromURL(ICAL_URL)

    const booked = []
    for (const event of Object.values(data)) {
      if (event.type === 'VEVENT') {
        const start = new Date(event.start)
        const end = new Date(event.end)
        let current = new Date(start)
        while (current < end) {
          booked.push(current.toISOString().split('T')[0])
          current.setDate(current.getDate() + 1)
        }
      }
    }

    res.status(200).json({ booked })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load calendar' })
  }
}
