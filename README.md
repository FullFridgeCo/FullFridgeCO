# Full Fridge Co. website

This is a plain HTML and CSS website. There's no build step and nothing to install. Every page is a normal `.html` file you can open and edit in any text editor. I recommend [VS Code](https://code.visualstudio.com/), which is free.

When you save a change and push it to GitHub, Netlify updates the live site in about a minute.

## What's where

| File | What it is |
| --- | --- |
| `index.html` | Home |
| `how-it-works.html` | How weekly meal prep works |
| `menu.txt` | **This week's menu. Edit this one file each week.** It runs both the menu page and the order form. |
| `menu.html` | This week's menu page (the dishes come from `menu.txt`) |
| `pricing.html` | Pricing |
| `care-packages.html` | Care Packages, plus the gift form |
| `classes-and-parties.html` | Date night classes and dinner parties, plus the inquiry form |
| `kitchen-ready.html` | Container checklist and what to expect on cook day |
| `faq.html` | Questions |
| `about.html` | Your story |
| `from-the-kitchen.html` | Substack signup and featured posts |
| `get-started.html` | Free call button and the full intake form |
| `order.html` | Weekly order form with a live total. Clients need the client code to open it. It's hidden from Google. |
| `thanks-*.html` | The pages people see after sending a form |
| `404.html` | Shows when someone visits a page that doesn't exist |
| `js/site.js` | **The header, footer, and referral banner for every page** |
| `js/forms.js` | Makes some intake questions show up only when needed |
| `js/menu.js` | Reads `menu.txt` and draws the menu page and the order form. You don't need to edit it. |
| `css/styles.css` | All the colors, fonts, and layout |
| `images/` | Favicon, social share image, and a `photos/` folder for your photos |

## Quick tip: use search

Most of what you'll want to change is marked with a comment. In VS Code, press **Ctrl+Shift+F** (or **Cmd+Shift+F** on a Mac) to search every file at once.

- Search **`PRICE`** to find every price.
- Search **`EDIT ME`** to find links and contact info you need to fill in.
- Search **`PHOTO`** or **`Your photo here`** to find photo spots.
- Search **`[`** to find leftover placeholders like `[Month Day]` and `[X] guest minimum`.

## Updating prices

Search for `PRICE`. Prices show up in a few places, so change all of them:

- `pricing.html`: the main price list, the "what a week might look like" example math, and the Care Package, class, and dinner party prices
- `index.html`: the "from" prices on the four service cards
- `care-packages.html`: the Care Package price (shows up 3 times)
- `classes-and-parties.html`: class and dinner party prices
- `menu.txt`: meal prices (on the `==` lines) and add-on prices (at the end of each add-on line)
- `js/menu.js`: the $250 cook day minimum the order form reminds people about
- `thanks-gift.html`: the "Pay now ($395)" button
- `get-started.html`: the $250 minimum in "The fine print" section
- Also set your dinner party guest minimum. Search for `[X] guest minimum`.

## Updating the weekly menu

Everything for the week lives in one file: **`menu.txt`**. Your menu page and your order form both read it, so you only change it once.

**The easy way, right on GitHub:**

1. Go to your repo on GitHub and click **`menu.txt`**.
2. Click the **pencil icon** (Edit this file).
3. Change the date on the `Week of:` line.
4. Type over the dishes. Each dish is one line, with its parts split by a `|` line:

```
Honey garlic salmon | Glazed salmon with jasmine rice and green beans. | GF, NF | Salmon, honey, tamari, garlic, ...
```

   That's the name, the description, the tags (GF, V, NF), and the ingredients.

5. To add a dish, add a new line under its section. To remove one, delete its line.
6. Click **Commit changes**. The site updates in about a minute.

There are more notes at the top of `menu.txt`, including how add-on prices work.

**Or just ask Claude Code:** paste in the new menu and say "update this week's menu."

## The weekly order form

`order.html` is where clients pick their meals. It shows a running total as they go, and it reminds them about the $250 cook day minimum.

- **The client code** is in `menu.txt`, on the `Client code:` line. It's set to `FULLFRIDGE`. Give it to new clients when they sign up. You can change it anytime.
- **The magic link:** text clients `https://fullfridgeco.com/order.html?code=FULLFRIDGE`. When they tap it, the code fills in for them. Their phone remembers it after that.
- **Orders come to your email** like your other forms. Each one lists what they picked, how many, and the estimated total. In Netlify, they show up under **Forms > weekly-order**.
- The total doesn't include groceries or kid portions. Clients write kid portions in their own box.

