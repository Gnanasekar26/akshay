# Akshay Construction — Website

A multi-page, responsive website for Akshay Construction (Chennai), built with
plain HTML, CSS and JavaScript — no build step required.

## How to view it

Open `index.html` directly in a browser, or serve the folder with any static
server, e.g.:

```
npx serve .
```

## Structure

```
akshay-construction/
├── index.html        Home
├── about.html         About
├── services.html      Services (6 detailed service blocks)
├── projects.html       Completed / Ongoing projects (single page, JS filter + modal)
├── career.html          Careers + application form
├── contact.html          Contact info, enquiry form, Google map
├── css/                  One stylesheet per page + global.css design system
├── js/
│   ├── global.js          navbar scroll state, floating widget, mobile drawer, scroll-reveal, counters, accordions
│   ├── projects.js        project data, filter tabs, card rendering, modal gallery (prev/next + keyboard)
│   ├── career.js          job-opening cards, Apply Now modal, application form (frontend-only)
│   ├── contact.js         enquiry form handling incl. loading/success state (frontend-only)
│   └── about.js           reserved for About-page-only interactivity (currently uses global.js)
└── assets/
    ├── images/
    │   └── founder/founder.jpg   generated placeholder portrait — replace with the real photo
    └── icons/
```

## Design system

- **Colors**: deep navy (`#071A33` / `#0B1F3A`) + premium gold (`#C9A45C` / `#D4AF63`) on a warm off-white (`#F7F6F2`), all defined as CSS custom properties at the top of `css/global.css`.
- **Type**: Playfair Display for major headings (`h1`/`h2`), Space Grotesk for nav/buttons/labels, Inter for body copy. A `.accent` span gives a word italic gold styling (e.g. "Built on Experience. Driven by *Quality.*").
- **CTA language**: "ENQUIRE NOW →" is the primary call-to-action everywhere (navbar, hero, floating widget, every section-ending CTA) and always links to `contact.html`.
- **Floating widget**: bottom-right "ENQUIRE NOW" button expands on click/tap to reveal WhatsApp, Call and Email — closes on outside click, Escape, or toggling again.

## Replacing the placeholder photography

Every image currently points to a stock Unsplash URL so the site is fully
visual out of the box. To use your own project photos:

1. Drop real photos into the matching folder under `assets/images/...`
   (e.g. `assets/images/projects/durairaj/durairaj-1.jpg`).
2. In `projects.html`'s data (`js/projects.js`), update each project's
   `images` array to point at your local file paths instead of the Unsplash
   URLs.
3. For Home / About / Services, update the `src` attributes directly in the
   corresponding `.html` files.

## Adding a new project

Open `js/projects.js` and add another object to the `PROJECTS` array:

```js
{
  id: 4,
  client: "Mr. Example",
  title: "Mr. Example Residence",
  location: "Area, Chennai",
  address: "Street name (optional)",
  category: "Residential Construction",
  status: "ongoing", // or "completed"
  images: ["assets/images/projects/example/1.jpg", "assets/images/projects/example/2.jpg"]
}
```

It will automatically appear under the correct filter tab and get its own
modal gallery — no other code changes needed.

## Contact form / career form backend

Both `js/contact.js` and `js/career.js` currently log the form payload to the
browser console and show a success message — this keeps the site fully
functional without a backend. To connect real email delivery:

1. Set up a small backend endpoint (serverless function, PHP mailer, etc.)
   that accepts the JSON payload and sends an email to
   `kumarancivil007@gmail.com`.
2. Replace the `console.log(...)` line in each file with a `fetch()` call to
   that endpoint (a commented example is already included in both files).
3. Never put email credentials or API keys in these frontend files — keep
   them on the backend only.

## Notes

- WhatsApp click-to-chat, call, and email links all use the numbers/address
  supplied: **9841358367** / **kumarancivil007@gmail.com**.
- The Projects page shows only the completed/ongoing projects supplied in the
  brief (Karthikeyan, Sekar, Durairaj) — no fabricated costs, square footage,
  floor counts or completion dates were added, per the brief's instructions.
- Project photos are stock placeholders labelled **"REPRESENTATIVE IMAGE"**
  on every card and in the project modal, so they are never presented as
  actual site photographs. Replace `js/projects.js`'s `images` arrays with
  real project photos and remove the `img-note` span once available.
- The founder section on Home and About uses a generated placeholder at
  `assets/images/founder/founder.jpg` (clearly marked as a placeholder). No
  founder name, education or certification has been invented anywhere on the
  site — swap in the real photo and add founder details only once supplied.
- The Google Map on the Contact page uses an address-based embed (no API key
  required) rather than a hardcoded/guessed coordinate pin.
- The footer's "Projects" column links to `projects.html?filter=completed`
  and `projects.html?filter=ongoing` — `js/projects.js` reads that query
  parameter on load and opens the matching tab automatically.
- **Career page**: the four job cards (Site Engineer, Sales Executive, Civil
  Site Supervisor, Junior Civil Engineer) are explicitly labelled "SAMPLE
  LISTING" and the section note states they're indicative, not confirmed
  openings — per the brief's instruction not to present unconfirmed vacancies
  as real. Every "APPLY NOW" button opens the same modal with the position
  pre-filled but editable; there's also a "SUBMIT A GENERAL APPLICATION"
  option with the position field left blank.
- **About page** now includes an "Our Journey" timeline (2020 → 2025+), a
  Mission/Vision pair, a 7-stage "From Idea to Industry" process, and 5 Core
  Value cards — all using only the milestones and wording supplied, with no
  invented awards, certifications or client/project counts anywhere.
- **Home page** includes a "What Our Clients Value" section instead of
  fabricated testimonials — non-testimonial value statements plus two
  clearly-labelled testimonial placeholder cards ready to swap in real
  reviews later.
- Contact and career forms show a brief "Sending…/Submitting…" button state
  before the success message, and the success box supports an `.is-error`
  style — wire up the commented `fetch()` block in each JS file to a real
  backend and the error path will render automatically on a failed request.
