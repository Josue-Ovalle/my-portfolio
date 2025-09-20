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

// Enhanced input validation
function validateInput(data) {
  const errors = {};

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Name must not exceed 50 characters';
  } else if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(data.name.trim())) {
    errors.name = 'Name contains invalid characters';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Invalid email address';
  } else if (data.email.length > 254) {
    errors.email = 'Email address too long';
  }

  // Subject validation
  if (!data.subject || typeof data.subject !== 'string') {
    errors.subject = 'Subject is required';
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 100) {
    errors.subject = 'Subject must not exceed 100 characters';
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must not exceed 2000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Enhanced sanitization
function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  
  return value
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove potentially dangerous characters
    .replace(/[<>'"&]/g, (match) => {
      const entities = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return entities[match] || match;
    })
    // Remove excessive whitespace
    .replace(/\s+/g, ' ');
}

// Rate limiting with per-IP tracking
function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 5; // Max 5 requests per hour
  const windowMs = 3600000; // 1 hour

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return { allowed: true, remaining: limit - 1 };
  }

  const data = rateLimitMap.get(ip);
  
  if (now - data.lastRequest > windowMs) {
    // Reset counter if window has passed
    data.count = 1;
    data.lastRequest = now;
    return { allowed: true, remaining: limit - 1 };
  }
  
  if (data.count < limit) {
    data.count++;
    data.lastRequest = now;
    return { allowed: true, remaining: limit - data.count };
  }
  
  return { allowed: false, remaining: 0, retryAfter: windowMs - (now - data.lastRequest) };
}

// Initialize Resend with proper error handling
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') || 
              'unknown';
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(rateLimit.retryAfter / 1000) // seconds
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.retryAfter / 1000).toString()
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email).toLowerCase(),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      budget: body.budget ? sanitizeInput(body.budget) : '',
      timeline: body.timeline ? sanitizeInput(body.timeline) : ''
    };

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 503 }
      );
    }

    // Prepare email data
    const emailData = {
      from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
      to: process.env.TO_EMAIL || 'josueovalle064@gmail.com',
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
              Received: ${new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' })}
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 100px;">Name:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${sanitizedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${sanitizedData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Subject:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${sanitizedData.subject}</td>
              </tr>
              ${sanitizedData.budget ? `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Budget:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${sanitizedData.budget}</td>
              </tr>
              ` : ''}
              ${sanitizedData.timeline ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Timeline:</td>
                <td style="padding: 8px 0; color: #334155;">${sanitizedData.timeline}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #0ea5e9; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
            <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
            <p style="line-height: 1.6; color: #475569; white-space: pre-wrap; margin: 0;">${sanitizedData.message}</p>
          </div>
          
          <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
              This email was sent from your portfolio contact form.<br>
              Reply directly to respond to ${sanitizedData.name} (${sanitizedData.email}).
            </p>
          </div>
        </div>
      `,
      replyTo: sanitizedData.email,
    };

    // Send email
    await resend.emails.send(emailData);

    // Send auto-reply to user
    const autoReplyData = {
      from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
      to: sanitizedData.email,
      subject: 'Thank you for your message - Josué Ovalle',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="color: #0ea5e9; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Your message has been received</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">Hi ${sanitizedData.name},</p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">
            Thank you for reaching out! I've received your message about "<strong>${sanitizedData.subject}</strong>" 
            and I'll get back to you as soon as possible, usually within 24 hours.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0c4a6e; margin: 0 0 10px 0;">Your Message Summary</h3>
            <p style="margin: 5px 0; color: #334155;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
            ${sanitizedData.budget ? `<p style="margin: 5px 0; color: #334155;"><strong>Budget:</strong> ${sanitizedData.budget}</p>` : ''}
            ${sanitizedData.timeline ? `<p style="margin: 5px 0; color: #334155;"><strong>Timeline:</strong> ${sanitizedData.timeline}</p>` : ''}
            <p style="margin: 10px 0 0 0; color: #334155;"><strong>Message:</strong></p>
            <p style="font-style: italic; color: #475569; margin: 5px 0 0 0; white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">
            In the meantime, feel free to check out my recent projects on my 
            <a href="https://josueovalle.com" style="color: #0ea5e9; text-decoration: none;">portfolio</a>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #334155;">
            Looking forward to discussing your project!
          </p>
          
          <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #0ea5e9; font-weight: bold; font-size: 18px;">Josué Ovalle</p>
            <p style="margin: 5px 0 0 0; color: #64748b;">Frontend Developer</p>
            <p style="margin: 5px 0 0 0; color: #64748b;">josueovalle064@gmail.com | Guatemala City, GT</p>
          </div>
        </div>
      `,
    };

    await resend.emails.send(autoReplyData);

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully!',
        timestamp: new Date().toISOString()
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log detailed error info for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }

    // Don't expose internal error details to client
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
        ? 'https://josueovalle.com' 
        : 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Handle GET for API health check
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'Contact API endpoint is working',
      rateLimit: 'Maximum 5 requests per hour per IP'
    },
    { status: 200 }
  );
}