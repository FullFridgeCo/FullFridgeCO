/* =========================================================
   FULL FRIDGE CO. : weekly menu and order form
   ---------------------------------------------------------
   You don't need to edit this file. To change the menu,
   edit menu.txt instead. This file reads menu.txt and:
     - on menu.html, draws the menu cards
     - on order.html, draws the order form with a live total
   ========================================================= */

(function () {
  var menuBox = document.getElementById("weekly-menu");
  var orderForm = document.getElementById("order-form");
  if (!menuBox && !orderForm) return;

  // PRICE: the minimum for one cook day
  var COOK_DAY_MINIMUM = 250;

  var TAG_NAMES = { GF: "gf", V: "v", NF: "nf" };

  /* ---------- Small helpers ---------- */

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function money(amount) {
    return "$" + (Math.round(amount * 100) / 100).toString();
  }

  // "16 for six, 25 for a dozen" becomes
  // [{ price: 16, label: "for six" }, { price: 25, label: "for a dozen" }]
  function readPrices(text) {
    var options = [];
    text.split(",").forEach(function (part) {
      var m = part.trim().match(/^\$?(\d+(?:\.\d+)?)\s*(.*)$/);
      if (m) options.push({ price: Number(m[1]), label: m[2].trim() });
    });
    return options;
  }

  function priceText(item) {
    if (!item.options.length) return item.priceNote;
    return item.options
      .map(function (o) {
        return money(o.price) + (o.label ? " " + o.label : "");
      })
      .join(", or ");
  }

  /* ---------- Read menu.txt ---------- */

  function parseMenu(text) {
    var menu = { weekOf: "", clientCode: "", sections: [] };
    var section = null;

    text.split(/\r?\n/).forEach(function (raw) {
      var line = raw.trim();
      if (!line || line.charAt(0) === "#") return;

      var setting = line.match(/^(Week of|Client code)\s*:\s*(.*)$/i);
      if (setting) {
        if (/^week/i.test(setting[1])) menu.weekOf = setting[2].trim();
        else menu.clientCode = setting[2].trim();
        return;
      }

      if (line.indexOf("==") === 0) {
        var head = line.replace(/^=+/, "").split("|");
        section = {
          name: head[0].trim(),
          defaultPrice: (head[1] || "").trim(),
          items: []
        };
        menu.sections.push(section);
        return;
      }

      if (!section) return;
      var parts = line.split("|").map(function (p) {
        return p.trim();
      });
      var ownPrice = parts[4] || section.defaultPrice;
      var options = readPrices(ownPrice);
      section.items.push({
        name: parts[0],
        description: parts[1] || "",
        tags: (parts[2] || "")
          .split(",")
          .map(function (t) {
            return t.trim().toUpperCase();
          })
          .filter(function (t) {
            return TAG_NAMES[t];
          }),
        ingredients: parts[3] || "",
        options: options,
        priceNote: options.length ? "" : ownPrice
      });
    });

    return menu;
  }

  function tagsHtml(tags) {
    return (
      '<ul class="tags" aria-label="Dietary tags">' +
      tags
        .map(function (t) {
          return '<li class="tag tag--' + TAG_NAMES[t] + '">' + t + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  /* ---------- Menu page ---------- */

  function drawMenu(menu) {
    var html =
      '<p class="fine" style="text-align:center;margin-bottom:2.5rem">Menu for the week of <strong>' +
      escapeHtml(menu.weekOf) +
      "</strong></p>";

    menu.sections.forEach(function (section) {
      var isMeal = section.defaultPrice !== "";
      html +=
        '<div class="menu-group"><div class="menu-group__head"><h2>' +
        escapeHtml(section.name) +
        "</h2><span>" +
        (isMeal ? section.items.length + " choices" : "Add any of these to your week") +
        '</span></div><div class="menu-grid">';

      section.items.forEach(function (item) {
        html +=
          '<article class="menu-item"><h3>' +
          escapeHtml(item.name) +
          "</h3><p>" +
          escapeHtml(item.description) +
          "</p>" +
          (isMeal ? "" : '<p class="menu-item__price">' + escapeHtml(priceText(item)) + "</p>") +
          tagsHtml(item.tags) +
          (item.ingredients
            ? '<details class="ingredients"><summary>Ingredients</summary><p>' +
              escapeHtml(item.ingredients) +
              "</p></details>"
            : "") +
          "</article>";
      });

      html += "</div></div>";
    });

    menuBox.innerHTML = html;
  }

  /* ---------- Order page ---------- */

  function drawOrderForm(menu) {
    var picks = document.getElementById("order-picks");
    var rows = []; // one row per thing someone can order
    var html = "";

    menu.sections.forEach(function (section) {
      var orderable = section.items.filter(function (item) {
        return item.options.length;
      });
      if (!orderable.length) return;

      var sectionPrice = readPrices(section.defaultPrice)[0];
      html +=
        '<div class="order-group"><div class="menu-group__head"><h3>' +
        escapeHtml(section.name) +
        "</h3><span>" +
        (sectionPrice ? money(sectionPrice.price) + " " + escapeHtml(sectionPrice.label) : "") +
        "</span></div>";

      orderable.forEach(function (item) {
        item.options.forEach(function (option) {
          var i = rows.length;
          var name = item.options.length > 1 ? item.name + ", " + option.label : item.name;
          rows.push({ section: section.name, name: name, price: option.price });

          var showPrice = !sectionPrice || item.options.length > 1 || option.price !== sectionPrice.price;
          html +=
            '<div class="order-row">' +
            '<div class="order-row__info"><label for="dish-' + i + '">' + escapeHtml(name) + "</label>" +
            (showPrice ? '<span class="order-row__price">' + money(option.price) + (option.label ? " " + escapeHtml(option.label) : "") + "</span>" : "") +
            tagsHtml(item.tags) +
            "</div>" +
            '<div class="stepper">' +
            '<button type="button" class="stepper__btn" data-step="-1" data-for="dish-' + i + '" aria-label="One less ' + escapeHtml(name) + '">&minus;</button>' +
            '<input type="number" id="dish-' + i + '" data-row="' + i + '" min="0" max="40" step="1" value="0" inputmode="numeric">' +
            '<button type="button" class="stepper__btn" data-step="1" data-for="dish-' + i + '" aria-label="One more ' + escapeHtml(name) + '">+</button>' +
            "</div></div>";
        });
      });

      html += "</div>";
    });

    picks.innerHTML = html;

    var weekField = orderForm.querySelector('[name="week_of"]');
    weekField.value = menu.weekOf;
    document.querySelectorAll("[data-week-of]").forEach(function (el) {
      el.textContent = menu.weekOf;
    });

    var summaryField = orderForm.querySelector('[name="order_summary"]');
    var totalField = orderForm.querySelector('[name="estimated_total"]');
    var totalBox = document.getElementById("order-total");
    var totalAmount = document.getElementById("order-total-amount");
    var totalCount = document.getElementById("order-total-count");
    var totalNote = document.getElementById("order-total-note");
    var errorBox = document.getElementById("order-error");

    function choice() {
      var picked = orderForm.querySelector('[name="week_choice"]:checked');
      return picked ? picked.value : "";
    }

    function update() {
      var total = 0;
      var count = 0;
      var lines = [];
      var lastSection = "";

      rows.forEach(function (row, i) {
        var input = document.getElementById("dish-" + i);
        var qty = Math.max(0, Math.floor(Number(input.value) || 0));
        if (!qty) return;
        if (row.section !== lastSection) {
          lines.push((lines.length ? "\n" : "") + row.section);
          lastSection = row.section;
        }
        lines.push("- " + row.name + ": " + qty + " (" + money(qty * row.price) + ")");
        total += qty * row.price;
        count += qty;
      });

      totalAmount.textContent = money(total);
      totalCount.textContent = count === 1 ? "1 item" : count + " items";

      if (count === 0) {
        totalNote.textContent = "Plus groceries at cost.";
      } else if (total < COOK_DAY_MINIMUM) {
        totalNote.textContent =
          "Plus groceries at cost. Cook days have a " + money(COOK_DAY_MINIMUM) +
          " minimum, so you're " + money(COOK_DAY_MINIMUM - total) + " away.";
      } else {
        totalNote.textContent = "Plus groceries at cost.";
      }

      var picking = choice() === "Pick my meals";
      totalBox.classList.toggle("is-hidden", !picking);
      summaryField.value = picking ? lines.join("\n") : "";
      totalField.value = picking ? money(total) + " plus groceries" : "";
      if (count > 0) errorBox.classList.add("is-hidden");
      return count;
    }

    picks.addEventListener("click", function (e) {
      var btn = e.target.closest(".stepper__btn");
      if (!btn) return;
      var input = document.getElementById(btn.getAttribute("data-for"));
      var next = (Math.floor(Number(input.value) || 0)) + Number(btn.getAttribute("data-step"));
      input.value = Math.min(40, Math.max(0, next));
      update();
    });

    orderForm.addEventListener("input", update);
    orderForm.addEventListener("change", update);

    orderForm.addEventListener("submit", function (e) {
      var count = update();
      if (choice() === "Pick my meals" && count === 0) {
        e.preventDefault();
        errorBox.classList.remove("is-hidden");
        errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    update();
  }

  /* ---------- Client code check (order page) ---------- */

  function setUpGate(menu) {
    var gate = document.getElementById("order-gate");
    var gateForm = document.getElementById("gate-form");
    var codeInput = document.getElementById("client-code");
    var wrong = document.getElementById("gate-wrong");
    var formWrap = document.getElementById("order-form-wrap");
    var realCode = menu.clientCode.toUpperCase();

    function matches(code) {
      return realCode !== "" && String(code || "").trim().toUpperCase() === realCode;
    }

    function open() {
      gate.classList.add("is-hidden");
      formWrap.classList.remove("is-hidden");
      try {
        localStorage.setItem("ffc-client-code", realCode);
      } catch (err) {}
    }

    // The link you text clients can carry the code, like order.html?code=FULLFRIDGE
    var fromLink = new URLSearchParams(window.location.search).get("code");
    var remembered = "";
    try {
      remembered = localStorage.getItem("ffc-client-code") || "";
    } catch (err) {}

    if (matches(fromLink) || matches(remembered)) {
      open();
      return;
    }

    gate.classList.remove("is-hidden");
    gateForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (matches(codeInput.value)) {
        open();
      } else {
        wrong.classList.remove("is-hidden");
      }
    });
  }

  /* ---------- Load menu.txt ---------- */

  fetch("menu.txt", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("Menu not found");
      return res.text();
    })
    .then(function (text) {
      var menu = parseMenu(text);
      if (menuBox) drawMenu(menu);
      if (orderForm) {
        drawOrderForm(menu);
        setUpGate(menu);
      }
    })
    .catch(function () {
      var box = menuBox || document.getElementById("order-gate");
      box.classList.remove("is-hidden");
      box.innerHTML =
        '<div class="panel" style="text-align:center"><p>Sorry, the menu didn\'t load. Please refresh the page. If it still doesn\'t work, just text me your order.</p></div>';
    });
})();
