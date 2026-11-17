"use strict";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function filterFromHash(hash, validIds) {
  const raw = String(hash || "").replace(/^#/, "").trim().toLowerCase();
  if (!raw) return "all";
  return validIds.includes(raw) ? raw : "all";
}

function projectsFor(projects, filterId) {
  if (!filterId || filterId === "all") return projects.slice();
  return projects.filter((p) => Array.isArray(p.tags) && p.tags.includes(filterId));
}

function renderCard(p) {
  const tags = (p.tags || [])
    .map((t) => `<span class="chip">${escapeHtml(t.replace(/-/g, " "))}</span>`)
    .join("");
  const result = p.result
    ? `<p class="card-result">${escapeHtml(p.result)}</p>`
    : "";
  return `<button type="button" class="project-card" data-id="${escapeHtml(p.id)}" aria-haspopup="dialog">
  <span class="card-meta">${escapeHtml(p.client)}</span>
  <span class="card-title">${escapeHtml(p.title)}</span>
  <span class="card-summary">${escapeHtml(p.summary)}</span>
  <span class="card-tags">${tags}</span>
  ${result}
</button>`;
}

function section(title, body) {
  if (!body) return "";
  return `<section class="case-section"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></section>`;
}

function renderCaseStudy(p) {
  const parts = [];
  parts.push(`<header class="case-header"><p class="eyebrow">${escapeHtml(p.client)}</p><h2 id="case-title">${escapeHtml(p.title)}</h2>`);
  if (p.period) parts.push(`<p class="case-period">${escapeHtml(p.period)}</p>`);
  parts.push(`<p class="case-summary">${escapeHtml(p.summary)}</p></header>`);
  parts.push(section("Problem", p.problem));
  parts.push(section("What I built", p.built));
  parts.push(section("Role", p.role));
  if (p.status) parts.push(section("Status", p.status));
  if (Array.isArray(p.stack) && p.stack.length) {
    parts.push(
      `<section class="case-section"><h3>Stack</h3><ul class="stack-list">${p.stack
        .map((s) => `<li>${escapeHtml(s)}</li>`)
        .join("")}</ul></section>`
    );
  }
  if (p.result) parts.push(section("Result", p.result));
  if (p.diagram) {
    parts.push(
      `<section class="case-section"><h3>Architecture</h3>${renderDiagram(p.diagram)}</section>`
    );
  }
  return parts.join("");
}

function renderDiagram(d) {
  if (!d || !Array.isArray(d.nodes)) return "";
  const cellW = 140;
  const cellH = 72;
  const padX = 24;
  const padY = 28;
  const boxW = 112;
  const boxH = 40;
  let maxCol = 0;
  let maxRow = 0;
  const centers = {};
  for (const n of d.nodes) {
    maxCol = Math.max(maxCol, n.col);
    maxRow = Math.max(maxRow, n.row);
    centers[n.id] = {
      x: padX + n.col * cellW + boxW / 2,
      y: padY + n.row * cellH + boxH / 2,
    };
  }
  const width = padX * 2 + (maxCol + 1) * cellW;
  const height = padY * 2 + (maxRow + 1) * cellH;
  const edges = (d.edges || [])
    .map(([from, to]) => {
      const a = centers[from];
      const b = centers[to];
      if (!a || !b) return "";
      return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#e0a458" stroke-width="1.5" marker-end="url(#arrow)" />`;
    })
    .join("");
  const nodes = d.nodes
    .map((n) => {
      const c = centers[n.id];
      const x = c.x - boxW / 2;
      const y = c.y - boxH / 2;
      return `<rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="6" ry="6" fill="#0e0e10" stroke="#e0a458" stroke-width="1.5" />
      <text x="${c.x}" y="${c.y + 4}" text-anchor="middle" fill="#ece8e1" font-size="11" font-family="system-ui,sans-serif">${escapeHtml(n.label)}</text>`;
    })
    .join("");
  return `<svg role="img" aria-label="Architecture: ${escapeHtml(
    d.nodes.map((n) => n.label).join(" → ")
  )}" viewBox="0 0 ${width} ${height}" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0a458" /></marker></defs>
  ${edges}${nodes}
</svg>`;
}

function setPressed(buttons, activeId) {
  buttons.forEach((btn) => {
    const on = btn.dataset.filter === activeId;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function fillProjects(doc, projects, filterId) {
  const mount = doc.getElementById("projects");
  if (!mount) return;
  const list = projectsFor(projects, filterId);
  mount.innerHTML = list.map(renderCard).join("");
}

function boot(doc, content) {
  if (!doc || !content) return;
  const profile = content.profile || {};
  const validIds = (content.filters || []).map((f) => f.id);

  const hero = doc.getElementById("hero");
  if (hero) {
    const photo = profile.photo
      ? `<img class="hero-photo" src="${escapeHtml(profile.photo)}" alt="${escapeHtml(profile.name)}" width="160" height="160" />`
      : `<div class="monogram" aria-hidden="true">${escapeHtml(profile.monogram || "MSA")}</div>`;
    hero.innerHTML = `
      ${photo}
      <p class="eyebrow">${escapeHtml(profile.label || "")}</p>
      <h1>${escapeHtml(profile.name || "")}</h1>
      <p class="pitch">${escapeHtml(profile.pitch || "")}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${escapeHtml(profile.cv || "#")}">Download CV</a>
        <a class="btn btn-ghost" href="${escapeHtml(profile.linkedin || "#")}" rel="noopener noreferrer" target="_blank">LinkedIn</a>
      </div>
      <p class="hero-email"><a href="mailto:${escapeHtml(profile.email || "")}">${escapeHtml(profile.email || "")}</a></p>
    `;
  }

  const clients = doc.getElementById("clients");
  if (clients) {
    const items = (content.clients || [])
      .map((c) => {
        const name = typeof c === "string" ? c : c.name;
        const logo = typeof c === "string" ? null : c.logo;
        const mark = logo
          ? `<img class="logo-mark" src="${escapeHtml(logo)}" alt="" width="28" height="28" loading="lazy" onerror="this.remove()" />`
          : `<span class="logo-fallback" aria-hidden="true">${escapeHtml((name || "?").slice(0, 1))}</span>`;
        return `<li class="logo-item">${mark}<span>${escapeHtml(name || "")}</span></li>`;
      })
      .join("");
    clients.innerHTML = `<ul class="logo-strip" aria-label="Clients">${items}</ul>`;
  }

  const filtersEl = doc.getElementById("filters");
  if (filtersEl) {
    const buttons = [
      `<button type="button" class="filter-btn" data-filter="all" aria-pressed="true">All</button>`,
    ].concat(
      (content.filters || []).map(
        (f) =>
          `<button type="button" class="filter-btn" data-filter="${escapeHtml(f.id)}" aria-pressed="false">${escapeHtml(f.label)}</button>`
      )
    );
    filtersEl.innerHTML = buttons.join("");
  }

  const more = doc.getElementById("more");
  if (more) {
    more.innerHTML = `<h3>More work</h3><ul>${(content.moreWork || [])
      .map((m) => `<li>${escapeHtml(m)}</li>`)
      .join("")}</ul>`;
  }

  const experience = doc.getElementById("experience");
  if (experience) {
    experience.innerHTML = (content.experience || [])
      .map((role) => {
        const meta = [role.location, role.note].filter(Boolean).map(escapeHtml).join(" · ");
        const logo = role.logo
          ? `<img class="role-logo" src="${escapeHtml(role.logo)}" alt="" width="32" height="32" loading="lazy" onerror="this.remove()" />`
          : `<span class="role-logo role-logo-fallback" aria-hidden="true">${escapeHtml((role.org || "?").slice(0, 1))}</span>`;
        return `<article class="role">
          <div class="role-head">${logo}<div>
            <h3>${escapeHtml(role.title)}</h3>
            <p class="role-org">${escapeHtml(role.org)} · ${escapeHtml(role.period)}</p>
          </div></div>
          ${meta ? `<p class="role-meta">${meta}</p>` : ""}
          <ul>${(role.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </article>`;
      })
      .join("");
  }

  const credentials = doc.getElementById("credentials");
  if (credentials) {
    const certs = (content.certifications || [])
      .map((c) => {
        const id = c.id ? ` · ${escapeHtml(c.id)}` : "";
        return `<li>${escapeHtml(c.name)} — ${escapeHtml(c.year)}${id}</li>`;
      })
      .join("");
    const pub = content.publication
      ? `<p><a href="${escapeHtml(content.publication.url)}" rel="noopener noreferrer" target="_blank">${escapeHtml(content.publication.title)}</a> — ${escapeHtml(content.publication.venue)}. ${escapeHtml(content.publication.note || "")}</p>`
      : "";
    const honour = content.honour
      ? `<p>${escapeHtml(content.honour.title)} — ${escapeHtml(content.honour.detail)}</p>`
      : "";
    const edu = (content.education || [])
      .map(
        (e) =>
          `<li>${escapeHtml(e.degree)}, ${escapeHtml(e.school)} (${escapeHtml(e.period)})</li>`
      )
      .join("");
    credentials.innerHTML = `
      <h3>Certifications</h3><ul>${certs}</ul>
      <h3>Publication</h3>${pub}
      <h3>Honour</h3>${honour}
      <h3>Education</h3><ul>${edu}</ul>
    `;
  }

  const speaking = doc.getElementById("speaking");
  if (speaking) {
    speaking.innerHTML = `<h2 id="speaking-heading">Speaking &amp; teaching</h2><ul>${(content.speaking || [])
      .map((s) => `<li>${escapeHtml(s)}</li>`)
      .join("")}</ul>`;
  }

  const contact = doc.getElementById("contact");
  if (contact) {
    const phoneSa = profile.phone
      ? `<li><a href="tel:${escapeHtml(String(profile.phone).replace(/\s+/g, ""))}">${escapeHtml(profile.phone)} <span class="contact-label">Saudi Arabia</span></a></li>`
      : "";
    const phonePk = profile.phonePk
      ? `<li><a href="tel:${escapeHtml(String(profile.phonePk).replace(/\s+/g, ""))}">${escapeHtml(profile.phonePk)} <span class="contact-label">Pakistan</span></a></li>`
      : "";
    contact.innerHTML = `
      <h2 id="contact-heading">Contact</h2>
      <ul class="contact-list">
        <li><a href="mailto:${escapeHtml(profile.email || "")}">${escapeHtml(profile.email || "")}</a></li>
        ${phoneSa}
        ${phonePk}
        <li><a href="${escapeHtml(profile.linkedin || "#")}" rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
        <li><a href="${escapeHtml(profile.orcid || "#")}" rel="noopener noreferrer" target="_blank">ORCID</a></li>
        <li><a href="${escapeHtml(profile.cv || "#")}">Download CV</a></li>
      </ul>
    `;
  }

  const dialog = doc.getElementById("case");
  let lastFocus = null;

  function openCase(id, trigger) {
    const project = (content.projects || []).find((p) => p.id === id);
    if (!project || !dialog) return;
    lastFocus = trigger || doc.activeElement;
    const bodyTarget = doc.getElementById("case-body");
    if (bodyTarget) {
      bodyTarget.innerHTML = renderCaseStudy(project);
    } else {
      dialog.innerHTML = `<form method="dialog"><button type="submit" class="case-close" aria-label="Close">Close</button></form>${renderCaseStudy(project)}`;
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  if (dialog) {
    dialog.addEventListener("close", () => {
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    });
  }

  const filterButtons = () => Array.from(doc.querySelectorAll("#filters .filter-btn"));

  function applyFilter(id, pushHash) {
    const active = id === "all" || validIds.includes(id) ? id : "all";
    setPressed(filterButtons(), active);
    fillProjects(doc, content.projects || [], active);
    if (pushHash && typeof location !== "undefined") {
      const hash = active === "all" ? "" : `#${active}`;
      if (location.hash !== hash) {
        if (hash) location.hash = hash;
        else history.replaceState(null, "", location.pathname + location.search);
      }
    }
    const projectMount = doc.getElementById("projects");
    if (projectMount) {
      projectMount.onclick = (ev) => {
        const btn = ev.target.closest("button[data-id]");
        if (btn) openCase(btn.dataset.id, btn);
      };
    }
  }

  filterButtons().forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter, true);
      const work = doc.getElementById("work");
      if (work) work.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const initial =
    typeof location !== "undefined" ? filterFromHash(location.hash, validIds) : "all";
  applyFilter(initial, false);

  if (typeof window !== "undefined") {
    window.addEventListener("hashchange", () => {
      applyFilter(filterFromHash(location.hash, validIds), false);
    });
  }

  return { applyFilter, openCase };
}

function initTheme(doc, storage) {
  if (!doc || !doc.documentElement) return;
  const root = doc.documentElement;
  const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  let current = root.getAttribute("data-theme");
  if (current !== "light" && current !== "dark") {
    try {
      current = store && store.getItem("theme") === "light" ? "light" : "dark";
    } catch (e) {
      current = "dark";
    }
    root.setAttribute("data-theme", current);
  }
  const radios = doc.querySelectorAll('input[name="theme"]');
  radios.forEach((radio) => {
    radio.checked = radio.value === current;
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      root.setAttribute("data-theme", radio.value);
      try {
        if (store) store.setItem("theme", radio.value);
      } catch (e) {
        /* ignore quota / private mode */
      }
    });
  });
}

const api = {
  escapeHtml,
  filterFromHash,
  projectsFor,
  renderCard,
  renderCaseStudy,
  renderDiagram,
  boot,
  initTheme,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = api;
} else if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme(document);
    boot(document, window.CONTENT);
  });
}
