# Ravi King Premium Profile (PWA)

## Files
- `index.html` — full page source with the existing social links and intro-click music behavior, plus the requested features.
- `manifest.webmanifest` and `service-worker.js` — install/offline support.
- `ravi-profile.png` — the profile photo supplied by the owner.
- `ravi-profile-192.png` / `ravi-profile-512.png` — black-and-gold RK monogram app icons (no portrait).
- `rk-logo.svg` — editable vector source for the RK app logo.

## Publish
Upload **all files in this folder together** to the existing GitHub Pages site root (or the same site subfolder). Keep the names and relative paths unchanged. PWA install/offline features require HTTPS; GitHub Pages provides HTTPS. Open the site once while online so the service worker can cache the app shell and resources, then reload.

## Editable profile status
The badge currently says `Digital Creator · Mumbai`. Change the `#availability-status` text and the `translateAddedControls()` value in `index.html` if you want different wording before publishing.

## Visitor reviews and approval
Reviews are safely rendered as text. In this static bundle they are saved locally in the submitting browser. Truly shared reviews with owner approval need a trusted HTTPS backend; never place admin passwords or secret service tokens in this public HTML. Recommended backends: Supabase (database + approval queue) or Airtable (moderated table). The “Featured reviews” area is intentionally empty until approved reviews are supplied by a connected backend.

## Privacy
The page does not request precise location or send device details. The visitors/likes/comments panel and its counter request have been removed. Analytics remain off. External fonts, social icons, audio, and scripts need a first online visit; the service worker caches eligible static resources at runtime where the browser permits it.


## Custom domain
A custom domain requires a domain you own. No CNAME file is created until you provide that domain; after that, set it in GitHub Pages and add the DNS records shown by GitHub.

## Profile card
“Download Profile Card” creates a local SVG card with the self-reported profile details. It is not an externally verified credential.


## Added profile tools
The listen button uses the browser's speech engine. While narration plays, background music continues at a lower volume and returns to its previous level when narration ends or is stopped. Quick navigation, clipboard actions, social link previews, and a one-page print/save-as-PDF profile sheet work client-side. The profile sheet uses only facts already present on the page; it does not invent education or work history. Reviews remain local to the browser. Each browser can delete its own newly added review or clear all local reviews.
