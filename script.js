(function () {
  var root = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    save("theme", next);
  });

  document.getElementById("lang-toggle").addEventListener("click", function () {
    var next = root.dataset.lang === "es" ? "en" : "es";
    root.dataset.lang = next;
    root.lang = next;
    save("lang", next);
  });
})();
