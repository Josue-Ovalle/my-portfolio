import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const rateLimitMap = new Map();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.lastRequest > 3600000) { // 1 hour
      rateLimitMap.delete(ip);
    }
  }
}, 3600000); 

// Rate limiting middleware
function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 5; // Max 5 requests per hour
  const windowMs = 3600000; // 1 hour

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }

  const data = rateLimitMap.get(ip);
  
  if (now - data.lastRequest > windowMs) {
    // Reset counter if window has passed
    data.count = 1;
    data.lastRequest = now;
    return true;
  }
  
  if (data.count < limit) {
    data.count++;
    return true;
  }
  
  return false;
}

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs (basic XSS protection)
    const sanitizedData = {
      name: name.trim().replace(/<[^>]*>/g, ''),
      email: email.trim().toLowerCase(),
      subject: subject.trim().replace(/<[^>]*>/g, ''),
      message: message.trim().replace(/<[^>]*>/g, '')
    };

    // Send email using Resend
    const emailData = {
      from: process.env.FROM_EMAIL || 'hello@alexchen.dev',
      to: process.env.TO_EMAIL || 'hello@alexchen.dev',
      subject: `New Contact Form Submission: ${sanitizedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
            <h3 style="color: #334155; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #475569;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f1f5f9; border-radius: 6px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              This email was sent from your portfolio contact form at ${new Date().toLocaleString()}.
              Reply directly to this email to respond to ${sanitizedData.name}.
            </p>
          </div>
        </div>
      `,
      // Set reply-to as the sender's email
      replyTo: sanitizedData.email,
    };

    await resend.emails.send(emailData);

    // Send auto-reply to the user
    const autoReplyData = {
      from: process.env.FROM_EMAIL || 'hello@alexchen.dev',
      to: sanitizedData.email,
      subject: 'Thank you for your message - Josué Ovalle',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            Thank You for Your Message!
          </h2>
          
          <p>Hi ${sanitizedData.name},</p>
          
          <p>Thank you for reaching out! I've received your message about "<strong>${sanitizedData.subject}</strong>" and I'll get back to you as soon as possible, usually within 24 hours.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0c4a6e; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; color: #475569;">${sanitizedData.message}</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://alexchen.dev/#portfolio" style="color: #0ea5e9;">recent projects</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/alexchen" style="color: #0ea5e9;">LinkedIn</a></li>
            <li>Follow me on <a href="https://github.com/alexchen" style="color: #0ea5e9;">GitHub</a></li>
          </ul>
          
          <p>Looking forward to discussing your project!</p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; color: #0ea5e9; font-weight: bold;">Alex Chen</p>
            <p style="margin: 5px 0 0 0; color: #64748b;">AI-Enhanced Web Developer</p>
            <p style="margin: 5px 0 0 0; color: #64748b;">hello@alexchen.dev | San Francisco, CA</p>
          </div>
        </div>
      `,
    };

    await resend.emails.send(autoReplyData);

    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log error details for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working' },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}