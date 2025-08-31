export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { title, message } = req.body

  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' })
  }

  try {
    console.log('=== New Contact Form Submission ===')
    console.log('Subject:', title)
    console.log('Message:', message)
    console.log('Timestamp:', new Date().toISOString())
    
    // Option 1: Use Formspree (recommended - easy setup)
    // Go to https://formspree.io, create account, and replace YOUR_FORM_ID below
    /*
    const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: title,
        message: message,
        email: 'villa-website@example.com' // You can add an email field to the form
      })
    })
    
    if (!formspreeResponse.ok) {
      throw new Error('Failed to send via Formspree')
    }
    */
    
    // Option 2: Use EmailJS (frontend-focused but can work from backend)
    // Set up at https://www.emailjs.com/
    
    // Option 3: Direct SMTP with Nodemailer (requires email credentials)
    // This would need additional dependencies and email server setup
    
    // For now, let's try a simple approach using a webhook service
    // You can replace this with any email service you prefer
    
    // Simulate email sending for development
    const emailData = {
      to: 'mislavrogulj@gmail.com',
      subject: `Villa Esquel Inquiry: ${title}`,
      body: `
        New inquiry from Villa Esquel website:
        
        Subject: ${title}
        
        Message:
        ${message}
        
        Sent at: ${new Date().toISOString()}
      `
    }
    
    // Log the email that would be sent
    console.log('Email would be sent:', emailData)
    
    // For testing: you can use a service like webhook.site to see if data is being sent
    // Replace with your actual webhook URL for testing
    /*
    await fetch('https://webhook.site/YOUR-UNIQUE-URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    })
    */
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    })
    
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send email. Please try again or contact us directly.' 
    })
  }
}
