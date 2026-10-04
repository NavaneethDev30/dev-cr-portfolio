import nodemailer from "nodemailer";
import dns from "dns";
import Contact from "../models/contact.model.js";
import { EMAIL_USER, EMAIL_PASS } from "../config/env.js";

// Force Node.js to prefer IPv4 over IPv6 to prevent ENETUNREACH errors with Gmail
dns.setDefaultResultOrder('ipv4first');

export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      const error = new Error("Please provide name, email, and message");
      error.statusCode = 400;
      throw error;
    }

    // Save contact to database
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // Configure Nodemailer transporter
    // Assumes using Gmail. If using another service, update the 'service' property.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4, // Force IPv4 to prevent ENETUNREACH on Render
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // HTML Email Template for the sender (Acknowledgement)
    const senderMailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out! I have received your message and I'll get back to you as soon as possible🦇.</p>
        <p><strong>Your Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          ${message}
        </blockquote>
        <br/>
        <p>Best regards,</p>
        <p>Navaneeth Dev G</p>
      `,
    };

    // HTML Email Template for the admin (You)
    const adminMailOptions = {
      from: EMAIL_USER,
      to: "navaneethdev33@gmail.com", // Send to your email
      subject: `New Portfolio Message from ${name}`,
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

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};
