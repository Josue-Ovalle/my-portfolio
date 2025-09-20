import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { headers } from 'next/headers';

// Enhanced rate limiting with persistent storage simulation
class RateLimiter {
  private static instance: RateLimiter;
  private requests = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
  private cleanupInterval: NodeJS.Timeout;

  private constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [ip, data] of Array.from(this.requests.entries())) {
        if (now > data.resetTime) {
          this.requests.delete(ip);
        }
      }
    }, 5 * 60 * 1000);
  }

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  checkLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number; blocked: boolean } {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const limit = 3; // Reduced to 3 requests per hour for better security
    const blockDuration = 2 * 60 * 60 * 1000; // Block for 2 hours after limit exceeded

    const requestData = this.requests.get(ip);

    if (!requestData) {
      const resetTime = now + windowMs;
      this.requests.set(ip, { count: 1, resetTime, blocked: false });
      return { allowed: true, remaining: limit - 1, resetTime, blocked: false };
    }

    // Check if IP is currently blocked
    if (requestData.blocked && now < requestData.resetTime) {
      return { 
        allowed: false, 
        remaining: 0, 
        resetTime: requestData.resetTime,
        blocked: true 
      };
    }

    // Reset if window has passed
    if (now > requestData.resetTime) {
      const resetTime = now + windowMs;
      this.requests.set(ip, { count: 1, resetTime, blocked: false });
      return { allowed: true, remaining: limit - 1, resetTime, blocked: false };
    }

    if (requestData.count < limit) {
      requestData.count++;
      return { 
        allowed: true, 
        remaining: limit - requestData.count, 
        resetTime: requestData.resetTime,
        blocked: false 
      };
    }

    // Block the IP for extended period
    requestData.blocked = true;
    requestData.resetTime = now + blockDuration;

    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: requestData.resetTime,
      blocked: true 
    };
  }

  cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Enhanced input validation
interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  timestamp?: string;
  userAgent?: string;
  timeZone?: string;
}

const VALIDATION_RULES = {
  name: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
    blacklist: ['admin', 'test', 'spam', 'bot']
  },
  email: {
    required: true,
    type: 'email',
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    blacklist: ['10minutemail', 'tempmail', 'guerrillamail', 'mailinator']
  },
  subject: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 100,
    blacklist: ['viagra', 'casino', 'loan', 'earn money', 'click here']
  },
  message: {
    required: true,
    type: 'string',
    minLength: 10,
    maxLength: 2000,
    blacklist: ['http://', 'https://', 'www.', 'click here', 'visit now']
  }
};

function sanitizeInput(value: string): string {
  if (typeof value !== 'string') return '';
  
  return value
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Remove control characters
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;')
    .replace(/\s+/g, ' ');
}

