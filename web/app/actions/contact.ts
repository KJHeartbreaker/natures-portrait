'use server'

import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.CONTACT_FORM_TO ?? ''

export type ContactFormState =
  | {status: 'idle'}
  | {status: 'success'}
  | {status: 'error'; message: string}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token) return false
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  })
  const data = await res.json()
  return data.success === true && (data.score ?? 0) >= 0.5
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const subject = String(formData.get('subject') ?? 'New message from naturesportrait.ca').trim()
  const recaptchaToken = String(formData.get('recaptchaToken') ?? '')

  if (!name || !email || !message) {
    return {status: 'error', message: 'Please fill in all fields.'}
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {status: 'error', message: 'Please enter a valid email address.'}
  }

  const human = await verifyRecaptcha(recaptchaToken)
  if (!human) {
    return {status: 'error', message: "We couldn't verify your request. Please try again."}
  }

  try {
    const {error} = await resend.emails.send({
      from: 'Nature\'s Portrait <onboarding@resend.dev>',
      to: TO,
      replyTo: email,
      subject: `${subject} — ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${message}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {status: 'error', message: 'Something went wrong. Please try again.'}
    }

    return {status: 'success'}
  } catch (err) {
    console.error('Contact form error:', err)
    return {status: 'error', message: 'Something went wrong. Please try again.'}
  }
}
