---
title: Homepage Contact Form Backend & Email Integration
status: in_progress
priority: high
type: feature
tags: [contact, api, email]
created_by: agent
created_at: 2026-06-20T02:30:00Z
position: 7
---

## Notes
Create a functional backend API endpoint for the homepage contact form that validates input, protects against spam, and sends form submissions to support@cipherstracer.com with all details (name, email, phone, subject, message, timestamp).

## Checklist
- [ ] Create API endpoint `/api/contact-homepage.ts` for form submissions
- [ ] Implement field validation (name, email, phone, message all required)
- [ ] Add spam/bot protection (honeypot field, rate limiting)
- [ ] Set up email delivery to support@cipherstracer.com with Web3Forms
- [ ] Include all form fields in email: Full Name, Email, Phone, Message, Date/Time Submitted
- [ ] Add success and error message handling in the form UI
- [ ] Update homepage form to connect to the new API endpoint
- [ ] Test form submission flow end-to-end

## Acceptance
- Contact form successfully submits data
- Email is sent to support@cipherstracer.com with all details
- Validation works (shows errors for missing fields)
- Success/error messages display properly
- Form is protected against spam