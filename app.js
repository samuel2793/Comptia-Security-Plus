const DOMAINS = [
  {
    id: "dominio-1",
    number: "Dominio 1",
    title: "Conceptos generales de seguridad",
    path: "Dominio 1: Conceptos generales de seguridad",
    files: [
      "01.Controles de seguridad: comparar y contrastar distintos tipos de controles de seguridad.md",
      "02.Conceptos fundamentales de seguridad: resumir los conceptos fundamentales de seguridad.md",
      "03.Gestión de cambios: explicar la importancia de los procesos de gestión de cambios y su impacto en la seguridad.md",
      "04.Criptografía: explicar la importancia de utilizar soluciones criptográficas apropiadas.md"
    ]
  },
  {
    id: "dominio-2",
    number: "Dominio 2",
    title: "Amenazas, vulnerabilidades y mitigaciones",
    path: "Dominio 2: Amenazas, vulnerabilidades y mitigaciones",
    files: [
      "01.Actores de amenazas y motivaciones: comparar y contrastar actores de amenazas comunes y sus motivaciones.md",
      "02.Vectores de amenaza y superficies de ataque: explicar vectores de amenaza y superficies de ataque comunes.md",
      "03.Vulnerabilidades: explicar distintos tipos de vulnerabilidades.md",
      "04.Actividad maliciosa: dado un escenario, analizar indicadores de actividad maliciosa.md",
      "05.Técnicas de mitigación: explicar el propósito de las técnicas de mitigación utilizadas para proteger una organización.md"
    ]
  },
  {
    id: "dominio-3",
    number: "Dominio 3",
    title: "Arquitectura de seguridad",
    path: "Dominio 3: Arquitectura de seguridad",
    files: [
      "01.Modelos de arquitectura: comparar y contrastar las implicaciones de seguridad de distintos modelos de arquitectura.md",
      "02.Infraestructura empresarial segura: dado un escenario, aplicar principios de seguridad para proteger la infraestructura empresarial.md",
      "03.Protección de datos: comparar y contrastar conceptos y estrategias para proteger los datos.md",
      "04.Resiliencia y recuperación: explicar la importancia de la resiliencia y la recuperación dentro de la arquitectura de seguridad.md"
    ]
  },
  {
    id: "dominio-4",
    number: "Dominio 4",
    title: "Operaciones de seguridad",
    path: "Dominio 4: Operaciones de seguridad",
    files: [
      "01.Seguridad de recursos informáticos: dado un escenario, aplicar técnicas de seguridad comunes a recursos informáticos.md",
      "02.Gestión de activos: explicar las implicaciones de seguridad de una gestión adecuada de activos de hardware, software y datos.md",
      "03.Gestión de vulnerabilidades: explicar las distintas actividades asociadas con la gestión de vulnerabilidades.md",
      "04.Alertas y monitorización: explicar conceptos y herramientas de alertas y monitorización de seguridad.md",
      "05.Capacidades de seguridad empresarial: dado un escenario, modificar las capacidades de una organización para mejorar su seguridad.md",
      "06.Identity and Access Management (IAM): dado un escenario, implementar y mantener la gestión de identidades y accesos.md",
      "07.Automatización y orquestación: explicar la importancia de la automatización y la orquestación en las operaciones seguras.md",
      "08.Respuesta a incidentes: explicar las actividades apropiadas de respuesta a incidentes.md",
      "09.Investigación mediante fuentes de datos: dado un escenario, utilizar fuentes de datos para apoyar una investigación.md"
    ]
  },
  {
    id: "dominio-5",
    number: "Dominio 5",
    title: "Gestión y supervisión del programa de seguridad",
    path: "Dominio 5: Gestión y supervisión del programa de seguridad",
    files: [
      "01.Gobernanza de seguridad: resumir los elementos de una gobernanza de seguridad eficaz.md",
      "02.Gestión de riesgos: explicar los elementos del proceso de gestión de riesgos.md",
      "03.Riesgos de terceros: explicar los procesos relacionados con la evaluación y gestión de riesgos de terceros.md",
      "04.Cumplimiento: resumir los elementos de un cumplimiento de seguridad eficaz.md",
      "05.Auditorías y evaluaciones: explicar los distintos tipos de auditorías y evaluaciones.md",
      "06.Concienciación de seguridad: dado un escenario, implementar prácticas de concienciación en seguridad.md"
    ]
  }
];

const menu = document.querySelector("#domainMenu");
const tocList = document.querySelector("#tocList");
const content = document.querySelector("#content");
const searchInput = document.querySelector("#searchInput");
const epubButton = document.querySelector("#epubButton");
const printButton = document.querySelector("#printButton");
const summaryMenuButton = document.querySelector("#summaryMenuButton");
const testMenuButton = document.querySelector("#testMenuButton");
const menuToggle = document.querySelector("#menuToggle");
const menuBackdrop = document.querySelector("#menuBackdrop");

let activeDomain = null;
let activeLessons = [];
let testBatteries = [];
let currentTestRun = null;
let officialMockRun = null;
let officialMockTimer = null;
let testPopoverOutsideHandler = null;
let testDomainResizeHandler = null;
const textEncoder = new TextEncoder();
const baseUrl = new URL(".", document.baseURI);
const OFFICIAL_PASSING_SCORE = 700;
const OFFICIAL_SCORE_MAX = 1000;
const TEST_ORIGIN_ORDER = ["oficial", "gpt-2026", "udemy", "github", "otros"];
const TEST_ORIGIN_LABELS = {
  oficial: "Oficial",
  "gpt-2026": "GPT · CC 2026",
  udemy: "Udemy",
  github: "GitHub",
  otros: "Otros"
};
const TEST_ORIGIN_ICONS = {
  oficial: "🛡️",
  "gpt-2026": "✦",
  udemy: "🎓",
  github: "⌘",
  otros: "⋯"
};
const TEST_DOMAIN_OPTIONS = DOMAINS.map((domain, index) => ({
  id: domain.id,
  number: index + 1,
  shortLabel: domain.number,
  label: `${domain.number}: ${domain.title}`
}));

const SUMMARIES = [
  {
    id: "resumen-dominio-1",
    number: "Dominio 1",
    title: "General Security Concepts",
    file: "Resumenes y chuletas/Dominio 1 - General Security Concepts.md",
    available: false
  },
  {
    id: "resumen-dominio-2",
    number: "Dominio 2",
    title: "Threats, Vulnerabilities, and Mitigations",
    file: "Resumenes y chuletas/Dominio 2 - Threats, Vulnerabilities, and Mitigations.md",
    available: false
  },
  {
    id: "resumen-dominio-3",
    number: "Dominio 3",
    title: "Security Architecture",
    file: "Resumenes y chuletas/Dominio 3 - Security Architecture.md",
    available: false
  },
  {
    id: "resumen-dominio-4",
    number: "Dominio 4",
    title: "Security Operations",
    file: "Resumenes y chuletas/Dominio 4 - Security Operations.md",
    available: false
  },
  {
    id: "resumen-dominio-5",
    number: "Dominio 5",
    title: "Security Program Management and Oversight",
    file: "Resumenes y chuletas/Dominio 5 - Security Program Management and Oversight.md",
    available: false
  },
  {
    id: "resumen-simulacro-2026",
    number: "Examen final",
    title: "Simulacro oficial CC 2026",
    file: "Resumenes y chuletas/Simulacro oficial CC 2026.json",
    type: "exam",
    available: false
  }
];

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function siteUrl(path) {
  return new URL(encodePath(path), baseUrl).href;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseInline(value, basePath, options = {}) {
  let html = escapeHtml(value);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const url = href.startsWith("http") || href.startsWith("#") ? href : siteUrl(`${basePath}/${href}`);
    const attributes = options.xhtml ? "" : ' target="_blank" rel="noopener noreferrer"';
    return `<a href="${url}"${attributes}>${label}</a>`;
  });

  return html;
}

