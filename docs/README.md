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

## Quote form (FormSubmit — free, already wired)

The form uses [FormSubmit](https://formsubmit.co) — free, no account, no API key. Job details and the photo attachment are emailed to **ortizbe8813@gmail.com**, and customers get an automatic "got your request" reply (`_autoresponse` field in `index.html` — edit the wording there).

**One-time activation:** after publishing, send one test submission through the live form, then click the activation link FormSubmit emails to ortizbe8813@gmail.com. All future submissions (and auto-replies) then work automatically.

Limits: 1 photo per submission, 5 MB max (the site prompts customers to text extra photos to (917) 799-5106).

## Edit prices

Prices live in the `<ol class="price-list">` block in `index.html` — one `<li class="price">` per row, plain text, easy to tweak. The same price ranges appear in the form's "Job type" dropdown.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All content & sections |
| `styles.css` | All styling (colors at the top under `:root`) |
| `script.js` | Animations, sparks, smooth scrolling |
