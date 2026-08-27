# PRD — Freelance Welder Website (Ironbound Welding placeholder)

## Original problem statement
Build a website for a freelance welder with a specific price scheme (service call minimum through large commercial quotes). User wants to host it from GitHub.

## User decisions (from clarifying questions)
- Pure static site (HTML/CSS/JS), free GitHub Pages hosting, no backend
- No contact/quote form — phone/email displayed only
- Full sections: Hero, About, Services, Pricing, Gallery, Contact — user adds real photos, story, and contact details later (placeholders in place)
- Style: builder's choice → dark industrial "forge" aesthetic (near-black, molten orange, bone white; Anton display type, IBM Plex Mono labels)

## Architecture
- Pure static, no build step: `/app/docs/index.html`, `styles.css`, `script.js`, `README.md`, `.nojekyll`
- Deploy target: GitHub Pages (main branch, /docs or root)
- Motion: GSAP + ScrollTrigger (CDN), Lenis smooth scroll (CDN), canvas spark particles, hero 3D pointer tilt, masked line-by-line reveals, editorial marquee, cursor spotlight on gallery frames
- All user-editable spots marked with `TODO` comments in index.html

## Implemented (2026-08-27)
- Full one-page site: kinetic hero with spark canvas + masked reveal, marquee, numbered manifesto chapters (01-03), services list, full price list (exact prices from user), gallery with 4 clipped placeholder frames + spotlight hover, contact section with tap-to-call/email, footer
- Scroll progress bar, sticky blurring nav, smooth anchor scrolling
- Responsive (mobile grid stacks), prefers-reduced-motion support, no-JS content fallback
- README with GitHub Pages publish steps and photo-swap instructions
- Verified: served locally, screenshotted hero/pricing/contact/services/gallery desktop + mobile, no console errors
- Quote form (FormSubmit, free): name/email/phone/job-type/message + optional photo attachment (1 image, 5MB max), honeypot spam trap, AJAX submit with success/error states, "Get a quote" nav button scrolls to it. Verified with mocked endpoint — submit flow + success message confirmed; real email delivery pending one-time FormSubmit activation
- Personalization done: ORTIZ WELDING, Bryant Ortiz, (917) 799-5106, ortizbe8813@gmail.com, Staten Island NY; chapter-01 story written with Bryant's name; _autoresponse auto-reply enabled ("Thanks for reaching out to Ortiz Welding — your quote request is in Bryant's hands…")
- PREVIEW FIX: /app/docs symlinked into /app/frontend/public/ (index.html, styles.css, script.js) and /app/frontend/src/index.js reduced to a no-op so the preview URL (REACT_APP_BACKEND_URL root) serves the static site directly; React template CSS conflict resolved. Verified on live preview URL — dark theme, real details, form flow all confirmed. NOTE: /app/docs remains the single source of truth for GitHub; public/ files are symlinks, edits propagate automatically

## Backlog
- P0: User replaces placeholders — business name, phone, email, city, about story, gallery photos
- P0: User sets QUOTE_FORM_EMAIL in script.js and clicks the FormSubmit activation email after first test submission
- P1: Custom domain setup on GitHub Pages
- P2: Testimonials section, before/after repair slider, FAQ, SEO meta/OG image

## Next tasks
1. User pushes /docs contents to their GitHub repo and enables Pages
2. Swap placeholder contact info and photos
3. Add real business name
