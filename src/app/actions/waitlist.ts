"use server"
import sgMail from '@sendgrid/mail'
import { createClient } from '@/config/supabase/server'
import { sendgripApiKey } from '@/config/constants'

sgMail.setApiKey(sendgripApiKey)

export async function addToWaitlist(data: IContactFormData) {
  try {

    // Validate input
    if (!isValidContactData(data)) {
      return { success: false, message: "invalid input data" }
    }

    // Store submission in Supabase

    const supabase = await createClient()
    const response = await supabase
      .from('waitlist')
      .insert(
        {
          email: data.email,
          name: data.name,
          message: data.message,
        },
      )
    console.log({ response });
    const supabaseError = response.error

    // Send email using SendGrid
    const msg: sgMail.MailDataRequired = {
      to: 'business@ajianlabs.com',
      from: 'noreply@ajianlabs.com',
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.message}
        `,
    }

    try {
      const res = await sgMail.send(msg)
      console.log({ res });
    } catch (sendgridError) {
      console.error('SendGrid error:', sendgridError)
      // We still return a success response to the user since we saved their message
      console.log(
        {
          success: false,
          message:
            'Message received but there was an error sending email notification',
        })
    }

    if (supabaseError) {
      if (supabaseError.details.includes('already exists')) {
        return { success: false, message: "you're already with us😁" }
      }
      console.error('Supabase error:', supabaseError)
      return { success: false, message: "whoops, try again😁" }
    }


    return { success: true, message: 'Thank you for joining us.' }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { message: 'An unexpected error occurred', success: false }
  }
}

// Helper function to validate input data
function isValidContactData(data: any): data is IContactFormData {
  return (
    typeof data.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
}
