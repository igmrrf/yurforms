"use server"
import sgMail from '@sendgrid/mail'
import { createServer } from '@/config/supabase/server'
import { sendgripApiKey, notificationEmail, systemEmail } from '@/config/constants'

sgMail.setApiKey(sendgripApiKey)

// Add proper type definition
interface IContactFormData {
  name: string;
  email: string;
  message?: string;
}

export async function addToWaitlist(data: IContactFormData) {
  try {
    const validationError = isValidContactData(data)
    if (validationError) {
      return { success: false, message: validationError }
    }

    const supabase = createServer()
    const response = await supabase
      .from('waitlist')
      .insert({
        email: data.email.toLowerCase().trim(),
        name: data.name.trim(),
        message: data.message?.trim(),
      })

    if (response.error) {
      if (response.error.details?.includes('already exists')) {
        return { success: false, message: "You're already with us 😁" }
      }
      console.error('Supabase error:', response.error)
      return { success: false, message: "Something went wrong, please try again" }
    }

    // Send email notification
    try {
      await sgMail.send({
        to: notificationEmail,
        from: systemEmail,
        subject: `New Waitlist Signup: ${data.name}`,
        text: `
Name: ${data.name}
Email: ${data.email}
Message: ${data.message || 'No message provided'}
        `.trim(),
      })
    } catch (error) {
      console.error('SendGrid error:', error)
    }

    return { success: true, message: 'Welcome to YurForms! 🎉' }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, message: 'Something went wrong, please try again' }
  }
}

function isValidContactData(data: any): string | null {
  if (!data) {
    return "Invalid form data"
  }

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    return "Please provide your name"
  }

  if (!data.email || typeof data.email !== 'string') {
    return "Please provide your email address"
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return "Please provide a valid email address"
  }

  if (data.message !== undefined && typeof data.message !== 'string') {
    return "Message must be text"
  }

  return null
}
