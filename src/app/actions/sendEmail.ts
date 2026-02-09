'use server';

import nodemailer from 'nodemailer';
import { serverEnv } from '@/env/serverEnv';
import { clientEnv } from '@/env/clientEnv';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: serverEnv.GMAIL_USER,
    pass: serverEnv.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message || !subject) {
    return { success: false, message: 'Please fill in all fields.' };
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${serverEnv.GMAIL_USER}>`, // Sender address (must be authenticated user)
      to: serverEnv.CONTACT_EMAIL, // List of receivers
      replyTo: email, // Reply to the user's email
      subject: `Email from ${clientEnv.NEXT_PUBLIC_SITE_NAME} - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Server Error:', error);
    return { success: false, message: 'Failed to send email. Please try again.' };
  }
}