function readHtmlAttribute(html, tag, attribute) {
  const tagMatch = html.match(new RegExp(`<${tag}\\b[^>]*>`, "i"));
  if (!tagMatch) return "";

  const attributeMatch = tagMatch[0].match(new RegExp(`${attribute}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return attributeMatch ? attributeMatch[2] : "";
}

function readTagAttribute(tagHtml, attribute) {
  const attributeMatch = tagHtml.match(new RegExp(`${attribute}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return attributeMatch ? attributeMatch[2] : "";
}

function readHtmlTags(html, tag) {
  return html.match(new RegExp(`<${tag}\\b[^>]*>`, "gi")) || [];
}

function renderVideoBlock(html, basePath, options = {}) {
  const src = readHtmlAttribute(html, "source", "src");
  if (!src) return `<p>${parseInline(html, basePath, options)}</p>`;

  const resolvedSrc = options.resolveMediaSrc
    ? options.resolveMediaSrc(src)
    : siteUrl(`${basePath}/${src}`);

  if (options.xhtml) {
    return `<p><a href="${resolvedSrc}">Ver video</a></p>`;
  }

  const type = readHtmlAttribute(html, "source", "type") || "video/mp4";
  const tracks = readHtmlTags(html, "track")
    .map((trackHtml) => {
      const trackSrc = readTagAttribute(trackHtml, "src");
      if (!trackSrc) return "";

      const kind = readTagAttribute(trackHtml, "kind") || "subtitles";
      const srclang = readTagAttribute(trackHtml, "srclang") || "es";
      const label = readTagAttribute(trackHtml, "label") || srclang;
      const isDefault = /\sdefault(?:\s|>|=)/i.test(trackHtml) ? " default" : "";
      return `\n  <track src="${siteUrl(`${basePath}/${trackSrc}`)}" kind="${escapeHtml(kind)}" srclang="${escapeHtml(srclang)}" label="${escapeHtml(label)}"${isDefault}>`;
    })
    .join("");

  return `<video class="lesson-video" controls preload="metadata">
  <source src="${resolvedSrc}" type="${escapeHtml(type)}">${tracks}
  Tu navegador no soporta la reproduccion de video.
</video>`;
}

function renderMarkdown(markdown, basePath, options = {}) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^<video\b/i.test(trimmed)) {
      const videoLines = [trimmed];
      index += 1;
      while (index < lines.length && !/<\/video>/i.test(lines[index])) {
        videoLines.push(lines[index].trim());
        index += 1;
      }
      if (index < lines.length) {
        videoLines.push(lines[index].trim());
        index += 1;
      }
      blocks.push(renderVideoBlock(videoLines.join("\n"), basePath, options));
      continue;
    }

    const badge = trimmed.match(/^\[!BADGE:\s*(.+)\]$/i);
    if (badge) {
      const label = badge[1].trim();
      let badgeType = "info";
      if (/^LEGADO\b/i.test(label)) badgeType = "legacy";
      if (/^REUBICADO\s+2026\b/i.test(label)) badgeType = "moved";
      if (/^NUEVO\s+2026\b/i.test(label)) badgeType = "new";
      blocks.push(`<span class="content-badge ${badgeType}">${parseInline(label, basePath, options)}</span>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(`<blockquote>${parseInline(quoteLines.join(" "), basePath, options)}</blockquote>`);
      continue;
    }

    if (trimmed.startsWith("|") && index + 1 < lines.length && /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[index + 1].trim())) {
      const parseRow = (row) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
      const headers = parseRow(trimmed);
      index += 2;
      const rows = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(parseRow(lines[index].trim()));
        index += 1;
      }
      blocks.push(`<div class="table-wrap"><table><thead><tr>${headers.map((cell) => `<th>${parseInline(cell, basePath, options)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${parseInline(row[cellIndex] || "", basePath, options)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      const alt = escapeHtml(image[1] || "imagen");
      const src = options.resolveMediaSrc
        ? options.resolveMediaSrc(image[2])
        : siteUrl(`${basePath}/${image[2]}`);
      const lazy = options.xhtml ? "" : ' loading="lazy"';
      const close = options.xhtml ? " />" : ">";
      blocks.push(`<img src="${src}" alt="${alt}"${lazy}${close}`);
      index += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = Math.min(heading[1].length, 5);
      blocks.push(`<h${level}>${parseInline(heading[2], basePath, options)}</h${level}>`);
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(`<li>${parseInline(lines[index].trim().slice(2), basePath, options)}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const paragraph = [trimmed];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || next.startsWith("#") || next.startsWith("- ") || next.startsWith("![") || /^\[!BADGE:/i.test(next) || /^<video\b/i.test(next)) {
        break;
      }
      paragraph.push(next);
      index += 1;
    }
    blocks.push(`<p>${parseInline(paragraph.join(" "), basePath, options)}</p>`);
  }

  return blocks.join("\n");
}

function titleFromFile(file) {
  return file.replace(/^\d+\./, "").replace(/\.md$/, "");
}

function lessonBadge(markdown = "") {
  const match = markdown.match(/^\[!BADGE:\s*(.+)\]$/im);
  if (!match) return null;

  const label = match[1].trim();
  if (/^NUEVO\s+2026\b/i.test(label)) return { text: "Nuevo", type: "new", label };
  if (/^REUBICADO\s+2026\b/i.test(label)) return { text: "Movido", type: "moved", label };
  if (/^LEGADO\b/i.test(label)) return { text: "Legado", type: "legacy", label };
  if (/^AMPLIACION\b/i.test(label)) return { text: "Extra", type: "extra", label };
  if (/^COMPARTIDO\s+2026\b/i.test(label)) return { text: "Compartido", type: "shared", label };
  return { text: "Nota", type: "info", label };
}

function lessonId(domainId, file) {
  return `${domainId}-${file.slice(0, 2)}`;
}

function domainFromHash(hash) {
  return DOMAINS.find((domain) => hash === domain.id || hash.startsWith(`${domain.id}-`));
}

function setMobileMenuOpen(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
}

function closeMobileMenu() {
  setMobileMenuOpen(false);
}

function renderMenu() {
  menu.innerHTML = DOMAINS.map((domain) => `
    <button class="domain-button" type="button" data-domain="${domain.id}">
      <span class="domain-number">${domain.number}</span>
      <span class="domain-title">${domain.title}</span>
    </button>
  `).join("");

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-domain]");
    if (!button) return;
    loadDomain(button.dataset.domain);
    closeMobileMenu();
  });
}

function renderToc(domain, lessons = []) {
  const lessonsByFile = new Map(lessons.map((lesson) => [lesson.file, lesson]));

  tocList.innerHTML = domain.files.map((file) => {
    const badge = lessonBadge(lessonsByFile.get(file)?.markdown);
    const badgeHtml = badge
      ? `<span class="toc-badge ${badge.type}" title="${escapeHtml(badge.label)}">${escapeHtml(badge.text)}</span>`
      : "";

    return `
      <li>
        <a href="#${lessonId(domain.id, file)}">
          <span class="toc-item-title">${escapeHtml(titleFromFile(file))}</span>
          ${badgeHtml}
        </a>
      </li>
    `;
  }).join("");
}

function setActiveButton(domainId) {
  document.querySelectorAll(".domain-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.domain === domainId);
  });
  summaryMenuButton.classList.remove("active");
  testMenuButton.classList.remove("active");
}

async function fetchLesson(domain, file) {
  const url = siteUrl(`${domain.path}/${file}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${file} (${response.status})`);
  }

  return {
    file,
    markdown: await response.text()
  };
}

async function loadDomain(domainId, updateHash = true, scrollTarget = null) {
  stopOfficialMockTimer();
  officialMockRun = null;
  const domain = DOMAINS.find((item) => item.id === domainId) || DOMAINS[0];

  activeDomain = domain;
  activeLessons = [];
  setActiveButton(domain.id);
  renderToc(domain);
  searchInput.value = "";
  searchInput.disabled = false;
  searchInput.placeholder = "Buscar en el dominio actual";

  content.innerHTML = `<div class="loading-state">Cargando ${escapeHtml(domain.number)}...</div>`;

  try {
    const lessons = await Promise.all(domain.files.map((file) => fetchLesson(domain, file)));
    activeLessons = lessons;
    renderToc(domain, lessons);
    renderDomain(domain, lessons);

    if (updateHash) {
      history.replaceState(null, "", `#${domain.id}`);
    }

    if (scrollTarget) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTarget)?.scrollIntoView();
      });
    }
  } catch (error) {
    content.innerHTML = `<div class="error-state">${escapeHtml(error.message)}</div>`;
  }
}

function renderDomain(domain, lessons) {
  const body = lessons.map((lesson) => `
    <article id="${lessonId(domain.id, lesson.file)}" class="lesson markdown" data-search="${escapeHtml((titleFromFile(lesson.file) + " " + lesson.markdown).toLowerCase())}">
      ${renderMarkdown(lesson.markdown, domain.path)}
    </article>
  `).join("");

  content.innerHTML = `
    <header class="domain-header">
      <h1>${escapeHtml(domain.number)}: ${escapeHtml(domain.title)}</h1>
      <p class="domain-meta">${lessons.length} secciones unidas en una sola lectura.</p>
    </header>
    <div class="document">${body}</div>
  `;
}

