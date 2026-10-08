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
- **Forms:** Netlify Forms (`intake`, `care-package-gift`, `class-party-inquiry`, `weekly-order`). Each has `data-netlify="true"`, a hidden `form-name` input, a honeypot `bot-field`, and its own thank-you page (`thanks-*.html`). Form detection is on, and submission emails go to Jordyn.
- **Shared header, footer, and referral banner:** these all live in `js/site.js`. Contact info is at the top of that file, marked `EDIT ME`.
- **Conditional and required checkbox questions:** handled by `js/forms.js`, using `data-show-if`, `data-required-if-shown`, and `data-required-group`.
- **Colors and fonts:** CSS variables at the top of `css/styles.css`. Mustard, olive, and cream. Fraunces for headings, DM Sans for body text.
- **Illustrations:** hand-drawn style inline SVGs. Every page includes the `#sketchy` SVG filter that gives the lines their wobble. Use no stock photos. Photo spots are dashed `.photo-slot` boxes.
- **Markers for Jordyn:** prices are marked with `PRICE` comments, and links to fill in with `EDIT ME`.
- **Weekly menu and order form:** the menu lives in `menu.txt` (one plain-text line per dish, explained at the top of the file). `js/menu.js` fetches it and draws both the cards on `menu.html` and the order form on `order.html`. The order form needs the client code from the `Client code:` line in `menu.txt` (currently `FULLFRIDGE`), or a magic link like `order.html?code=FULLFRIDGE`, and it remembers the code in localStorage. It shows a live total and the $250 minimum (`COOK_DAY_MINIMUM` in `js/menu.js`). The dish inputs have no `name`, because Netlify Forms only keeps fields that are in the static HTML. Instead, JS writes a readable summary into the hidden `your_order` field. It puts emoji section headers, Unicode sans-bold for section names and quantities (Netlify emails are plain text), and the total at the end. It also writes the hidden `subject` field (with `data-remove-prefix`), which becomes the email subject line, like "🥕 New order from Name (week of October 26)". Field order in the HTML sets the order in the email: name, contact, week choice, order, kid portions, notes, week. Name, contact, and week choice are required. When Jordyn sends a new menu, update `menu.txt` only.
- `README.md` explains all of this for Jordyn. Keep it up to date when you change how something works.

## Pages

`index.html` (home), `how-it-works.html`, `menu.html`, `pricing.html`, `care-packages.html`, `classes-and-parties.html`, `kitchen-ready.html`, `faq.html`, `about.html`, `from-the-kitchen.html`, `get-started.html` (intake form), `order.html` (the weekly order form, hidden from Google), `thanks-intake.html`, `thanks-gift.html`, `thanks-inquiry.html`, `thanks-order.html`, `404.html`. Also `menu.txt` (the weekly menu). Also `robots.txt`, `sitemap.xml`, `images/favicon.svg`, and `images/social-share.png`.

## Prices (also marked in the code)

- **Weekly meal prep, per serving, plus groceries at cost with an itemized receipt:** Breakfast $11, Lunch $14, Dinner $18. Kid portions are half price.
- **Weekly meal prep, other terms:** $250 minimum per cook day. Travel is included within 30 minutes of Arvada.
- **Serving notes in `menu.txt`:** a dish can carry its own price or serving note as a 5th part, like `11 for 2 egg bites` or `24 for a dozen` (muffins, which Jordyn only makes by the dozen). These show on the menu, the order form, and the email ("2 egg bites each").
- **Care Package:** $395 all-in, groceries included.
- **Date Night Cooking Class:** from $275 per couple, plus groceries.
- **Dinner Parties:** from $65 per guest, plus groceries.

## Still to do

Done so far: README repo name fixed, Substack set to `https://jordynmoody.substack.com`, Calendly link added to `get-started.html`, Google review link hidden until Jordyn has one, gift message card and recipe cards approved, vegan "point you toward someone" line removed, add-on prices set (soup $18/quart, snack box $25, cookies $16 for six or $25 for a dozen), dinner parties set to 6 to 10 guests, referral perk wording approved, About story written by Jordyn and added to `about.html`, Square Care Package link (`https://square.link/u/B7BjkRT6`) added to `care-packages.html` and `thanks-gift.html` (search `PAYMENT`), weekly order form built on the site (Jordyn chose this over Tally so clients see a live total), Jordyn's first real menu (week of October 26) added to `menu.txt`, vegetarian tag renamed from V to VEG (Jordyn felt V reads as vegan).

1. **Links still missing:**
   - Google review link (top of `js/site.js`). The footer link is hidden while it's empty.
2. **Free call:** done. Jordyn changed the Calendly event to 15 minutes. The link stayed `https://calendly.com/fullfridgeco/30min`, which is already on the site.
3. **Food handler card:** Jordyn is taking the ServSafe Food Handler course. Once done, add it to the food safety answer in `faq.html`. Keep the current answer until then.
4. **Insurance:** Jordyn is looking into personal chef liability insurance. Nothing on the site yet.
5. **Replace placeholder content:**
   - Testimonials (`index.html`)
   - Food photos and a photo of Jordyn
   - The 3 featured Substack posts
   - The Substack embed (`from-the-kitchen.html`)
6. **Finish the domain:** Jordyn bought `fullfridgeco.com` through Squarespace, so the site's canonical and og tags already match it. DNS is set in Squarespace (A `@` to `75.2.60.5`, CNAME `www` to `fullfridgewebsite.netlify.app`), and the domain is added in Netlify. Still to do: wait for the HTTPS certificate (Netlify > Domain management > HTTPS > Verify DNS configuration), then make `fullfridgeco.com` the primary domain. Squarespace's Email Security records currently block sending email from the domain. Change them if Jordyn sets up an @fullfridgeco.com email.
7. **Go public:** the Netlify project is set to Private. When the site is ready, Jordyn clicks **Make public** in Netlify.

## Contact

Site email: fullfridgeco@gmail.com (set in `js/site.js`).
