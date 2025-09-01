export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { title, message, contact } = req.body

  if (!title || !message || !contact) {
    return res.status(400).json({ error: 'Title, message, and contact information are required' })
  }

  try {
    console.log('=== New Contact Form Submission ===')
    console.log('Subject:', title)
    console.log('Contact:', contact)
    console.log('Message:', message)
    console.log('Timestamp:', new Date().toISOString())
    
    const formspreeResponse = await fetch('https://formspree.io/f/mvgbqqgk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `Villa Esquel: ${title}`,
        message: `Contact Information: ${contact}\n\nMessage:\n${message}`,
        contact: contact, // Include contact as separate field for Formspree
        _replyto: 'noreply@villa-esquel.com',
        _subject: `Villa Esquel Inquiry: ${title}`
      })
    })
    
    console.log('Formspree response status:', formspreeResponse.status)
    
    if (!formspreeResponse.ok) {
      const errorText = await formspreeResponse.text()
      console.error('Formspree error:', errorText)
      throw new Error(`Failed to send via Formspree: ${formspreeResponse.status}`)
    }
    
    const result = await formspreeResponse.json()
    console.log('Formspree success:', result)
    
    // Send success response back to frontend
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    })
    
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send email. Please try again or contact us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
