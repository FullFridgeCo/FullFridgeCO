/* =========================================================
   FULL FRIDGE CO. : form helpers
   ---------------------------------------------------------
   1. Questions that only show up when they matter.
      Add  data-show-if="fieldname>0"  or
           data-show-if="fieldname=Some answer"
      to a wrapper, and it shows only when that's true.
      Inputs inside marked  data-required-if-shown  become
      required only while they're showing.

   2. Checkbox groups where at least one box must be ticked.
      Add  data-required-group  to the <fieldset>.
   ========================================================= */

(function () {
  var forms = document.querySelectorAll("form[data-netlify]");
  if (!forms.length) return;

  forms.forEach(function (form) {
    var conditionals = form.querySelectorAll("[data-show-if]");

    function valueOf(name) {
      var fields = form.querySelectorAll('[name="' + name + '"]');
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        if (f.type === "radio" || f.type === "checkbox") {
          if (f.checked) return f.value;
        } else {
          return f.value;
        }
      }
      return "";
    }

    function update() {
      conditionals.forEach(function (box) {
        var rule = box.getAttribute("data-show-if");
        var show = false;
        var m;
        if ((m = rule.match(/^(.+?)>(.+)$/))) {
          show = Number(valueOf(m[1])) > Number(m[2]);
        } else if ((m = rule.match(/^(.+?)=(.+)$/))) {
          show = valueOf(m[1]) === m[2];
        }
        box.classList.toggle("is-hidden", !show);
        box.querySelectorAll("[data-required-if-shown]").forEach(function (input) {
          input.required = show;
        });
      });
    }

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();

    /* At least one checkbox in a required group */
    var groups = form.querySelectorAll("fieldset[data-required-group]");

    function checkGroup(group) {
      var boxes = group.querySelectorAll('input[type="checkbox"]');
      var anyChecked = Array.prototype.some.call(boxes, function (b) {
        return b.checked;
      });
      boxes[0].setCustomValidity(anyChecked ? "" : "Please pick at least one.");
      return anyChecked;
    }

    groups.forEach(function (group) {
      group.addEventListener("change", function () {
        checkGroup(group);
      });
      checkGroup(group);
    });
  });
})();
