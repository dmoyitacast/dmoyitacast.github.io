(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  /* ---------- Language toggle ---------- */
  document.getElementById("lang-toggle").addEventListener("click", function () {
    var next = root.dataset.lang === "es" ? "en" : "es";
    root.dataset.lang = next;
    root.lang = next;
    save("lang", next);
    restartTyping();
  });

  /* ---------- Typing effect ---------- */
  var roles = {
    es: ["Data Scientist", "Data Analyst", "Modelización estadística", "Machine Learning", "IA generativa · LLMs"],
    en: ["Data Scientist", "Data Analyst", "Statistical modelling", "Machine Learning", "Generative AI · LLMs"]
  };
  var typedEl = document.getElementById("typed");
  var typingTimer = null;

  function restartTyping() {
    clearTimeout(typingTimer);
    var list = roles[root.dataset.lang] || roles.es;
    if (reduceMotion) { typedEl.textContent = list[0]; return; }
    var i = 0, chars = 0, deleting = false;
    (function tick() {
      var word = list[i];
      chars += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, chars);
      var delay = deleting ? 40 : 85;
      if (!deleting && chars === word.length) { deleting = true; delay = 1700; }
      else if (deleting && chars === 0) { deleting = false; i = (i + 1) % list.length; delay = 350; }
      typingTimer = setTimeout(tick, delay);
    })();
  }
  restartTyping();

  /* ---------- Top bar background + active section ---------- */
  var topbar = document.getElementById("topbar");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });

  function onScroll() {
    topbar.classList.toggle("scrolled", window.scrollY > 20);
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = -1;
    sections.forEach(function (s, idx) { if (s && s.offsetTop <= pos) current = idx; });
    navLinks.forEach(function (a, idx) { a.classList.toggle("active", idx === current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Projects (data in projects.js) ---------- */
  var projects = window.PROJECTS || [];
  var TYPES = {
    client: { es: "Cliente", en: "Client", plural: { es: "Cliente", en: "Client" } },
    personal: { es: "Personal", en: "Personal", plural: { es: "Personales", en: "Personal" } },
    academic: { es: "Académico", en: "Academic", plural: { es: "Académicos", en: "Academic" } }
  };
  var ICONS = {
    chart: '<path d="M3 20h18M6 16l4-5 3 3 5-7"/>',
    map: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    bank: '<path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
    shop: '<path d="M4 8h16l-1.5 12h-13L4 8zM9 8V6a3 3 0 0 1 6 0v2"/>',
    health: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    energy: '<path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z"/>',
    brain: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 7 3.4 3.6M7 17l3.4-3.6M13.6 10.4 17 7M13.6 13.6 17 17"/>'
  };

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Bilingual text: a plain string, or { es, en } rendered as two spans toggled by CSS
  function bi(v) {
    if (v == null) return "";
    if (typeof v === "string") return esc(v);
    return '<span lang="es">' + esc(v.es) + '</span><span lang="en">' + esc(v.en || v.es) + "</span>";
  }

  function cardHTML(p) {
    var type = TYPES[p.type] || TYPES.academic;
    var badges = '<span class="badge badge-' + esc(p.type) + '">' + bi(type) + "</span>";
    if (p.status === "in-progress") badges += '<span class="badge badge-progress">' + bi({ es: "En curso", en: "In progress" }) + "</span>";
    var thumb = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || "") + '" loading="lazy">'
      : '<div class="placeholder"><svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[p.icon] || ICONS.chart) + "</svg>" + (p.sector ? '<span>' + bi(p.sector) + "</span>" : "") + "</div>";
    var metric = p.metric ? '<p class="metric">' + bi(p.metric.label) + " <strong>" + bi(p.metric.value) + "</strong></p>" : "";
    var tags = (p.tags || []).map(function (t) { return "<li>" + bi(t) + "</li>"; }).join("");
    var links = (p.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + bi(l.label) + " →</a>";
    }).join("");
    return '<article class="card reveal" data-type="' + esc(p.type) + '">' +
      '<div class="thumb' + (p.image ? "" : " no-image") + '">' + thumb + '<div class="badges">' + badges + "</div></div>" +
      '<div class="card-body">' +
        (p.kicker ? '<p class="kicker">' + bi(p.kicker) + "</p>" : "") +
        "<h3>" + bi(p.title) + "</h3>" +
        '<p class="desc">' + bi(p.description) + "</p>" +
        metric +
        (tags ? '<ul class="tags">' + tags + "</ul>" : "") +
        (links ? '<div class="links">' + links + "</div>" : "") +
      "</div></article>";
  }

  var grid = document.getElementById("project-grid");
  var filterBox = document.getElementById("project-filters");
  if (grid) {
    grid.innerHTML = projects.map(cardHTML).join("");
    // Only offer filters for types that actually have projects
    var present = Object.keys(TYPES).filter(function (t) { return projects.some(function (p) { return p.type === t; }); });
    if (present.length > 1) {
      filterBox.innerHTML = '<button class="filter active" data-filter="all">' + bi({ es: "Todos", en: "All" }) + "</button>" +
        present.map(function (t) { return '<button class="filter" data-filter="' + t + '">' + bi(TYPES[t].plural) + "</button>"; }).join("");
    } else {
      filterBox.remove();
    }
    var countEl = document.getElementById("projects-count");
    if (countEl) countEl.dataset.target = projects.filter(function (p) { return p.status === "done"; }).length;
  }

  /* ---------- Scroll reveal + counters ---------- */
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target), suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        Array.prototype.forEach.call(entry.target.querySelectorAll(".counter"), animateCounter);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el, idx) {
      el.style.transitionDelay = (idx % 3) * 80 + "ms";
      io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { el.classList.add("visible"); });
    Array.prototype.forEach.call(document.querySelectorAll(".counter"), animateCounter);
  }

  /* ---------- Project filters ---------- */
  var filters = document.querySelectorAll(".filter");
  var cards = document.querySelectorAll(".card");
  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener("click", function () {
      Array.prototype.forEach.call(filters, function (b) { b.classList.toggle("active", b === btn); });
      var f = btn.dataset.filter;
      Array.prototype.forEach.call(cards, function (c) {
        c.classList.toggle("hidden", f !== "all" && c.dataset.type !== f);
      });
    });
  });

  /* ---------- Card glow follows the pointer ---------- */
  Array.prototype.forEach.call(cards, function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- Animated network background ---------- */
  var canvas = document.getElementById("network");
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var nodes = [], w = 0, h = 0, linkDist = 190, t0 = 0;
  var mouse = { x: -9999, y: -9999 };

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(Math.round((w * h) / 17000), 100);
    linkDist = w < 680 ? 140 : 190;
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
        r: Math.random() * 1.8 + 1.6, violet: Math.random() < 0.3
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < nodes.length; i++) {
      var a = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < linkDist * linkDist) {
          var alpha = Math.pow(1 - Math.sqrt(d2) / linkDist, 1.5) * 0.4;
          ctx.strokeStyle = "rgba(129, 140, 248," + alpha + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      var mdx = a.x - mouse.x, mdy = a.y - mouse.y, md2 = mdx * mdx + mdy * mdy;
      if (md2 < 220 * 220) {
        ctx.strokeStyle = "rgba(96, 165, 250," + (1 - Math.sqrt(md2) / 220) * 0.45 + ")";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      ctx.fillStyle = n.violet ? "rgba(167, 139, 250, .85)" : "rgba(96, 165, 250, .85)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function step(ts) {
    // Frame-rate independent, slow drift with a gentle sinusoidal sway
    var dt = t0 ? Math.min((ts - t0) / 16.7, 3) : 1;
    t0 = ts;
    var time = ts / 1000;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.x += (n.vx + Math.cos(time * 0.25 + n.phase) * 0.04) * dt;
      n.y += (n.vy + Math.sin(time * 0.2 + n.phase) * 0.04) * dt;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    draw();
    if (!document.hidden) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
  if (reduceMotion) {
    draw();
  } else {
    requestAnimationFrame(step);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) { t0 = 0; requestAnimationFrame(step); } });
  }
})();
