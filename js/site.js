/* =========================================================
   FULL FRIDGE CO. : shared header, footer, and banner
   ---------------------------------------------------------
   Every page loads this file. Edit the header, footer, or
   referral banner HERE and the change shows up on every page.

   Look for "EDIT ME" to find your email, Substack link,
   Google review link, and service area.
   ========================================================= */

(function () {
  /* ---------- EDIT ME: your links and contact info ---------- */
  var SITE = {
    email: "hello@fullfridgeco.com", // EDIT ME: your email
    substackUrl: "https://fullfridgeco.substack.com", // EDIT ME: your Substack
    googleReviewUrl: "#", // EDIT ME: your Google review link
    serviceArea: "Arvada, Colorado, and about 30 minutes around it"
  };

  /* ---------- Main menu (top of every page) ---------- */
  var NAV = [
    { href: "how-it-works.html", label: "How it works" },
    { href: "menu.html", label: "This week's menu" },
    { href: "pricing.html", label: "Pricing" },
    { href: "care-packages.html", label: "Care Packages" },
    { href: "classes-and-parties.html", label: "Classes & Parties" },
    { href: "about.html", label: "About" }
  ];

  var here = location.pathname.split("/").pop() || "index.html";

  function navLinks() {
    return NAV.map(function (item) {
      var current = item.href === here ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");
  }

  var logoSvg =
    '<svg class="doodle" viewBox="0 0 34 40" aria-hidden="true" focusable="false">' +
    '<g filter="url(#sketchy)">' +
    '<rect x="5" y="5" width="25" height="32" rx="4" class="fill-mustard"/>' +
    '<rect x="3" y="3" width="25" height="32" rx="4" class="line"/>' +
    '<path d="M3 14 L28 14" class="line"/>' +
    '<path d="M7 7 L7 11 M7 18 L7 24" class="line"/>' +
    "</g></svg>";

  /* ---------- Referral banner (top of every page) ---------- */
  var bannerHtml =
    '<div class="referral-banner"><p>' +
    "Refer a friend, and you both get a free add-on of your choice. " +
    '<a href="faq.html#referrals">Here\'s how</a>' +
    "</p></div>";

  /* ---------- Header ---------- */
  var headerHtml =
    bannerHtml +
    '<header class="site-header">' +
    '<div class="container site-header__inner">' +
    '<a class="logo" href="index.html">' + logoSvg + "<span>Full Fridge Co.</span></a>" +
    '<button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">' +
    '<span class="nav-toggle__bars" aria-hidden="true"></span> Menu</button>' +
    '<nav class="site-nav" id="site-nav" aria-label="Main">' +
    "<ul>" + navLinks() + "</ul>" +
    '<a class="btn btn--primary" href="get-started.html">Book a free call</a>' +
    "</nav></div></header>";

  /* ---------- Footer ---------- */
  var year = new Date().getFullYear();
  var footerHtml =
    '<footer class="site-footer">' +
    '<div class="container">' +
    '<div class="site-footer__grid">' +
    "<div>" +
    '<a class="logo" href="index.html">' + logoSvg + "<span>Full Fridge Co.</span></a>" +
    '<p class="site-footer__tagline">Real food, cooked in your own kitchen, ready when you are.</p>' +
    "<p><strong>Where I cook:</strong><br>" + SITE.serviceArea + "</p>" +
    "</div>" +
    "<div>" +
    "<h2>Say hi</h2>" +
    "<ul>" +
    '<li><a href="mailto:' + SITE.email + '">' + SITE.email + "</a></li>" +
    '<li><a href="' + SITE.substackUrl + '">Read my Substack</a></li>' +
    '<li><a href="' + SITE.googleReviewUrl + '">Leave a Google review</a></li>' +
    '<li><a href="get-started.html">Book a free call</a></li>' +
    "</ul>" +
    "</div>" +
    "<div>" +
    "<h2>Around the kitchen</h2>" +
    "<ul>" +
    '<li><a href="how-it-works.html">How it works</a></li>' +
    '<li><a href="menu.html">This week\'s menu</a></li>' +
    '<li><a href="pricing.html">Pricing</a></li>' +
    '<li><a href="kitchen-ready.html">Get your kitchen ready</a></li>' +
    '<li><a href="faq.html">Questions</a></li>' +
    '<li><a href="from-the-kitchen.html">From the Kitchen</a></li>' +
    "</ul>" +
    "</div>" +
    "</div>" +
    '<div class="site-footer__bottom">&copy; ' + year + " Full Fridge Co. Made with care in Arvada, CO.</div>" +
    "</div></footer>";

  var headerSlot = document.getElementById("site-header");
  var footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = headerHtml;
  if (footerSlot) footerSlot.outerHTML = footerHtml;

  /* ---------- Mobile menu button ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
})();
