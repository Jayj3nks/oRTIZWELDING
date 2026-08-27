# Ironbound Welding — Website

A pure static site (HTML + CSS + JS, no build step). Ready for free GitHub Pages hosting.

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `welding-site`).
2. Copy the **contents of this `docs` folder** into the repository — you can:
   - keep them in a `/docs` folder and set Pages source to **main branch / docs folder**, or
   - put the files at the repository root and set Pages source to **main branch / root**.
3. In the repo: **Settings → Pages → Source: Deploy from a branch → main → /docs (or /(root)) → Save.**
4. Your site appears at `https://<your-username>.github.io/<repo-name>/` within a minute.

## Personalize it

Open `index.html` and search for `TODO` — every spot that needs your real info is marked:

- Business name (nav + footer)
- City / service area (hero + contact)
- Phone number and email (contact section)
- Your story (About chapter 01)

## Add photos

1. Create a `photos/` folder next to `index.html` and drop your images in.
2. In the Work section, replace each placeholder div:

```html
<!-- before -->
<div class="frame__inner frame__inner--empty"><span>PHOTO 01</span></div>

<!-- after -->
<div class="frame__inner"><img src="photos/gate.jpg" alt="Driveway gate, steel and cedar" /></div>
```

3. Update the `<figcaption>` text under each frame.

## Set up the quote form (5 minutes, free)

The form uses [FormSubmit](https://formsubmit.co) — free, no account, no API key. Job details and the photo attachment land straight in your email inbox.

1. Open `script.js` and set `QUOTE_FORM_EMAIL` at the very top to your email address.
2. Publish the site, then send **one test submission** through the form.
3. FormSubmit emails you an **activation link** — click it once. All future submissions arrive automatically.

Limits: 1 photo per submission, 5 MB max (customers can text extra photos — the site says so). To hide your email from the page source, FormSubmit can give you a random string alias — paste it in place of the email in `script.js`.

## Edit prices

Prices live in the `<ol class="price-list">` block in `index.html` — one `<li class="price">` per row, plain text, easy to tweak. The same price ranges appear in the form's "Job type" dropdown.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content & sections |
| `styles.css` | All styling (colors at the top under `:root`) |
| `script.js` | Animations, sparks, smooth scrolling |
