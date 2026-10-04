import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const OWNER_EMAIL = 'navaneethdev33@gmail.com';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials are not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    await Promise.all([
      // Notification email to you.
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <h3>You got a new portfolio message</h3>
          <p><strong>From:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #333;">
            ${safeMessage}
          </blockquote>
        `,
      }),

      // Thank-you email to the person who contacted you.
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, 
        subject: 'Thank you for contacting me!',
        html: `
          <h3>Hi ${safeName},</h3>
          <p>Thank you for contacting me 🦇. I received your message and will get back to you as soon as possible.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
            ${safeMessage}
          </blockquote>
          <br/>
          <p>Best regards,</p>
          <p>Navaneeth Dev G</p>
        `,
      })
    ]);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
