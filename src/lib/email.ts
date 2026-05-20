// src/lib/email.ts
import { Resend } from 'resend';

// NOTE: Resend API key will be provided via environment variable once board provides secrets
const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder_key');

export async function sendContactEmail({ name, email, message }: { name: string; email: string; message: string }) {
  try {
    await resend.emails.send({
      from: 'contact@sebastianweszler.com',
      to: 'sebastian@weszler.com',
      subject: `New contact from ${name}`,
      text: `Name: ${name}
Email: ${email}
Message: ${message}`,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