function highlightText(container, query) {
  if (!query) return;

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.toLowerCase().includes(query)) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest("script, style, mark")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const text = node.nodeValue;
    const lower = text.toLowerCase();
    const fragment = document.createDocumentFragment();
    let start = 0;
    let match = lower.indexOf(query);

    while (match !== -1) {
      fragment.append(document.createTextNode(text.slice(start, match)));
      const mark = document.createElement("mark");
      mark.textContent = text.slice(match, match + query.length);
      fragment.append(mark);
      start = match + query.length;
      match = lower.indexOf(query, start);
    }

    fragment.append(document.createTextNode(text.slice(start)));
    node.parentNode.replaceChild(fragment, node);
  });
}

function filterLessons() {
  if (!activeDomain || activeLessons.length === 0) return;

  renderDomain(activeDomain, activeLessons);

  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  document.querySelectorAll(".lesson").forEach((lesson) => {
    const visible = lesson.dataset.search.includes(query);
    lesson.hidden = !visible;
    if (visible) highlightText(lesson, query);
  });
}

function resolveTestPath(file) {
  return file.includes("/") ? file : `tests/${file}`;
}

function slugify(value, fallback = "grupo") {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || fallback;
}

function answerIndex(question) {
  const answer = question.respuesta ?? question.correcta;
  if (Number.isInteger(answer)) return answer;
  if (typeof answer === "string") return question.opciones.indexOf(answer);
  return -1;
}

function normalizeQuestionDomain(value) {
  if (value === undefined || value === null || value === "") return null;
  if (Number.isInteger(value) && value >= 1 && value <= DOMAINS.length) return `dominio-${value}`;
  if (typeof value === "string") {
    const normalized = value.toLowerCase().trim();
    const numericMatch = normalized.match(/\d+/);
    if (normalized.startsWith("dominio-")) {
      return DOMAINS.some((domain) => domain.id === normalized) ? normalized : null;
    }
    if (numericMatch) {
      const number = Number(numericMatch[0]);
      if (number >= 1 && number <= DOMAINS.length) return `dominio-${number}`;
    }
  }
  return null;
}

function testOriginFromPath(path) {
  const origin = path.split("/")[1];
  return TEST_ORIGIN_ORDER.includes(origin) ? origin : "otros";
}