## Updating services and page text

All the words are right in the HTML files. Find the sentence you want to change and type over it. Just leave the `<tags>` around it alone.

**About page:** the story on `about.html` is placeholder copy, so please rewrite it in your own words.

**Testimonials:** on `index.html`, look for the `TESTIMONIALS` comment. Replace each placeholder quote and name, then delete the line that says `<span class="placeholder-tag">Placeholder</span>`.

**Header, footer, and banner:** edit these in `js/site.js` only. The change shows up on every page. Your email, Substack link, Google review link, and service area are at the top of that file, marked `EDIT ME`.

## Adding your photos

1. Put your photo in `images/photos/`. Use a short name with no spaces, like `salmon-dinner.jpg`. Try to keep each photo under about 500 KB. [Squoosh](https://squoosh.app/) is a free way to shrink them.
2. Find the dashed placeholder box in the HTML. It looks like `<div class="photo-slot">Your photo here...</div>`.
3. Replace that whole line with:

```html
<img class="photo" src="images/photos/salmon-dinner.jpg" alt="Honey garlic salmon with rice and green beans in a glass container">
```

Always write an `alt` description. It helps people using screen readers, and it helps Google too.

## Links you need to fill in

Search `EDIT ME`, or check this list:

| What | Where |
| --- | --- |
| Email, Substack, Google review link | Top of `js/site.js`. The Google review link stays hidden until you fill it in. |
| Scheduling link for the free call | `get-started.html`, the "Book a free 15-minute call" button |
| Square payment link for Care Packages | Search `PAYMENT` in `thanks-gift.html` and `care-packages.html`. It's in both places. |
| Substack embed | `from-the-kitchen.html`. Replace the dashed box. Instructions are in the comment above it. |
| 3 featured Substack posts | `from-the-kitchen.html`. Look for the `POST` comments. |
| Your real web address | If it isn't `fullfridgeco.com`, search for `fullfridgeco.com` and replace it everywhere, including `sitemap.xml` and `robots.txt`. |

## Forms (Netlify Forms)

The site has three forms: the intake form (`get-started.html`), the Care Package gift form, and the class and party inquiry form. They all use Netlify Forms, so there's no extra service to pay for.

- Each one has spam protection built in (a hidden "honeypot" field).
- After sending, people land on a thank-you page. Edit those words in the `thanks-*.html` files.
- You'll see submissions in Netlify under **your site > Forms**.
- **To get an email for each new submission:** in Netlify, go to **Site configuration > Notifications > Emails and webhooks > Form submission notifications** and add your email.

**If you add or rename a question,** keep the `name="..."` short and simple, with no spaces. That's the column name you'll see in Netlify.

## Deploying to Netlify (one-time setup)

The code lives on GitHub at `FullFridgeCo/FullFridgeCO`.

1. **Make a `main` branch.** Right now the site lives on the branch `claude/inspiring-meitner-hd1wu6`, and the repo doesn't have a `main` branch yet. On GitHub, click the branch dropdown, type `main`, and choose **Create branch: main from claude/inspiring-meitner-hd1wu6**. Then go to **Settings > General > Default branch** and set it to `main`. (Claude can do this for you if you ask.)
2. **Create a free Netlify account** at [netlify.com](https://www.netlify.com/), and sign up with GitHub.
3. Click **Add new site > Import an existing project > GitHub**, and pick **FullFridgeCO**.
4. Use these settings:
   - Branch to deploy: `main`
   - Build command: *leave empty*
   - Publish directory: *leave empty* (or `.`)
5. Click **Deploy**. In a minute you'll have a live link like `something-random.netlify.app`.
6. **Turn on forms:** go to **Forms** in Netlify and click **Enable form detection**. Then go to **Deploys** and click **Trigger deploy > Deploy site** once, so Netlify finds your forms.
7. **Add your domain:** go to **Domain management > Add a domain** and follow the steps. Netlify sets up HTTPS for you for free.

From then on, every time a change is merged into `main` on GitHub, Netlify updates the live site.

## Making quick edits without a computer setup

You can edit any file right on GitHub. Open the file, click the pencil icon, make your change, and click **Commit changes**. If you commit to `main`, Netlify updates the site.

## Previewing on your own computer

Double-click any `.html` file to open it in your browser. Everything works that way except the forms, which only work once the site is on Netlify.