function validateInput(data: any): { isValid: boolean; errors: Record<string, string>; sanitizedData: ContactFormInput } {
  const errors: Record<string, string> = {};
  const sanitizedData: any = {};

  // Check for required timestamp (helps detect automated submissions)
  if (!data.timestamp || new Date(data.timestamp).getTime() < Date.now() - 600000) {
    errors.timestamp = 'Invalid or expired submission';
  }

  for (const [field, rules] of Object.entries(VALIDATION_RULES)) {
    const value = data[field];

    if (rules.required && (!value || typeof value !== 'string' || value.trim().length === 0)) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      continue;
    }

    if (!rules.required && (!value || value.trim().length === 0)) {
      sanitizedData[field] = '';
      continue;
    }

    const trimmedValue = value.toString().trim();

    // Length validation (guard for minLength)
    if ('minLength' in rules && rules.minLength && trimmedValue.length < rules.minLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
      continue;
    }

    if ('maxLength' in rules && rules.maxLength && trimmedValue.length > rules.maxLength) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must not exceed ${rules.maxLength} characters`;
      continue;
    }

    // Pattern validation (guard for pattern)
    if ('pattern' in rules && rules.pattern && !rules.pattern.test(trimmedValue)) {
      if (rules.type === 'email') {
        errors[field] = 'Invalid email address format';
      } else {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} contains invalid characters`;
      }
      continue;
    }

    // Blacklist validation
    if (rules.blacklist) {
      const lowerValue = trimmedValue.toLowerCase();
      const foundBlacklisted = rules.blacklist.some(term => lowerValue.includes(term.toLowerCase()));
      if (foundBlacklisted) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} contains prohibited content`;
        continue;
      }
    }

    sanitizedData[field] = sanitizeInput(trimmedValue);
  }

  // Additional security checks
  const timeData = data.timestamp ? new Date(data.timestamp) : null;
  if (timeData) {
    const submissionAge = Date.now() - timeData.getTime();
    if (submissionAge < 3000) { // Less than 3 seconds (too fast, likely bot)
      errors.timing = 'Submission too fast - please try again';
    }
    if (submissionAge > 600000) { // More than 10 minutes (expired form)
      errors.timing = 'Form expired - please refresh and try again';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitizedData as ContactFormInput
  };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return forwarded?.split(',')[0]?.trim() || 
         cfConnectingIP || 
         realIP || 
         '127.0.0.1';
}

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  const allowedOrigins = [
    'https://josueovalle.com',
    'https://www.josueovalle.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }

  if (referer && !allowedOrigins.some(allowed => referer.startsWith(allowed))) {
    return false;
  }

  return true;
}

const rateLimiter = RateLimiter.getInstance();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Origin validation
    if (!checkOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin', code: 'INVALID_ORIGIN' },
        { status: 403 }
      );
    }

    // Get client IP
    const ip = getClientIP(request);
    
    // Check rate limit
    const rateLimit = rateLimiter.checkLimit(ip);
    if (!rateLimit.allowed) {
      const message = rateLimit.blocked 
        ? 'IP temporarily blocked due to excessive requests'
        : 'Too many requests. Please try again later.';
        
      return NextResponse.json(
        { 
          error: message,
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
          blocked: rateLimit.blocked,
          code: 'RATE_LIMITED'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
          }
        }
      );
    }

    // Parse request body with size limit
    let body;
    try {
      const text = await request.text();
      if (text.length > 10000) { // 10KB limit
        return NextResponse.json(
          { error: 'Request too large', code: 'PAYLOAD_TOO_LARGE' },
          { status: 413 }
        );
      }
      if (!text.trim()) {
        return NextResponse.json(
          { error: 'Request body is required', code: 'EMPTY_BODY' },
          { status: 400 }
        );
      }
      body = JSON.parse(text);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validation = validateInput(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors,
          code: 'VALIDATION_ERROR'
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
        { error: 'Email service temporarily unavailable', code: 'SERVICE_UNAVAILABLE' },
        { status: 503 }
      );
    }

    // Prepare email data
    const emailData = {
      from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
      to: process.env.TO_EMAIL || 'josueovalle064@gmail.com',
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: generateEmailHTML(sanitizedData, ip),
      replyTo: sanitizedData.email,
      headers: {
        'X-Contact-IP': ip,
        'X-Contact-Timestamp': new Date().toISOString(),
        'X-Contact-User-Agent': request.headers.get('user-agent') || 'Unknown',
        'X-Contact-Origin': request.headers.get('origin') || 'Unknown'
      }
    };

    // Send email with timeout
    const emailPromise = resend.emails.send(emailData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout')), 15000)
    );

    await Promise.race([emailPromise, timeoutPromise]);

    // Send auto-reply if email provided
    if (sanitizedData.email) {
      try {
        const autoReplyData = {
          from: process.env.FROM_EMAIL || 'noreply@josueovalle.com',
          to: sanitizedData.email,
          subject: 'Thank you for your message - Josué Ovalle',
          html: generateAutoReplyHTML(sanitizedData)
        };

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
    
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      });
    }

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

function generateEmailHTML(data: ContactFormInput, ip: string): string {
  const timestamp = new Date().toLocaleString('es-GT', { timeZone: 'America/Guatemala' });
  
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">New Portfolio Contact</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
          Received: ${timestamp} (Guatemala Time)
        </p>
      </div>
      
      <!-- Content -->
      <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Information</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; width: 120px;">Name:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Email:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937;">
              <a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Subject:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-weight: 500;">${data.subject}</td>
          </tr>
          ${data.budget ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151;">Budget:</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #059669; font-weight: 500;">${data.budget}</td>
          </tr>
          ` : ''}
          ${data.timeline ? `
          <tr>
            <td style="padding: 12px 0; font-weight: 600; color: #374151;">Timeline:</td>
            <td style="padding: 12px 0; color: #7c3aed; font-weight: 500;">${data.timeline}</td>
          </tr>
          ` : ''}
        </table>
        
        <div style="background: #f8fafc; padding: 25px; border-left: 4px solid #0ea5e9; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
          <p style="line-height: 1.7; color: #374151; white-space: pre-wrap; margin: 0; font-size: 16px;">${data.message}</p>
        </div>
        
        <!-- Security Info -->
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0;">
          <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
            <strong>Security Info:</strong> IP: ${ip} | ${data.userAgent ? `User Agent: ${data.userAgent.substring(0, 100)}` : 'No user agent'}<br>
            ${data.timeZone ? `Time Zone: ${data.timeZone} | ` : ''}Verified legitimate submission
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateAutoReplyHTML(data: ContactFormInput): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">Thank You!</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">Your message has been received</p>
      </div>
      
      <!-- Content -->
      <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 18px; line-height: 1.6; color: #1f2937; margin: 0 0 20px 0;">Hi ${data.name},</p>
        
        <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 0 0 25px 0;">
          Thank you for reaching out! I've received your message about "<strong>${data.subject}</strong>" 
          and I'll get back to you as soon as possible, usually within 24 hours.
        </p>
        
        <div style="background: #eff6ff; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #0ea5e9;">
          <h3 style="color: #0c4a6e; margin: 0 0 15px 0; font-size: 18px;">Your Message Summary</h3>
          <p style="margin: 8px 0; color: #1f2937;"><strong>Subject:</strong> ${data.subject}</p>
          ${data.budget ? `<p style="margin: 8px 0; color: #1f2937;"><strong>Budget:</strong> ${data.budget}</p>` : ''}
          ${data.timeline ? `<p style="margin: 8px 0; color: #1f2937;"><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
        </div>
        
        <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 25px 0;">
          In the meantime, feel free to check out my recent projects and learn more about my development approach on my 
          <a href="https://josueovalle.com" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">portfolio</a>.
        </p>
        
        <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 25px 0 30px 0;">
          Looking forward to discussing your project!
        </p>
        
        <!-- Footer -->
        <div style="margin-top: 40px; padding: 25px; background: #f8fafc; border-radius: 10px; text-align: center;">
          <p style="margin: 0 0 8px 0; color: #0ea5e9; font-weight: 700; font-size: 20px;">Josué Ovalle</p>
          <p style="margin: 8px 0; color: #64748b; font-weight: 500;">Frontend Developer</p>
          <p style="margin: 8px 0 0 0; color: #64748b;">josueovalle064@gmail.com | Guatemala City, GT</p>
        </div>
      </div>
    </div>
  `;
}

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

export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'Secure contact API endpoint is operational',
      rateLimit: 'Maximum 3 requests per hour per IP',
      version: '3.0.0',
      security: 'Enhanced validation, rate limiting, and origin checking enabled'
    },
    { status: 200 }
  );
}