function normalizeBattery(raw, sourceName, group = null, origin = "otros") {
  if (!raw || typeof raw !== "object") {
    throw new Error(`${sourceName}: la bateria no es un objeto JSON valido`);
  }

  if (!raw.procedencia || typeof raw.procedencia !== "string") {
    throw new Error(`${sourceName}: falta el atributo obligatorio "procedencia"`);
  }

  if (!Array.isArray(raw.preguntas) || raw.preguntas.length === 0) {
    throw new Error(`${sourceName}: falta un array "preguntas" con al menos una pregunta`);
  }

  const preguntas = raw.preguntas.map((question, index) => {
    if (!question || typeof question !== "object") {
      throw new Error(`${sourceName}: la pregunta ${index + 1} no es valida`);
    }

    const texto = question.pregunta || question.enunciado;
    const opciones = question.opciones || question.respuestas;

    if (!texto || typeof texto !== "string") {
      throw new Error(`${sourceName}: la pregunta ${index + 1} no tiene "pregunta"`);
    }

    if (!Array.isArray(opciones) || opciones.length < 2) {
      throw new Error(`${sourceName}: la pregunta ${index + 1} necesita al menos dos opciones`);
    }

    const normalized = {
      pregunta: texto,
      opciones: opciones.map(String),
      respuesta: question.respuesta ?? question.correcta,
      explicacion: question.explicacion ? String(question.explicacion) : "",
      dominio: normalizeQuestionDomain(question.dominio ?? question.domain ?? question.dominioId ?? question.domainId)
    };

    const correct = answerIndex(normalized);
    if (correct < 0 || correct >= normalized.opciones.length) {
      throw new Error(`${sourceName}: la respuesta de la pregunta ${index + 1} no coincide con ninguna opcion`);
    }

    return normalized;
  });

  return {
    id: `${sourceName}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    titulo: raw.titulo || sourceName.replace(/\.json$/i, ""),
    descripcion: raw.descripcion || "",
    procedencia: raw.procedencia,
    origen: origin,
    grupo: group,
    preguntas
  };
}

async function fetchJson(path) {
  const response = await fetch(siteUrl(path));
  if (!response.ok) throw new Error(`No se pudo cargar ${path} (${response.status})`);
  return response.json();
}

async function loadTestBatteries() {
  const manifest = await fetchJson("tests/manifest.json");
  const entries = [];

  function pushEntry(file, group = null) {
    if (typeof file !== "string" || !file.trim()) {
      throw new Error('tests/manifest.json contiene una bateria sin ruta valida');
    }
    entries.push({ file, group });
  }

  if (Array.isArray(manifest)) {
    manifest.forEach((file) => pushEntry(file, null));
  } else if (manifest && typeof manifest === "object") {
    if (Array.isArray(manifest.baterias)) {
      manifest.baterias.forEach((item) => {
        if (typeof item === "string") {
          pushEntry(item, null);
          return;
        }
        if (item && typeof item === "object" && typeof item.archivo === "string") {
          pushEntry(item.archivo, item.grupo || null);
          return;
        }
        throw new Error('tests/manifest.json contiene una entrada de bateria no valida');
      });
    }

    if (Array.isArray(manifest.grupos)) {
      manifest.grupos.forEach((group, groupIndex) => {
        if (!group || typeof group !== "object") {
          throw new Error(`tests/manifest.json: el grupo ${groupIndex + 1} no es valido`);
        }

        const groupName = group.titulo || group.nombre || group.id || `Grupo ${groupIndex + 1}`;
        if (!Array.isArray(group.baterias)) {
          throw new Error(`tests/manifest.json: el grupo "${groupName}" necesita un array "baterias"`);
        }

        group.baterias.forEach((item) => {
          if (typeof item === "string") {
            pushEntry(item, {
              id: group.id || slugify(groupName, `grupo-${groupIndex + 1}`),
              titulo: groupName
            });
            return;
          }
          if (item && typeof item === "object" && typeof item.archivo === "string") {
            pushEntry(item.archivo, {
              id: group.id || slugify(groupName, `grupo-${groupIndex + 1}`),
              titulo: item.grupo || groupName
            });
            return;
          }
          throw new Error(`tests/manifest.json: el grupo "${groupName}" contiene una bateria no valida`);
        });
      });
    }
  }

  if (!entries.length) {
    throw new Error('tests/manifest.json debe contener "baterias" o "grupos" con al menos una bateria');
  }

  const batteries = await Promise.all(entries.map(async ({ file, group }) => {
    const path = resolveTestPath(file);
    const raw = await fetchJson(path);
    return normalizeBattery(raw, path, group, testOriginFromPath(path));
  }));

  return batteries;
}

function setTestViewActive(updateHash = true) {
  activeDomain = null;
  activeLessons = [];
  document.querySelectorAll(".domain-button").forEach((button) => {
    button.classList.remove("active");
  });
  summaryMenuButton.classList.remove("active");
  testMenuButton.classList.add("active");
  tocList.innerHTML = "";
  searchInput.value = "";
  searchInput.disabled = true;
  searchInput.placeholder = "Busca dentro de un dominio";

  if (updateHash) {
    history.replaceState(null, "", "#tests");
  }
}

function setSummaryViewActive(updateHash = true) {
  activeDomain = null;
  activeLessons = [];
  document.querySelectorAll(".domain-button").forEach((button) => button.classList.remove("active"));
  summaryMenuButton.classList.add("active");
  testMenuButton.classList.remove("active");
  tocList.innerHTML = "";
  searchInput.value = "";
  searchInput.disabled = true;
  searchInput.placeholder = "Los resúmenes no necesitan búsqueda";

  if (updateHash) history.replaceState(null, "", "#resumenes");
}

function renderSummaryHome(errorMessage = "", activeSummaryId = "resumen-dominio-1") {
  const cards = SUMMARIES.map((summary) => {
    const tag = summary.available ? "Disponible" : "Próximamente";
    const tagClass = summary.available ? "ready" : "pending";
    const tagHtml = summary.available
      ? `<button class="summary-card${summary.id === activeSummaryId ? " active" : ""}" type="button" data-summary="${summary.id}">`
      : `<div class="summary-card">`;

    return `${tagHtml}
      <span class="summary-card-number">${escapeHtml(summary.number)}</span>
      <span class="summary-card-title">${escapeHtml(summary.title)}</span>
      <span class="summary-card-status ${tagClass}">${tag}</span>
    ${summary.available ? "</button>" : "</div>"}`;
  }).join("");

  content.innerHTML = `
    <div class="summary-panel">
      <header class="summary-heading">
        <span class="summary-kicker">Repaso rápido para el examen</span>
        <h1>Resúmenes / chuletas</h1>
        <p>Ideas clave, comparaciones y pistas de examen para repasar cada dominio sin volver a leer todo el temario.</p>
      </header>
      <div class="summary-grid">${cards}</div>
      ${errorMessage
        ? `<div class="error-state">${escapeHtml(errorMessage)}</div>`
        : `<div id="summaryDocument" class="summary-document"><div class="loading-state">Cargando chuleta...</div></div>`}
    </div>
  `;

  if (!errorMessage) {
    document.querySelectorAll("[data-summary]").forEach((button) => {
      button.addEventListener("click", () => loadSummary(button.dataset.summary));
    });
  }
}


function stopOfficialMockTimer() {
  if (officialMockTimer) window.clearInterval(officialMockTimer);
  officialMockTimer = null;
}

function formatMockTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function mockDomainName(domainId) {
  return TEST_DOMAIN_OPTIONS.find((domain) => domain.id === domainId)?.label || domainId;
}

function renderOfficialMockIntro(battery, mount) {
  officialMockRun = null;
  stopOfficialMockTimer();
  mount.innerHTML = `
    <article class="markdown">
      <h1>${escapeHtml(battery.titulo)}</h1>
      <blockquote>${escapeHtml(battery.descripcion)}</blockquote>
      <h2>Formato</h2>
      <table>
        <thead><tr><th>Dominio</th><th>Peso oficial</th><th>Preguntas</th></tr></thead>
        <tbody>
          <tr><td>1. Principios de Seguridad</td><td>24%</td><td>24</td></tr>
          <tr><td>2. Gobernanza de la Seguridad</td><td>17,3%</td><td>17</td></tr>
          <tr><td>3. IAM</td><td>20%</td><td>20</td></tr>
          <tr><td>4. Redes y nube</td><td>21,3%</td><td>22</td></tr>
          <tr><td>5. Operaciones y respuesta</td><td>17,3%</td><td>17</td></tr>
        </tbody>
      </table>
      <p>El examen real es CAT: dura hasta 2 horas, presenta entre 100 y 125 \u00EDtems e incluye 25 preguntas de pretest no identificables. Este simulacro usa la longitud m\u00EDnima oficial de 100 preguntas y el redondeo entero m\u00E1s fiel de los pesos medios. No intenta fingir la adaptaci\u00F3n psicom\u00E9trica de ISC2.</p>
      <p><a href="https://www.isc2.org/certifications/cc/cc-certification-exam-outline" target="_blank" rel="noopener noreferrer">Esquema oficial CC</a> · <a href="https://www.isc2.org/certifications/computerized-adaptive-testing" target="_blank" rel="noopener noreferrer">Funcionamiento oficial del CAT</a></p>
      <h2>Reglas de la sesi\u00F3n</h2>
      <ul>
        <li>120 minutos y orden aleatorio.</li>
        <li>Una sola respuesta por pregunta; al confirmar no se puede volver atr\u00E1s.</li>
        <li>No hay correcci\u00F3n inmediata. Los fallos y explicaciones aparecen al finalizar.</li>
        <li>Criterio de preparaci\u00F3n integral: al menos 80% total y 70% en cada dominio. No equivale a la puntuaci\u00F3n oficial 700/1000.</li>
      </ul>
      <p><button id="startOfficialMockButton" class="action-button" type="button">Comenzar simulacro</button></p>
    </article>
  `;
  mount.querySelector("#startOfficialMockButton")?.addEventListener("click", () => startOfficialMock(battery, mount));
}

function startOfficialMock(battery, mount) {
  const targetPositions = shuffle(battery.preguntas.map((_, index) => index % 4));
  const randomizedQuestions = battery.preguntas.map((question, questionIndex) => {
    const correctIndex = answerIndex(question);
    const correctOption = question.opciones[correctIndex];
    const opciones = shuffle(question.opciones.filter((_, optionIndex) => optionIndex !== correctIndex));
    opciones.splice(targetPositions[questionIndex], 0, correctOption);
    return { ...question, opciones, respuesta: targetPositions[questionIndex] };
  });
  const randomizedBattery = { ...battery, preguntas: randomizedQuestions };
  officialMockRun = {
    battery: randomizedBattery,
    mount,
    order: shuffle(randomizedQuestions.map((_, index) => index)),
    position: 0,
    selected: null,
    answers: [],
    startedAt: Date.now(),
    endsAt: Date.now() + 120 * 60 * 1000
  };
  stopOfficialMockTimer();
  officialMockTimer = window.setInterval(() => {
    if (!officialMockRun) return stopOfficialMockTimer();
    if (Date.now() >= officialMockRun.endsAt) {
      finishOfficialMock(true);
      return;
    }
    const timer = document.querySelector("#officialMockTimer");
    if (timer) timer.textContent = formatMockTime(officialMockRun.endsAt - Date.now());
  }, 1000);
  renderOfficialMockQuestion();
}

function renderOfficialMockQuestion() {
  const run = officialMockRun;
  if (!run) return;
  const questionIndex = run.order[run.position];
  const question = run.battery.preguntas[questionIndex];
  const options = question.opciones.map((option, index) => `
    <label class="option-item">
      <input type="radio" name="officialMockAnswer" value="${index}" ${run.selected === index ? "checked" : ""}>
      <span class="option-index">${String.fromCharCode(65 + index)}</span>
      <span class="option-copy">${escapeHtml(option)}</span>
    </label>
  `).join("");
  const progress = Math.round((run.position / run.order.length) * 100);

  run.mount.innerHTML = `
    <section class="test-stage">
      <div class="test-statusbar">
        <span class="test-badge">Pregunta ${run.position + 1}/${run.order.length}</span>
        <span id="officialMockTimer" class="test-badge">${formatMockTime(run.endsAt - Date.now())}</span>
      </div>
      <div class="test-progress">
        <span>Progreso</span>
        <div class="test-progress-meter" aria-hidden="true"><div class="test-progress-fill" style="width: ${progress}%"></div></div>
        <span>${progress}%</span>
      </div>
      <article class="question-card">
        <div class="question-eyebrow">
          <span class="question-chip">Modo examen</span>
          <span class="question-chip muted">Sin revisi\u00F3n ni feedback inmediato</span>
        </div>
        <p class="question-title">${escapeHtml(question.pregunta)}</p>
        <div class="option-list">${options}</div>
        <div class="test-actions">
          <button id="confirmOfficialMockButton" class="action-button" type="button" ${run.selected === null ? "disabled" : ""}>Confirmar y continuar</button>
        </div>
      </article>
    </section>
  `;

  run.mount.querySelectorAll('input[name="officialMockAnswer"]').forEach((input) => {
    input.addEventListener("change", () => {
      run.selected = Number(input.value);
      run.mount.querySelector("#confirmOfficialMockButton").disabled = false;
    });
  });
  run.mount.querySelector("#confirmOfficialMockButton")?.addEventListener("click", confirmOfficialMockAnswer);
}

function confirmOfficialMockAnswer() {
  const run = officialMockRun;
  if (!run || run.selected === null) return;
  const questionIndex = run.order[run.position];
  const question = run.battery.preguntas[questionIndex];
  run.answers.push({
    questionIndex,
    selected: run.selected,
    correct: run.selected === answerIndex(question)
  });
  if (run.position + 1 >= run.order.length) {
    finishOfficialMock(false);
    return;
  }
  run.position += 1;
  run.selected = null;
  renderOfficialMockQuestion();
}

function finishOfficialMock(timedOut = false) {
  const run = officialMockRun;
  if (!run) return;
  stopOfficialMockTimer();

  const byDomain = TEST_DOMAIN_OPTIONS.map((domain) => {
    const answers = run.answers.filter((answer) => run.battery.preguntas[answer.questionIndex].dominio === domain.id);
    const correct = answers.filter((answer) => answer.correct).length;
    const total = run.battery.preguntas.filter((question) => question.dominio === domain.id).length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    return { ...domain, correct, total, percent };
  });
  const correct = run.answers.filter((answer) => answer.correct).length;
  const percent = Math.round((correct / run.battery.preguntas.length) * 100);
  const passed = run.answers.length === run.battery.preguntas.length
    && percent >= 80
    && byDomain.every((domain) => domain.percent >= 70);
  const rows = byDomain.map((domain) => `
    <tr><td>${escapeHtml(domain.label)}</td><td>${domain.correct}/${domain.total}</td><td>${domain.percent}%</td><td>${domain.percent >= 70 ? "Superado" : "Repasar"}</td></tr>
  `).join("");
  const answersByQuestion = new Map(run.answers.map((answer) => [answer.questionIndex, answer]));
  const missed = run.battery.preguntas.map((question, questionIndex) => ({
    question,
    answer: answersByQuestion.get(questionIndex)
  })).filter(({ answer }) => !answer?.correct).map(({ question, answer }, index) => {
    const correctIndex = answerIndex(question);
    const selectedText = answer ? question.opciones[answer.selected] : "Sin responder";
    return `
      <article class="question-card">
        <div class="question-eyebrow"><span class="question-chip muted">Fallo ${index + 1} · ${escapeHtml(mockDomainName(question.dominio))}</span></div>
        <p class="question-title">${escapeHtml(question.pregunta)}</p>
        <p><strong>Tu respuesta:</strong> ${escapeHtml(selectedText)}</p>
        <p><strong>Respuesta correcta:</strong> ${escapeHtml(question.opciones[correctIndex])}</p>
        <p>${escapeHtml(question.explicacion)}</p>
      </article>
    `;
  }).join("");

  run.mount.innerHTML = `
    <article class="markdown">
      <h1>Resultado del simulacro</h1>
      ${timedOut ? "<blockquote>Tiempo agotado: las preguntas no respondidas cuentan como incorrectas.</blockquote>" : ""}
      <p class="score-box">${passed ? "Preparaci\u00F3n integral superada" : "A\u00FAn no superado"}: ${correct}/${run.battery.preguntas.length} \u00B7 ${percent}%</p>
      <p>El criterio de esta herramienta exige 80% global y 70% en cada dominio. Es deliberadamente conservador y no convierte aciertos linealmente a la escala oficial.</p>
      <table><thead><tr><th>Dominio</th><th>Aciertos</th><th>Resultado</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table>
      <p><button id="restartOfficialMockButton" class="action-button" type="button">Repetir con otro orden</button></p>
      <h2>Revisi\u00F3n de respuestas incorrectas</h2>
      ${missed || "<p>No hay respuestas incorrectas.</p>"}
    </article>
  `;
  run.mount.querySelector("#restartOfficialMockButton")?.addEventListener("click", () => startOfficialMock(run.battery, run.mount));
}

async function loadOfficialMock(summary, mount) {
  const raw = await fetchJson(summary.file);
  const battery = normalizeBattery(raw, summary.file, null, "gpt-2026");
  renderOfficialMockIntro(battery, mount);
}

async function loadSummary(summaryId = "resumen-dominio-1", updateHash = true) {
  stopOfficialMockTimer();
  officialMockRun = null;
  const summary = SUMMARIES.find((item) => item.id === summaryId && item.available) || SUMMARIES[0];
  setSummaryViewActive(false);
  renderSummaryHome("", summary.id);
  document.querySelectorAll("[data-summary]").forEach((button) => {
    button.classList.toggle("active", button.dataset.summary === summary.id);
  });

  const mount = document.querySelector("#summaryDocument");
  try {
    if (summary.type === "exam") {
      await loadOfficialMock(summary, mount);
    } else {
      const response = await fetch(siteUrl(summary.file));
      if (!response.ok) throw new Error(`No se pudo cargar la chuleta (${response.status})`);
      const markdown = await response.text();
      mount.innerHTML = `<article class="markdown">${renderMarkdown(markdown, "Resumenes y chuletas")}</article>`;
    }
    if (updateHash) history.replaceState(null, "", `#${summary.id}`);
  } catch (error) {
    mount.innerHTML = `<div class="error-state">${escapeHtml(error.message)}</div>`;
  }
}

