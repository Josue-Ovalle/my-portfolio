import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { headers } from 'next/headers';

// In-memory rate limiting store (use Redis in production)
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

// Comprehensive input validation schema
const validationSchema = {
  name: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    sanitize: true
  },
  email: {
    required: true,
    type: 'email',
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    sanitize: true
  },
  subject: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 100,
    sanitize: true
  },
  message: {
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 2000,
    sanitize: true
  },
  budget: {
    required: false,
    type: 'string',
    maxLength: 50,
    sanitize: true
  },
  timeline: {
    required: false,
    type: 'string',
    maxLength: 50,
    sanitize: true
  }
};

// Enhanced sanitization function
function sanitizeInput(value, fieldName) {
  if (typeof value !== 'string') return '';
  
  // Basic HTML entity encoding
  let sanitized = value
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;');

  // Remove potential script injections
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');

  return sanitized;
}

// Enhanced validation function
function validateInput(data) {
  const errors = {};
  const sanitizedData = {};

  for (const [field, rules] of Object.entries(validationSchema)) {
    const value = data[field];

    // Check required fields
    if (rules.required && (!value || typeof value !== 'string' || value.trim().length === 0)) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      continue;
    }

    // Skip validation for optional empty fields
    if (!rules.required && (!value || value.trim().length === 0)) {
      sanitizedData[field] = '';
      continue;
    }

    const trimmedValue = value.toString().trim();

    // Length validation
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
      continue;
    }

    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must not exceed ${rules.maxLength} characters`;
      continue;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      if (rules.type === 'email') {
        errors[field] = 'Invalid email address format';
      } else {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} contains invalid characters`;
      }
      continue;
    }

    // Sanitize the input
    sanitizedData[field] = rules.sanitize ? sanitizeInput(trimmedValue, field) : trimmedValue;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData
  };
}

// Rate limiting with enhanced security
function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 5; // Max 5 requests per hour
  const windowMs = 3600000; // 1 hour
  const blockDuration = 3600000; // Block for 1 hour after limit exceeded

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now, blocked: false });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  const data = rateLimitMap.get(ip);
  
  // Check if IP is currently blocked
  if (data.blocked && (now - data.lastRequest) < blockDuration) {
    return { 
      allowed: false, 
      remaining: 0, 
      retryAfter: blockDuration - (now - data.lastRequest),
      blocked: true 
    };
  }

  // Reset if window has passed
  if (now - data.lastRequest > windowMs) {
    data.count = 1;
    data.lastRequest = now;
    data.blocked = false;
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }
  
  if (data.count < limit) {
    data.count++;
    data.lastRequest = now;
    return { allowed: true, remaining: limit - data.count, retryAfter: 0 };
  }
  
  // Block the IP
  data.blocked = true;
  data.lastRequest = now;
  
  return { 
    allowed: false, 
    remaining: 0, 
    retryAfter: windowMs - (now - data.lastRequest),
    blocked: true 
  };
}

// Initialize Resend with error handling
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get client IP with multiple fallbacks
function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return forwarded?.split(',')[0]?.trim() || 
         cfConnectingIP || 
         realIP || 
         '127.0.0.1';
}

export async function POST(request) {
  try {
    // Get client IP
    const ip = getClientIP(request);
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      const message = rateLimit.blocked 
        ? 'IP temporarily blocked due to too many requests'
        : 'Rate limit exceeded. Please try again later.';
        
      return NextResponse.json(
        { 
          error: message,
          retryAfter: Math.ceil(rateLimit.retryAfter / 1000),
          blocked: rateLimit.blocked || false
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimit.retryAfter / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(Date.now() + rateLimit.retryAfter).toISOString()
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      const text = await request.text();
      if (!text.trim()) {
        return NextResponse.json(
          { error: 'Request body is required' },
          { status: 400 }
        );
      }
      body = JSON.parse(text);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { 
          status: 400,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString()
          }
        }
      );
    }

    const { sanitizedData } = validation;

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Prepare email data with additional security headers
    const emailData = {
      from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
      to: process.env.TO_EMAIL || 'josueovalle064@gmail.com',
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: generateEmailHTML(sanitizedData, ip),
      replyTo: sanitizedData.email,
      headers: {
        'X-Contact-IP': ip,
        'X-Contact-Timestamp': new Date().toISOString(),
        'X-Contact-User-Agent': request.headers.get('user-agent') || 'Unknown'
      }
    };

    // Send email with timeout
    const emailPromise = resend.emails.send(emailData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout')), 10000)
    );

    await Promise.race([emailPromise, timeoutPromise]);

    // Send auto-reply
    if (sanitizedData.email) {
      try {
        const autoReplyData = {
          from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
          to: sanitizedData.email,
          subject: 'Thank you for your message - Josué Ovalle',
          html: generateAutoReplyHTML(sanitizedData)
        };

        // Don't wait for auto-reply to complete
        resend.emails.send(autoReplyData).catch(error => 
          console.error('Auto-reply failed:', error)
        );
      } catch (error) {
        console.error('Auto-reply setup failed:', error);
      }
    }

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
    
    // Log detailed error info for debugging (but not in production logs)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }

    // Generic error response - don't expose internal details
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Generate secure email HTML
function generateEmailHTML(data, ip) {
  const timestamp = new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' });
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #0ea5e9; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
          Received: ${timestamp} (Guatemala Time)
        </p>
      </div>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 100px;">Name:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Subject:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.subject}</td>
          </tr>
          ${data.budget ? `
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Budget:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; color: #334155;">${data.budget}</td>
          </tr>
          ` : ''}
          ${data.timeline ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Timeline:</td>
            <td style="padding: 8px 0; color: #334155;">${data.timeline}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="background: white; padding: 20px; border-left: 4px solid #0ea5e9; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
        <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
        <p style="line-height: 1.6; color: #475569; white-space: pre-wrap; margin: 0;">${data.message}</p>
      </div>
      
      <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center;">
        <p style="margin: 0; color: #64748b; font-size: 12px;">
          This email was sent from your portfolio contact form.<br>
          IP: ${ip} | Reply directly to respond to ${data.name}.
        </p>
      </div>
    </div>
  `;
}

// Generate auto-reply HTML
function generateAutoReplyHTML(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #0ea5e9; margin: 0; font-size: 28px;">Thank You!</h1>
        <p style="color: #666; margin: 10px 0 0 0;">Your message has been received</p>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #334155;">Hi ${data.name},</p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #334155;">
        Thank you for reaching out! I've received your message about "<strong>${data.subject}</strong>" 
        and I'll get back to you as soon as possible, usually within 24 hours.
      </p>
      
      <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
        <h3 style="color: #0c4a6e; margin: 0 0 10px 0;">Your Message Summary</h3>
        <p style="margin: 5px 0; color: #334155;"><strong>Subject:</strong> ${data.subject}</p>
        ${data.budget ? `<p style="margin: 5px 0; color: #334155;"><strong>Budget:</strong> ${data.budget}</p>` : ''}
        ${data.timeline ? `<p style="margin: 5px 0; color: #334155;"><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
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
  `;
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
      message: 'Contact API endpoint is operational',
      rateLimit: 'Maximum 5 requests per hour per IP',
      version: '2.0.0'
    },
    { status: 200 }
  );
}