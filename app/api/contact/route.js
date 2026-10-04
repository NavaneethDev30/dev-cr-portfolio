
import nodemailer from "nodemailer";
import dns from "dns";
import { NextResponse } from "next/server";

// Prefer IPv4 for DNS resolution to avoid IPv6 connection issues
dns.setDefaultResultOrder("ipv4first");

// Cache transporter instance across warm serverless function invocations
let transporter = null;

function getTransporter(user, pass) {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Keep TLS certificate verification enabled
      family: 4,
      auth: {
        user,
        pass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 8000,
    });
  }
  return transporter;
}

// Safely escape user input before inserting into HTML emails
const escapeHtml = (value) => {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

// Email validation helper
const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: "Please provide name, email, and message" },
        { status: 400 }
      );
    }

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const EMAIL_USER = (process.env.EMAIL_USER || "").trim();
    const EMAIL_PASS = (process.env.EMAIL_PASS || "").trim();
    const OWNER_EMAIL = EMAIL_USER || "navaneethdev33@gmail.com";

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.error("[Contact API] Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { error: "Email configuration is missing on server" },
        { status: 500 }
      );
    }

    const activeTransporter = getTransporter(EMAIL_USER, EMAIL_PASS);

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br/>");
    const sanitizedHeaderName = trimmedName.replace(/[\r\n]/g, " ");

    // Notification email to website owner/admin
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: OWNER_EMAIL,
      replyTo: `"${sanitizedHeaderName}" <${trimmedEmail}>`,
      subject: `New Portfolio Message from ${sanitizedHeaderName}`,
      text: `New portfolio message\n\nFrom: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h3>You got a new portfolio message</h3>
          <p><strong>From:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #007bff; padding-left: 10px; color: #333;">
            ${safeMessage}
          </blockquote>
        </div>
      `,
    };

    // Thank-you / acknowledgement email to visitor
    const visitorMailOptions = {
      from: `"Navaneeth Dev G" <${EMAIL_USER}>`,
      to: `"${sanitizedHeaderName}" <${trimmedEmail}>`,
      replyTo: EMAIL_USER,
      subject: "Thank you for contacting me!",
      text: `Hi ${trimmedName},\n\nThank you for contacting me 🦇. I received your message and will get back to you as soon as possible.\n\nYour Message:\n${trimmedMessage}\n\nBest regards,\nNavaneeth Dev G`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h3>Hi ${safeName},</h3>
          <p>Thank you for contacting me 🦇. I received your message and will get back to you as soon as possible.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
            ${safeMessage}
          </blockquote>
          <br/>
          <p>Best regards,</p>
          <p><strong>Navaneeth Dev G</strong></p>
        </div>
      `,
    };

    console.log(`[Contact API] Dispatching emails concurrently for visitor: ${trimmedEmail}`);

    // Send both emails concurrently using Promise.allSettled()
    const [adminResult, visitorResult] = await Promise.allSettled([
      activeTransporter.sendMail(adminMailOptions),
      activeTransporter.sendMail(visitorMailOptions),
    ]);

    const adminSuccess = adminResult.status === "fulfilled";
    const visitorSuccess = visitorResult.status === "fulfilled";

    if (adminSuccess) {
      const info = adminResult.value;
      console.log(`[Contact API] Owner Notification Email Status:
  - Recipient: ${OWNER_EMAIL}
  - MessageId: ${info.messageId}
  - Accepted: ${JSON.stringify(info.accepted || [])}
  - Rejected: ${JSON.stringify(info.rejected || [])}
  - Response: ${info.response}`);
    } else {
      console.error(`[Contact API] Owner Notification Email Failed:
  - Recipient: ${OWNER_EMAIL}
  - Error: ${adminResult.reason?.message || adminResult.reason}`);
    }

    if (visitorSuccess) {
      const info = visitorResult.value;
      console.log(`[Contact API] Visitor Acknowledgement Email Status:
  - Recipient: ${trimmedEmail}
  - MessageId: ${info.messageId}
  - Accepted: ${JSON.stringify(info.accepted || [])}
  - Rejected: ${JSON.stringify(info.rejected || [])}
  - Response: ${info.response}`);
    } else {
      console.error(`[Contact API] Visitor Acknowledgement Email Failed:
  - Recipient: ${trimmedEmail}
  - Error: ${visitorResult.reason?.message || visitorResult.reason}`);
    }

    const deliveryStatus = {
      adminNotification: adminSuccess,
      acknowledgement: visitorSuccess,
    };

    if (adminSuccess && visitorSuccess) {
      return NextResponse.json(
        {
          success: true,
          message: "Message sent successfully!",
          deliveryStatus,
        },
        { status: 201 }
      );
    } else if (adminSuccess && !visitorSuccess) {
      return NextResponse.json(
        {
          success: true,
          message: "Message received! (Note: confirmation email could not be delivered to visitor).",
          deliveryStatus,
        },
        { status: 201 }
      );
    } else if (!adminSuccess && visitorSuccess) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to deliver message to administrator.",
          deliveryStatus,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email messages. Please try again later.",
          deliveryStatus,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Contact API] Unexpected error in contact route:", error);
    return NextResponse.json(
      { error: "Internal server error while processing message" },
      { status: 500 }
    );
  }
}