async function loadSummariesView(updateHash = true, summaryId = "resumen-dominio-1") {
  setSummaryViewActive(updateHash);
  renderSummaryHome();
  await loadSummary(summaryId, false);
}

async function loadTestsView(updateHash = true) {
  stopOfficialMockTimer();
  officialMockRun = null;
  setTestViewActive(updateHash);
  content.innerHTML = '<div class="loading-state">Cargando baterias de test...</div>';

  try {
    testBatteries = await loadTestBatteries();
    renderTestHome();
  } catch (error) {
    testBatteries = [];
    renderTestHome(error.message);
  }
}

function renderTestHome(errorMessage = "") {
  const totalQuestions = testBatteries.reduce((sum, battery) => sum + battery.preguntas.length, 0);
  const groupedByOrigin = testBatteries.reduce((origins, battery, index) => {
    const originId = battery.origen || "otros";
    if (!origins.has(originId)) {
      origins.set(originId, {
        id: originId,
        title: TEST_ORIGIN_LABELS[originId] || originId,
        icon: TEST_ORIGIN_ICONS[originId] || TEST_ORIGIN_ICONS.otros,
        items: [],
        questions: 0
      });
    }

    const origin = origins.get(originId);
    origin.items.push({ battery, index });
    origin.questions += battery.preguntas.length;
    return origins;
  }, new Map());
  const orderedOrigins = [
    ...TEST_ORIGIN_ORDER.filter((origin) => groupedByOrigin.has(origin)).map((origin) => groupedByOrigin.get(origin)),
    ...[...groupedByOrigin.values()].filter((origin) => !TEST_ORIGIN_ORDER.includes(origin.id))
  ];
  const originControls = orderedOrigins.map((origin) => `
    <label class="origin-toggle" data-origin="${escapeHtml(origin.id)}">
      <input type="checkbox" name="testOriginOption" value="${escapeHtml(origin.id)}" checked>
      <span class="origin-toggle-icon" aria-hidden="true">${escapeHtml(origin.icon)}</span>
      <span class="origin-toggle-copy">
        <span class="origin-toggle-title">${escapeHtml(origin.title)}</span>
        <span class="origin-toggle-meta">${origin.items.length} baterias · ${origin.questions} preguntas</span>
      </span>
      <span class="origin-toggle-check" aria-hidden="true"></span>
    </label>
  `).join("");
  const hiddenBatteryInputs = orderedOrigins.flatMap((origin) => (
    origin.items.map(({ index }) => (
      `<input type="checkbox" name="testBatteryOption" value="${index}" checked hidden data-origin-id="${escapeHtml(origin.id)}">`
    ))
  )).join("");

  content.innerHTML = `
    <div class="test-panel">
      <div class="test-shell">
        <section class="test-topbar">
          <div class="test-heading">
            <span class="test-kicker">Simulador CC</span>
            <h1>Tests</h1>
            <p>Sesion continua, correccion inmediata y combinacion libre de baterias en una interfaz pensada para practicar sin ruido.</p>
          </div>

          <div class="test-selector">
            <label class="field-label">
              Dominio
              <select id="testDomainFilter" class="test-domain-select">
              </select>
            </label>

            <label class="field-label">
              Origenes activos
              <div id="testOriginPicker" class="origin-picker">
                ${originControls || '<p class="test-meta">No hay origenes cargados.</p>'}
              </div>
              <div id="testBatteryPicker" class="hidden-battery-picker" aria-hidden="true">${hiddenBatteryInputs}</div>
            </label>
          </div>
        </section>

        ${errorMessage ? `<div class="error-state">${escapeHtml(errorMessage)}</div>` : ""}

        <section class="test-dashboard">
          <div class="test-stat test-stat-emphasis">
            <span class="test-stat-value">${orderedOrigins.length}</span>
            <span class="test-stat-label">Origenes cargados</span>
          </div>
          <div class="test-stat">
            <span class="test-stat-value">${testBatteries.length}</span>
            <span class="test-stat-label">Baterias disponibles</span>
          </div>
          <div class="test-stat">
            <span class="test-stat-value">${totalQuestions}</span>
            <span class="test-stat-label">Preguntas disponibles</span>
          </div>
          <div class="test-stat">
            <span class="test-stat-value">${OFFICIAL_PASSING_SCORE}/${OFFICIAL_SCORE_MAX}</span>
            <span class="test-stat-label">Escala oficial publicada</span>
          </div>
        </section>

        <p class="test-official-note">ISC2 publica para Certified in Cybersecurity un umbral de aprobado de ${OFFICIAL_PASSING_SCORE} sobre ${OFFICIAL_SCORE_MAX}. La puntuacion mostrada aqui es solo una equivalencia orientativa del simulador.</p>

        <div id="testMount"></div>
      </div>
    </div>
  `;

  const originPicker = document.querySelector("#testOriginPicker");
  const domainFilter = document.querySelector("#testDomainFilter");

  if (testPopoverOutsideHandler) {
    document.removeEventListener("click", testPopoverOutsideHandler);
    testPopoverOutsideHandler = null;
  }
  if (testDomainResizeHandler) {
    window.removeEventListener("resize", testDomainResizeHandler);
    testDomainResizeHandler = null;
  }

  function originInputs() {
    return [...document.querySelectorAll('input[name="testOriginOption"]')];
  }

  function syncBatterySelectionsFromOrigins() {
    const selectedOrigins = new Set(originInputs().filter((input) => input.checked).map((input) => input.value));
    batteryInputs().forEach((input) => {
      input.checked = selectedOrigins.has(input.dataset.originId);
    });
  }

  function selectedDomainCounts() {
    const selected = selectedBatteries();
    const counts = TEST_DOMAIN_OPTIONS.reduce((acc, domain) => {
      acc[domain.id] = 0;
      return acc;
    }, {});

    selected.forEach((battery) => {
      battery.preguntas.forEach((question) => {
        if (counts[question.dominio] !== undefined) counts[question.dominio] += 1;
      });
    });

    return counts;
  }

  function updateDomainOptions() {
    if (!domainFilter) return;

    const selectedValue = selectedTestDomain();
    const counts = selectedDomainCounts();
    const totalSelectedQuestions = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const useCompactLabels = window.matchMedia("(max-width: 560px)").matches;

    domainFilter.innerHTML = `
      <option value="">Todos los dominios (${totalSelectedQuestions})</option>
      ${TEST_DOMAIN_OPTIONS.map((domain) => `
        <option value="${domain.id}">${escapeHtml(useCompactLabels ? domain.shortLabel : domain.label)} (${counts[domain.id] || 0})</option>
      `).join("")}
    `;
    domainFilter.value = selectedValue;
  }

  function updateOriginCards() {
    originInputs().forEach((input) => {
      input.closest(".origin-toggle")?.classList.toggle("active", input.checked);
    });
  }

  function applyOriginSelectionChange() {
    syncBatterySelectionsFromOrigins();
    updateOriginCards();
    updateDomainOptions();
    startSelectedBatteries();
  }

  originPicker?.addEventListener("change", applyOriginSelectionChange);
  domainFilter?.addEventListener("change", startSelectedBatteries);
  testDomainResizeHandler = updateDomainOptions;
  window.addEventListener("resize", testDomainResizeHandler);

  if (testBatteries.length) {
    syncBatterySelectionsFromOrigins();
    updateOriginCards();
    updateDomainOptions();
    startSelectedBatteries();
  }
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function startBattery(battery) {
  currentTestRun = {
    battery,
    order: shuffle(battery.preguntas.map((_, index) => index)),
    position: 0,
    correct: 0,
    answers: [],
    currentAnswer: null
  };

  renderCurrentQuestion();
}

function selectedBatteries() {
  const checked = batteryInputs().filter((input) => input.checked);
  return checked.map((input) => testBatteries[Number(input.value)]).filter(Boolean);
}

function batteryInputs() {
  return [...document.querySelectorAll('input[name="testBatteryOption"]')];
}

function selectedTestDomain() {
  const value = document.querySelector("#testDomainFilter")?.value || "";
  return TEST_DOMAIN_OPTIONS.some((domain) => domain.id === value) ? value : "";
}

function combineBatteries(batteries, domainId = "") {
  const questions = batteries.flatMap((battery) => battery.preguntas)
    .filter((question) => !domainId || question.dominio === domainId);
  const domainLabel = TEST_DOMAIN_OPTIONS.find((domain) => domain.id === domainId)?.label || "";

  return {
    id: batteries.map((battery) => battery.id).join("+"),
    titulo: batteries.length === 1 && !domainId ? batteries[0].titulo : `Bateria combinada (${batteries.length})`,
    descripcion: domainLabel
      ? `Preguntas filtradas por ${domainLabel}.`
      : batteries.length === 1
      ? batteries[0].descripcion
      : "Union de varias baterias seleccionadas.",
    procedencia: batteries.map((battery) => battery.procedencia).join(" | "),
    dominioFiltro: domainId || null,
    preguntas: questions
  };
}

function startSelectedBatteries() {
  const batteries = selectedBatteries();
  const domainId = selectedTestDomain();
  const domainLabel = TEST_DOMAIN_OPTIONS.find((domain) => domain.id === domainId)?.label || "";
  if (!batteries.length) {
    const mount = document.querySelector("#testMount");
    if (mount) {
      mount.innerHTML = '<div class="empty-state">Selecciona al menos una bateria para empezar el test.</div>';
    }
    currentTestRun = null;
    return;
  }

  const combined = combineBatteries(batteries, domainId);
  if (!combined.preguntas.length) {
    const mount = document.querySelector("#testMount");
    if (mount) {
      mount.innerHTML = `<div class="empty-state">No hay preguntas etiquetadas para ${escapeHtml(domainLabel)} en las baterias seleccionadas.</div>`;
    }
    currentTestRun = null;
    return;
  }

  startBattery(combined);
}

function setAllBatterySelections(checked) {
  batteryInputs().forEach((input) => {
    input.checked = checked;
  });
  startSelectedBatteries();
}

function setBatterySelectionsByOrigin(originId, checked) {
  batteryInputs().forEach((input) => {
    if (input.dataset.originId === originId) input.checked = checked;
  });
  startSelectedBatteries();
}

function setBatterySelectionsByGroup(groupId, checked) {
  batteryInputs().forEach((input) => {
    if (input.dataset.groupId === groupId) input.checked = checked;
  });
  startSelectedBatteries();
}

function currentQuestion() {
  if (!currentTestRun) return null;
  const questionIndex = currentTestRun.order[currentTestRun.position];
  return currentTestRun.battery.preguntas[questionIndex];
}

function scoreSnapshot(run) {
  const answered = run.answers.length;
  const incorrect = answered - run.correct;
  const percent = answered ? Math.round((run.correct / answered) * 100) : 0;
  const estimatedScaled = Math.round((percent / 100) * OFFICIAL_SCORE_MAX);
  const remaining = run.order.length - answered;

  return {
    answered,
    incorrect,
    percent,
    estimatedScaled,
    remaining,
    passStatus: estimatedScaled >= OFFICIAL_PASSING_SCORE
  };
}

function renderCurrentQuestion() {
  const mount = document.querySelector("#testMount");
  if (!mount || !currentTestRun) return;

  const { battery, position, order, correct, currentAnswer } = currentTestRun;
  const question = currentQuestion();
  const correctIndex = answerIndex(question);
  const answered = currentAnswer !== null;
  const isCorrect = answered && currentAnswer === correctIndex;
  const progressPercent = Math.round(((position + (answered ? 1 : 0)) / order.length) * 100);
  const score = scoreSnapshot(currentTestRun);
  const questionDomainLabel = TEST_DOMAIN_OPTIONS.find((domain) => domain.id === question.dominio)?.label || "";

  const options = question.opciones.map((option, optionIndex) => {
    let optionClass = "";
    if (answered && optionIndex === correctIndex) optionClass = " correct";
    if (answered && optionIndex === currentAnswer && optionIndex !== correctIndex) optionClass = " incorrect";
    const optionLetter = String.fromCharCode(65 + optionIndex);

    return `
      <label class="option-item${optionClass}">
        <input type="radio" name="currentQuestion" value="${optionIndex}" ${currentAnswer === optionIndex ? "checked" : ""} ${answered ? "disabled" : ""}>
        <span class="option-index">${optionLetter}</span>
        <span class="option-copy">${escapeHtml(option)}</span>
      </label>
    `;
  }).join("");

  const feedback = answered ? `
    <p class="question-feedback">
      <strong>${isCorrect ? "Correcto." : "Incorrecto."}</strong>
      La respuesta correcta es <strong>${escapeHtml(question.opciones[correctIndex])}</strong>.
      ${question.explicacion ? `<br>${escapeHtml(question.explicacion)}` : ""}
    </p>
  ` : "";

  mount.innerHTML = `
    <section class="test-stage">
      <div class="test-statusbar">
        <span class="test-badge">Pregunta ${position + 1}/${order.length}</span>
        ${answered ? `<span class="test-badge ${isCorrect ? "success" : "error"}">${isCorrect ? "Correcta" : "Incorrecta"}</span>` : `<span class="test-badge">Pendiente</span>`}
      </div>

      <div class="test-progress">
        <span>Progreso</span>
        <div class="test-progress-meter" aria-hidden="true">
          <div class="test-progress-fill" style="width: ${progressPercent}%"></div>
        </div>
        <span>${progressPercent}%</span>
      </div>

      <div class="test-main">
        <article class="question-card${answered ? (isCorrect ? " correct" : " incorrect") : ""}">
          <div class="question-eyebrow">
            <span class="question-chip">Sesion activa</span>
            ${questionDomainLabel ? `<span class="question-chip muted">${escapeHtml(questionDomainLabel)}</span>` : ""}
            ${battery.descripcion ? `<span class="question-chip muted">${escapeHtml(battery.descripcion)}</span>` : ""}
          </div>
          <p class="question-title">${escapeHtml(question.pregunta)}</p>
          <div class="option-list">${options}</div>
          ${feedback}
          <div class="test-actions">
            <button id="restartTestButton" class="action-button" type="button">Reiniciar</button>
            ${answered ? `<button id="nextQuestionButton" class="action-button" type="button">${position + 1 === order.length ? "Ver resultado" : "Siguiente"}</button>` : ""}
          </div>
        </article>

        <aside class="test-score-panel">
          <p class="test-score-panel-title">Marcador actual</p>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${score.answered ? correct : 0}</span>
            <span class="test-stat-label">Correctas</span>
          </div>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${score.incorrect}</span>
            <span class="test-stat-label">Falladas</span>
          </div>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${score.percent}%</span>
            <span class="test-stat-label">Porcentaje de acierto</span>
          </div>
          <div class="test-stat test-stat-inline test-stat-highlight">
            <span class="test-stat-value">${score.estimatedScaled}/${OFFICIAL_SCORE_MAX}</span>
            <span class="test-stat-label">Equivalencia orientativa</span>
          </div>
          <p class="test-score-panel-copy">Aprobado oficial publicado: ${OFFICIAL_PASSING_SCORE}/${OFFICIAL_SCORE_MAX}. Esta conversion es aproximada y solo sirve como referencia durante el simulador.</p>
        </aside>
      </div>
    </section>
  `;

  mount.querySelectorAll('input[name="currentQuestion"]').forEach((input) => {
    input.addEventListener("change", () => answerCurrentQuestion(Number(input.value)));
  });
  mount.querySelector("#nextQuestionButton")?.addEventListener("click", nextQuestion);
  mount.querySelector("#restartTestButton")?.addEventListener("click", () => startBattery(battery));
}

function answerCurrentQuestion(optionIndex) {
  if (!currentTestRun || currentTestRun.currentAnswer !== null) return;

  const question = currentQuestion();
  const isCorrect = optionIndex === answerIndex(question);
  currentTestRun.currentAnswer = optionIndex;
  currentTestRun.answers.push({
    questionIndex: currentTestRun.order[currentTestRun.position],
    selected: optionIndex,
    correct: isCorrect
  });

  if (isCorrect) currentTestRun.correct += 1;
  renderCurrentQuestion();
}

function nextQuestion() {
  if (!currentTestRun) return;

  if (currentTestRun.position + 1 >= currentTestRun.order.length) {
    renderTestResult();
    return;
  }

  currentTestRun.position += 1;
  currentTestRun.currentAnswer = null;
  renderCurrentQuestion();
}

function renderTestResult() {
  const mount = document.querySelector("#testMount");
  if (!mount || !currentTestRun) return;

  const { battery, correct, order } = currentTestRun;
  const score = scoreSnapshot(currentTestRun);

  mount.innerHTML = `
    <section class="test-stage">
      <div class="test-statusbar">
        <span class="test-badge">Sesion completada</span>
        <span class="test-badge ${score.passStatus ? "success" : "error"}">${score.passStatus ? "Apto" : "No apto"}</span>
      </div>
      <div class="test-main">
        <section class="question-card question-card-result">
          <div class="question-eyebrow">
            <span class="question-chip">Resultado final</span>
            <span class="question-chip muted">${escapeHtml(battery.procedencia || battery.titulo)}</span>
          </div>
          <p class="question-title">${escapeHtml(battery.titulo)}</p>
          <p class="score-box">Resultado final: ${correct} / ${order.length} - ${score.percent}% - estimacion ${score.estimatedScaled}/${OFFICIAL_SCORE_MAX}</p>
          <div class="test-actions">
            <button id="restartTestButton" class="action-button" type="button">Repetir aleatorio</button>
          </div>
        </section>
        <aside class="test-score-panel">
          <p class="test-score-panel-title">Resumen</p>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${correct}</span>
            <span class="test-stat-label">Correctas</span>
          </div>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${score.incorrect}</span>
            <span class="test-stat-label">Falladas</span>
          </div>
          <div class="test-stat test-stat-inline">
            <span class="test-stat-value">${score.percent}%</span>
            <span class="test-stat-label">Porcentaje</span>
          </div>
          <div class="test-stat test-stat-inline test-stat-highlight">
            <span class="test-stat-value">${score.estimatedScaled}/${OFFICIAL_SCORE_MAX}</span>
            <span class="test-stat-label">Equivalencia orientativa</span>
          </div>
          <p class="test-score-panel-copy">Aprobado oficial publicado por ISC2 para CC: ${OFFICIAL_PASSING_SCORE}/${OFFICIAL_SCORE_MAX}. El examen real no te devuelve una puntuacion numerica exacta.</p>
        </aside>
      </div>
    </section>
  `;

  mount.querySelector("#restartTestButton")?.addEventListener("click", () => startBattery(battery));
}

function bytes(value) {
  return typeof value === "string" ? textEncoder.encode(value) : value;
}

function concatBytes(chunks) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;

  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.length;
  });

  return output;
}

