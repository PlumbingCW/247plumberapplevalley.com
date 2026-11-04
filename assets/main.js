(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.remove("no-js");
  var burger = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("mob-close");
  var lastFocus = null;

  function openMenu() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add("open");
    overlay.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    root.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    if (!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    root.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      if (drawer.classList.contains("open")) closeMenu(); else openMenu();
    });
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    drawer.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (a) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && drawer.classList.contains("open")) closeMenu();
    });
  }

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-item.open .faq-a"), function (a) {
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });
})();
