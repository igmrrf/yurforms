
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { createClient } from '@/config/supabase/server'
import { sendgripApiKey } from '@/config/constants'

sgMail.setApiKey(sendgripApiKey)

export async function POST(request: NextRequest) {
  try {
    const data: IContactFormData = await request.json()

    // Validate input
    if (!isValidContactData(data)) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })
    }

    // Store submission in Supabase

    const supabase = await createClient()
    const { error: supabaseError } = await supabase
      .from('waitlist')
      .insert([
        {
          email: data.email,
          name: data.name,
          message: data.message,
        },
      ])

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      return NextResponse.json(
        { error: 'whoops, try again😁' },
        { status: 500 }
      )
    }

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
      await sgMail.send(msg)
    } catch (sendgridError) {
      console.error('SendGrid error:', sendgridError)
      // We still return a success response to the user since we saved their message
      return NextResponse.json(
        {
          message:
            'Message received but there was an error sending email notification',
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Helper function to validate input data
function isValidContactData(data: any): data is IContactFormData {
  return (
    typeof data.fullName === 'string' &&
    data.fullName.trim() !== '' &&
    typeof data.email === 'string' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    typeof data.phoneNumber === 'string' &&
    data.phoneNumber.trim() !== '' &&
    (typeof data.location === 'string' || data.location === undefined) &&
    typeof data.company === 'string' &&
    data.company.trim() !== '' &&
    typeof data.website === 'string' &&
    data.website.trim() !== '' &&
    typeof data.project === 'string' &&
    data.project.trim() !== ''
  )
}
