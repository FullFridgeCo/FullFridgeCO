# Full Fridge Co. website: notes for Claude

This file gives Claude the background on this project. Keep it in the root of the repo as `CLAUDE.md`, and Claude Code will read it at the start of every session.

## The business

Full Fridge Co. is an in-home personal chef service in Arvada, Colorado, run by Jordyn. Jordyn is a chef and a licensed mental health therapist. Jordyn cooks in clients' own kitchens and leaves the fridge stocked with labeled, pre-portioned meals. Other services: gifted Care Packages, date night cooking classes, and dinner parties.

- **Audience:** busy, high-earning professional couples and small families (up to 2 kids) within about 30 minutes of Arvada. Second audience: friends and family buying a Care Package as a gift.
- **The feeling:** "This solves my problems." Real, delicious food, unlike the basic meal kits. Warm, calm, a little witty, never fussy.

## Voice (most important, applies to every word on the site)

Write like Jordyn is talking to a friend over coffee. Warm, kind, and to the point. Readers should feel understood, cared for, and like Jordyn is there to help.

- Never use em dashes.
- Short, natural sentences that are easy to read out loud.
- Speak as "I" (Jordyn) to "you" (the reader).
- No "not this, but that" or "this, then that" style lines.
- No phrases real people don't say, like "quietly shows up," "where the magic happens," "elevate," "curated," "seamless," "elevated experience."
- No pushy sales lines and no fake urgency.
- If a sentence sounds like an ad or like AI wrote it, rewrite it.

Too stiff: "How life actually runs, so I pick the right cook day and the right kind of food."
Just right: "Tell me a little about your week so I can find the best day to come cook for you."

## How to work with Jordyn

- Jordyn isn't a developer. Explain things in plain steps, one click at a time.
- **Whenever you tell Jordyn to deploy in Netlify, always say whether to deploy with or without clearing the cache.** The site has no build step, so the regular **Trigger deploy > Deploy project** (without clearing the cache) is normally right.
- Show changes before calling them done. Screenshots work well (Chromium and Playwright are available in cloud sessions).

## Tech

- Plain static HTML and CSS, with a little vanilla JS. No frameworks and no build step. Jordyn edits the files by hand, so keep the code simple and well commented.
- **Hosting:** Netlify project `fullfridgewebsite` (https://fullfridgewebsite.netlify.app), deployed from the `main` branch of GitHub repo `FullFridgeCo/FullFridgeCO`. A push to `main` goes live in about a minute.
- **Forms:** Netlify Forms (`intake`, `care-package-gift`, `class-party-inquiry`). Each has `data-netlify="true"`, a hidden `form-name` input, a honeypot `bot-field`, and its own thank-you page (`thanks-*.html`). Form detection is on, and submission emails go to Jordyn.
- **Shared header, footer, and referral banner:** these all live in `js/site.js`. Contact info is at the top of that file, marked `EDIT ME`.
- **Conditional and required checkbox questions:** handled by `js/forms.js`, using `data-show-if`, `data-required-if-shown`, and `data-required-group`.
- **Colors and fonts:** CSS variables at the top of `css/styles.css`. Mustard, olive, and cream. Fraunces for headings, DM Sans for body text.
- **Illustrations:** hand-drawn style inline SVGs. Every page includes the `#sketchy` SVG filter that gives the lines their wobble. Use no stock photos. Photo spots are dashed `.photo-slot` boxes.
- **Markers for Jordyn:** prices are marked with `PRICE` comments, links to fill in with `EDIT ME`, and the weekly menu sits between `WEEKLY MENU: START` and `END` in `menu.html`.
- `README.md` explains all of this for Jordyn. Keep it up to date when you change how something works.

## Pages

`index.html` (home), `how-it-works.html`, `menu.html`, `pricing.html`, `care-packages.html`, `classes-and-parties.html`, `kitchen-ready.html`, `faq.html`, `about.html`, `from-the-kitchen.html`, `get-started.html` (intake form), `order.html` (the weekly order page with the Tally form, hidden from Google), `thanks-intake.html`, `thanks-gift.html`, `thanks-inquiry.html`, `404.html`. Also `robots.txt`, `sitemap.xml`, `images/favicon.svg`, and `images/social-share.png`.

## Prices (also marked in the code)

- **Weekly meal prep, per serving, plus groceries at cost with an itemized receipt:** Breakfast $11, Lunch $14, Dinner $18. Kid portions are half price.
- **Weekly meal prep, other terms:** $250 minimum per cook day. Travel is included within 30 minutes of Arvada.
- **Care Package:** $395 all-in, groceries included.
- **Date Night Cooking Class:** from $275 per couple, plus groceries.
- **Dinner Parties:** from $65 per guest, plus groceries.

## Still to do

Done so far: README repo name fixed, Substack set to `https://jordynmoody.substack.com`, Calendly link added to `get-started.html`, Google review link hidden until Jordyn has one, gift message card and recipe cards approved, vegan "point you toward someone" line removed.

1. **Links still missing:**
   - Google review link (top of `js/site.js`). The footer link is hidden while it's empty.
   - Square payment link for Care Packages. Until then the site says Jordyn will email a payment link. Search `PAYMENT` in `thanks-gift.html` and `care-packages.html` to switch it back.
2. **Free call length:** the site says "15-minute call" but the Calendly link is the `30min` event. Get Jordyn's choice and make them match.
3. **Fill in the missing prices:** soup by the quart, snack box, and dessert (`menu.html`), plus the dinner party guest minimum (search `[X] guest minimum`).
4. **Still waiting on Jordyn:**
   - Food safety FAQ answer, and adding a food handler certification once Jordyn has one
   - The referral perk wording (banner in `js/site.js`, answer in `faq.html#referrals`)
5. **Replace placeholder content:**
   - The About story (`about.html`)
   - Testimonials (`index.html`)
   - Food photos and a photo of Jordyn
   - The 3 featured Substack posts
   - The Substack embed (`from-the-kitchen.html`)
   - The Tally embed (`order.html`)
   - The sample menu (`menu.html`)
6. **Set up the domain:** if Jordyn gets one (for example fullfridgeco.com), connect it in Netlify under Domain management. If it isn't `fullfridgeco.com`, replace that address everywhere: canonical tags, og tags, `sitemap.xml`, and `robots.txt`.
7. **Go public:** the Netlify project is set to Private. When the site is ready, Jordyn clicks **Make public** in Netlify.

## Contact

Site email: fullfridgeco@gmail.com (set in `js/site.js`).
