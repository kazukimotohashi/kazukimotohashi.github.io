// Custom JS for academic website
// Handles: toggle animations, paper separators, back-to-top button
// Author: Kazuki Motohashi
// Date: 2026-04-07

document.addEventListener("DOMContentLoaded", function () {
  initDetailToggles();
  initPaperSeparators();

  initBackToTop();
});

// --- Detail Toggle Animation ---
function initDetailToggles() {
  document.querySelectorAll(".detail-toggle__summary").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var parent = btn.parentElement;
      var content = parent.querySelector(".detail-toggle__content");
      var inner = content.querySelector(".detail-toggle__inner");
      var isOpen = parent.classList.contains("is-open");

      if (isOpen) {
        // Close: set explicit height first, then animate to 0
        content.style.maxHeight = content.scrollHeight + "px";
        content.offsetHeight; // force reflow
        content.style.maxHeight = "0px";
        content.setAttribute("aria-hidden", "true");
        btn.setAttribute("aria-expanded", "false");
        parent.classList.remove("is-open");
      } else {
        // Open: animate from 0 to scrollHeight
        content.style.maxHeight = inner.scrollHeight + "px";
        content.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        parent.classList.add("is-open");
      }
    });

    // After transition ends, set max-height to none for natural reflow
    var content = btn.parentElement.querySelector(".detail-toggle__content");
    content.addEventListener("transitionend", function () {
      if (btn.parentElement.classList.contains("is-open")) {
        content.style.maxHeight = "none";
      }
    });
  });
}

// --- Paper Separators ---
// Convert &nbsp; paragraphs into clean spacing elements
function initPaperSeparators() {
  var container = document.querySelector(".post__content");
  if (!container) return;

  container.querySelectorAll("p").forEach(function (p) {
    var text = p.textContent.trim();
    if (text === "" || text === "\u00a0") {
      var spacer = document.createElement("div");
      spacer.className = "paper-spacer";
      p.replaceWith(spacer);
    }
  });
}


// --- Back to Top Button ---
function initBackToTop() {
  var btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.textContent = "\u25B2"; // ▲
  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