function makeCrcTable() {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i += 1) {
    let value = i;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[i] = value >>> 0;
  }

  return table;
}

const crcTable = makeCrcTable();

function crc32(data) {
  let crc = 0xffffffff;

  for (let i = 0; i < data.length; i += 1) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, date: dosDate };
}

function createZip(entries) {
  const chunks = [];
  const centralDirectory = [];
  const timestamp = dosDateTime();
  let offset = 0;

  entries.forEach((entry) => {
    const name = bytes(entry.name);
    const data = bytes(entry.data);
    const checksum = crc32(data);

    const localHeader = new Uint8Array(30 + name.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0x0800, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, timestamp.time, true);
    localView.setUint16(12, timestamp.date, true);
    localView.setUint32(14, checksum, true);
    localView.setUint32(18, data.length, true);
    localView.setUint32(22, data.length, true);
    localView.setUint16(26, name.length, true);
    localView.setUint16(28, 0, true);
    localHeader.set(name, 30);

    const centralHeader = new Uint8Array(46 + name.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0x0800, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, timestamp.time, true);
    centralView.setUint16(14, timestamp.date, true);
    centralView.setUint32(16, checksum, true);
    centralView.setUint32(20, data.length, true);
    centralView.setUint32(24, data.length, true);
    centralView.setUint16(28, name.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);
    centralHeader.set(name, 46);

    chunks.push(localHeader, data);
    centralDirectory.push(centralHeader);
    offset += localHeader.length + data.length;
  });

  const centralOffset = offset;
  const centralSize = centralDirectory.reduce((sum, chunk) => sum + chunk.length, 0);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, entries.length, true);
  endView.setUint16(10, entries.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, centralOffset, true);
  endView.setUint16(20, 0, true);

  return concatBytes([...chunks, ...centralDirectory, endRecord]);
}

