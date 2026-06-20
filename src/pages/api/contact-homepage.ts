import type { NextApiRequest, NextApiResponse } from "next";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, phone, message }: ContactFormData = req.body;

    // Validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid email address" 
      });
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid phone number" 
      });
    }

    // Rate limiting check (simple honeypot field check)
    const honeypot = req.body.website;
    if (honeypot) {
      // Bot detected
      return res.status(400).json({ 
        success: false, 
        message: "Spam detected" 
      });
    }

    // Prepare email content
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    const emailContent = `
NEW HOMEPAGE CONTACT FORM SUBMISSION

From: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

---
Submitted: ${timestamp}
IP Address: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}
User Agent: ${req.headers['user-agent']}
    `.trim();

    // Send email via Web3Forms
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!web3formsKey) {
      console.error("Web3Forms API key not configured");
      return res.status(500).json({ 
        success: false, 
        message: "Email service not configured. Please contact support directly at support@cipherstracer.com" 
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `Homepage Contact: ${name}`,
        from_name: name,
        email: email,
        message: emailContent,
        to_email: "support@cipherstracer.com"
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Web3Forms error:", data);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again or email us directly at support@cipherstracer.com" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Thank you for contacting us! Our team will respond within 24 hours." 
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An error occurred. Please try again or email us directly at support@cipherstracer.com" 
    });
  }
}