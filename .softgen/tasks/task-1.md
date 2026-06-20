---
title: Global Rebranding and Contact Information Update
status: todo
priority: urgent
type: feature
tags: [branding, contact]
created_by: agent
created_at: 2026-06-20T01:00:00Z
position: 1
---

## Notes
The website must be completely rebranded to "Cipherstracer". All old contact information and company names (e.g., CipherTrace) must be purged from the codebase. The layout remains exactly the same.

## Checklist
- [x] Update Header: Replace brand name with "Cipherstracer" and update WhatsApp/call links to use `+1 (940) 560-9662`.
- [x] Update Footer: Replace company name, descriptions, and update email to `support@cipherstracer.com`, phone to `+1 (940) 560-9662`, and social/domain links.
- [x] Update Contact Page: Replace all phone numbers, emails, and form submission references to the new Cipherstracer details. Ensure the WhatsApp API links, SMS links, and `tel:` links use the new phone number.
- [x] Update HeroSection and all Home page components to reference "Cipherstracer" instead of previous names (including removing "A Mastercard Company" if it's legacy cloned content).
- [x] Search for and replace any hidden references, metadata, or email templates containing the old contact details across the `src/` directory.

## Acceptance
- No instances of the old brand name or contact details exist in the user-facing UI or links.
- Clicking phone or email links correctly opens the new contact details.