function mediaTypeFor(path) {
  const extension = path.split(".").pop().toLowerCase();
  const types = {
    css: "text/css",
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
    xhtml: "application/xhtml+xml"
  };

  return types[extension] || "application/octet-stream";
}

function extractImageRefs(markdown) {
  const refs = new Set();
  const regex = /!\[[^\]]*\]\(([^)]+)\)/g;
  let match = regex.exec(markdown);

  while (match) {
    if (!match[1].startsWith("http")) refs.add(match[1]);
    match = regex.exec(markdown);
  }

  return [...refs];
}

async function fetchBinary(path) {
  const response = await fetch(siteUrl(path));
  if (!response.ok) throw new Error(`No se pudo cargar ${path} (${response.status})`);
  return new Uint8Array(await response.arrayBuffer());
}

function epubDocument(title, body) {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="es" xml:lang="es">
  <head>
    <title>${escapeHtml(title)}</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="styles.css" />
  </head>
  <body>
${body}
  </body>
</html>`;
}

function chapterName(index) {
  return `chapter-${String(index + 1).padStart(2, "0")}.xhtml`;
}

function buildNav(chapters) {
  const items = chapters.map((chapter) => {
    const lessons = chapter.lessons.map((lesson) => (
      `<li><a href="${chapter.href}#${lesson.id}">${escapeHtml(titleFromFile(lesson.file))}</a></li>`
    )).join("");

    return `<li><a href="${chapter.href}">${escapeHtml(chapter.title)}</a><ol>${lessons}</ol></li>`;
  }).join("");

  return epubDocument("Indice", `
    <nav epub:type="toc" id="toc">
      <h1>Indice</h1>
      <ol>
        <li><a href="cover.xhtml">Portada</a></li>
        ${items}
      </ol>
    </nav>`);
}

function buildNcx(chapters) {
  let order = 1;
  const navPoints = chapters.map((chapter) => {
    const chapterOrder = order;
    order += 1;
    const lessons = chapter.lessons.map((lesson) => {
      const playOrder = order;
      order += 1;
      return `
    <navPoint id="${lesson.id}" playOrder="${playOrder}">
      <navLabel><text>${escapeHtml(titleFromFile(lesson.file))}</text></navLabel>
      <content src="${chapter.href}#${lesson.id}" />
    </navPoint>`;
    }).join("");

    return `
  <navPoint id="${chapter.id}" playOrder="${chapterOrder}">
    <navLabel><text>${escapeHtml(chapter.title)}</text></navLabel>
    <content src="${chapter.href}" />${lessons}
  </navPoint>`;
  }).join("");

  return `<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:isc2-cc-es" />
    <meta name="dtb:depth" content="2" />
    <meta name="dtb:totalPageCount" content="0" />
    <meta name="dtb:maxPageNumber" content="0" />
  </head>
  <docTitle><text>ISC2 CC - Contenido completo</text></docTitle>
  <navMap>${navPoints}
  </navMap>
</ncx>`;
}

function buildOpf(chapters, imageItems) {
  const modified = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const chapterItems = chapters.map((chapter) => (
    `<item id="${chapter.id}" href="${chapter.href}" media-type="application/xhtml+xml" />`
  )).join("\n    ");
  const manifestImages = imageItems.map((image) => (
    `<item id="${image.id}" href="${image.href}" media-type="${image.mediaType}" />`
  )).join("\n    ");
  const spineItems = chapters.map((chapter) => `<itemref idref="${chapter.id}" />`).join("\n    ");

  return `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="book-id">urn:uuid:isc2-cc-es</dc:identifier>
    <dc:title>ISC2 CC - Contenido completo</dc:title>
    <dc:language>es</dc:language>
    <meta property="dcterms:modified">${modified}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
    <item id="style" href="styles.css" media-type="text/css" />
    <item id="cover-image" href="cover.jpg" media-type="image/jpeg" properties="cover-image" />
    <item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml" />
    ${chapterItems}
    ${manifestImages}
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover-page" />
    ${spineItems}
  </spine>
</package>`;
}

async function buildEpub() {
  const entries = [
    { name: "mimetype", data: "application/epub+zip" },
    {
      name: "META-INF/container.xml",
      data: `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />
  </rootfiles>
</container>`
    }
  ];

  const cover = await fetchBinary("portada.jpg");
  entries.push({ name: "OEBPS/cover.jpg", data: cover });

  const imageItems = [];
  const imageData = new Map();
  const chapters = [];

  for (let domainIndex = 0; domainIndex < DOMAINS.length; domainIndex += 1) {
    const domain = DOMAINS[domainIndex];
    const lessons = await Promise.all(domain.files.map((file) => fetchLesson(domain, file)));
    const imageMap = new Map();

    for (const lesson of lessons) {
      for (const ref of extractImageRefs(lesson.markdown)) {
        const source = `${domain.path}/${ref}`;
        if (!imageMap.has(ref)) {
          const imageId = `img-${domain.id}-${imageMap.size + 1}`;
          const href = `images/${imageId}.${ref.split(".").pop().toLowerCase()}`;
          imageMap.set(ref, href);
          if (!imageData.has(source)) {
            imageData.set(source, { id: imageId, href, source });
          }
        }
      }
    }

    const body = `
    <section>
      <h1>${escapeHtml(domain.number)}: ${escapeHtml(domain.title)}</h1>
      ${lessons.map((lesson) => `
      <section id="${lessonId(domain.id, lesson.file)}">
        ${renderMarkdown(lesson.markdown, domain.path, {
          xhtml: true,
          resolveMediaSrc(ref) {
            return imageMap.get(ref) || ref;
          }
        })}
      </section>`).join("\n")}
    </section>`;

    const href = chapterName(domainIndex);
    entries.push({
      name: `OEBPS/${href}`,
      data: epubDocument(`${domain.number}: ${domain.title}`, body)
    });

    chapters.push({
      id: `chapter-${domainIndex + 1}`,
      href,
      title: `${domain.number}: ${domain.title}`,
      lessons: lessons.map((lesson) => ({
        id: lessonId(domain.id, lesson.file),
        file: lesson.file
      }))
    });
  }

  for (const image of imageData.values()) {
    const data = await fetchBinary(image.source);
    imageItems.push({
      id: image.id,
      href: image.href,
      mediaType: mediaTypeFor(image.href)
    });
    entries.push({ name: `OEBPS/${image.href}`, data });
  }

  entries.push({
    name: "OEBPS/cover.xhtml",
    data: epubDocument("Portada", `
    <section class="cover">
      <img src="cover.jpg" alt="Portada" />
    </section>`)
  });
  entries.push({
    name: "OEBPS/nav.xhtml",
    data: buildNav(chapters)
  });
  entries.push({
    name: "OEBPS/toc.ncx",
    data: buildNcx(chapters)
  });
  entries.push({
    name: "OEBPS/styles.css",
    data: `body {
  color: #1c2430;
  font-family: serif;
  line-height: 1.55;
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1.25;
}

h1 {
  color: #0d5268;
}

img {
  display: block;
  height: auto;
  margin: 1em auto;
  max-width: 100%;
}

.cover {
  text-align: center;
}

.cover img {
  max-height: 95vh;
}`
  });
  entries.push({
    name: "OEBPS/content.opf",
    data: buildOpf(chapters, imageItems)
  });

  return new Blob([createZip(entries)], { type: "application/epub+zip" });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function downloadEpub() {
  epubButton.disabled = true;
  epubButton.textContent = "Generando...";

  try {
    const epub = await buildEpub();
    downloadBlob(epub, "isc2-cc-completo.epub");
  } catch (error) {
    content.innerHTML = `<div class="error-state">${escapeHtml(error.message)}</div>`;
  } finally {
    epubButton.disabled = false;
    epubButton.textContent = "EPUB completo";
  }
}

searchInput.addEventListener("input", filterLessons);
epubButton.addEventListener("click", downloadEpub);
printButton.addEventListener("click", () => window.print());
summaryMenuButton.addEventListener("click", () => {
  loadSummariesView();
  closeMobileMenu();
});
testMenuButton.addEventListener("click", () => {
  loadTestsView();
  closeMobileMenu();
});
menuToggle.addEventListener("click", () => {
  setMobileMenuOpen(!document.body.classList.contains("menu-open"));
});
menuBackdrop.addEventListener("click", closeMobileMenu);
tocList.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMobileMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 920) closeMobileMenu();
});
window.addEventListener("hashchange", () => {
  const hash = location.hash.slice(1);

  if (hash === "tests") {
    loadTestsView(false);
    return;
  }

  if (hash === "resumenes" || hash.startsWith("resumen-")) {
    loadSummariesView(false, hash === "resumenes" ? "resumen-dominio-1" : hash);
    return;
  }

  const domain = domainFromHash(hash);
  if (!domain) {
    loadDomain(DOMAINS[0].id, false);
    return;
  }

  if (hash !== domain.id && activeDomain?.id === domain.id && document.getElementById(hash)) {
    return;
  }

  loadDomain(domain.id, false, hash !== domain.id ? hash : null);
});

renderMenu();
const initialHash = location.hash.slice(1);
if (initialHash === "tests") {
  loadTestsView(false);
} else if (initialHash === "resumenes" || initialHash.startsWith("resumen-")) {
  loadSummariesView(false, initialHash === "resumenes" ? "resumen-dominio-1" : initialHash);
} else {
  const initialDomain = domainFromHash(initialHash);
  loadDomain(initialDomain?.id || DOMAINS[0].id, false, initialDomain && initialHash !== initialDomain.id ? initialHash : null);
}
