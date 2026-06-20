import nodemailer from "nodemailer";
import dns from "dns";
import { NextResponse } from "next/server";

// Force Node.js to prefer IPv4 over IPv6 to prevent ENETUNREACH errors
dns.setDefaultResultOrder('ipv4first');

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please provide name, email, and message" }, { status: 400 });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4, // Force IPv4
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email to the user (Acknowledgement)
    const senderMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out🦇! I have received your message and I'll get back to you soon.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          ${message}
        </blockquote>
      `,
    };

    // Email to the admin (You)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #333;">
          ${message}
        </blockquote>
      `,
    };

    // Send emails simultaneously
    await Promise.all([
      transporter.sendMail(senderMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    }, { status: 201 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
