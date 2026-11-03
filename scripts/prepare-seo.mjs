// Optional maintenance helper. The committed site still opens without a build.
// Run after editing event/result data: node scripts/prepare-seo.mjs
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import vm from "node:vm";

const root = fileURLToPath(new URL("../", import.meta.url));
const origin = "https://blossomsbyc.netlify.app";
const pages = {
  "index.html": [
    "BLOSSOMS 2024–25 | CHRIST University, Yeshwanthpur",
    "Explore Blossoms 2024–25, the cultural festival of CHRIST University, Bengaluru Yeshwanthpur Campus. Find event rules, schedules and competition results.",
    "Home",
  ],
  "events.html": [
    "Cultural Festival Events | BLOSSOMS 2024–25, CHRIST",
    "Explore stage, theatre, art and literary competitions at Blossoms 2024–25, CHRIST University Yeshwanthpur. Find event formats and participation rules.",
    "Events",
  ],
  "schedule.html": [
    "Festival Schedule | BLOSSOMS 2024–25, CHRIST University",
    "View the Blossoms 2024–25 event schedule for CHRIST University, Bengaluru Yeshwanthpur Campus. Plan stage, theatre, art and literary competitions.",
    "Schedule",
  ],
  "results.html": [
    "Phase 1 Results & Leaderboard | BLOSSOMS 2024–25",
    "Find Blossoms 2024–25 Phase 1 results, winning participants and the school leaderboard for CHRIST University, Bengaluru Yeshwanthpur Campus.",
    "Results",
  ],
  "stage_events.html": [
    "Stage Events & Rules | BLOSSOMS 2024–25, CHRIST",
    "Read Blossoms 2024–25 stage event rules for music, dance, solo singing and Battle of Bands at CHRIST University, Bengaluru Yeshwanthpur Campus.",
    "Stage events",
  ],
  "theatre_events.html": [
    "Theatre Events & Rules | BLOSSOMS 2024–25, CHRIST",
    "Find Blossoms 2024–25 rules for mono acting, street theatre, proscenium theatre, mime and short film making at CHRIST University Yeshwanthpur.",
    "Theatre events",
  ],
  "art_events.html": [
    "Art Events & Rules | BLOSSOMS 2024–25, CHRIST",
    "Explore Blossoms 2024–25 art event rules for photography, painting, sketching, digital posters and more at CHRIST University Yeshwanthpur Campus.",
    "Art events",
  ],
  "literary_events.html": [
    "Literary Events & Rules | BLOSSOMS 2024–25, CHRIST",
    "Read Blossoms 2024–25 literary event rules for debate, extempore, creative writing, quiz and more at CHRIST University Yeshwanthpur Campus.",
    "Literary events",
  ],
};
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const urlFor = (file) => `${origin}/${file === "index.html" ? "" : file}`;

// Only reads object/array literals from this repository's existing data sources.
function readLiteral(source, name) {
  const match = source.match(
    new RegExp(`const ${name} = ([\\s\\S]*?)\\n  [}\\]];`),
  );
  if (!match) throw new Error(`Cannot locate ${name}`);
  return vm.runInNewContext(
    `(${match[1]}\n${name === "leadingContenders" ? "]" : "}"})`,
    Object.create(null),
    { timeout: 1000 },
  );
}
function block(html, name, content, initialPattern) {
  const markup = `<!-- ${name}:START -->\n${content}\n<!-- ${name}:END -->`;
  const existing = new RegExp(
    `<!-- ${name}:START -->[\\s\\S]*?<!-- ${name}:END -->`,
  );
  if (existing.test(html)) return html.replace(existing, () => markup);
  if (!initialPattern.test(html))
    throw new Error(`Missing insertion point: ${name}`);
  return html.replace(initialPattern, () => markup);
}
const rules = (data) =>
  `<ul class="event-rules">${data.rules.map((rule) => `<li>${escape(rule)}</li>`).join("")}</ul>`;

for (const [file, [title, description, name]] of Object.entries(pages)) {
  const path = resolve(root, file);
  let html = await readFile(path, "utf8");
  html = html
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/g, "")
    .replace(
      /<meta\s+(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[\s\S]*?\/?>\s*/g,
      "",
    )
    .replace(/<link\s+rel="canonical"[^>]*>\s*/g, "");
  const url = urlFor(file);
  const crumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: urlFor("index.html"),
    },
  ];
  if (file.endsWith("_events.html"))
    crumbs.push({
      "@type": "ListItem",
      position: 2,
      name: "Events",
      item: urlFor("events.html"),
    });
  if (file !== "index.html")
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name,
      item: url,
    });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organizer`,
        name: "Student Welfare Office, CHRIST University, Bengaluru Yeshwanthpur Campus",
        url: `${origin}/`,
        logo: `${origin}/assets/images/swo-logo-tp.png`,
        email: "swo.yeshwanthpur@christuniversity.in",
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "CHRIST (Deemed to be University)",
          url: "https://christuniversity.in/",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "BLOSSOMS 2024–25",
        inLanguage: "en-IN",
        publisher: { "@id": `${origin}/#organizer` },
      },
      {
        "@type":
          file === "index.html" || file === "schedule.html"
            ? "WebPage"
            : "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${origin}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumbs` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${origin}/assets/images/og-banner.png`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        itemListElement: crumbs,
      },
    ],
  };
  // A homepage has no parent trail; avoid a one-item breadcrumb rich result.
  if (file === "index.html") {
    delete schema["@graph"][2].breadcrumb;
    schema["@graph"].pop();
  }
  const metadata = `<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BLOSSOMS 2024–25">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${origin}/assets/images/og-banner.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Blossoms 2024–25 at CHRIST University, Bengaluru Yeshwanthpur Campus">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${origin}/assets/images/og-banner.png">
<meta name="twitter:image:alt" content="Blossoms 2024–25 cultural festival">
<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`;
  html = html.replace(
    "</head>",
    `<!-- SEO:START -->\n${metadata}\n<!-- SEO:END -->\n</head>`,
  );

  if (file.endsWith("_events.html")) {
    const source = await readFile(
      resolve(root, "jsfile", file.replace(".html", ".js")),
      "utf8",
    );
    const data = readLiteral(source, "eventsData");
    const entries = Object.entries(data);
    const category = name[0].toUpperCase() + name.slice(1);
    html = block(
      html,
      "EVENT-LIST",
      `<div class="events-list" aria-label="${category}">${entries.map(([id, event]) => `<a class="event-item" href="#rule-${id}">${escape(event.title)}</a>`).join("")}</div>`,
      /<div class="events-list"[^>]*>\s*<\/div>/,
    );
    html = block(
      html,
      "EVENT-DETAILS",
      `<div class="event-details" aria-live="polite"><h2 class="event-title">${escape(entries[0][1].title)}</h2>${rules(entries[0][1])}</div>`,
      /<div class="event-details"[^>]*>\s*<\/div>/,
    );
    const handbook = `<section class="event-handbook" aria-labelledby="handbook-title"><div class="section-bar"><span>THE COMPLETE RULEBOOK</span><span>${entries.length} ENTRIES</span></div><h2 id="handbook-title">${escape(category)}: all rules</h2><p>Browse every event below, or use the selector above to focus on one event.</p>${entries.map(([id, event]) => `<details id="rule-${id}"><summary>${escape(event.title)}</summary>${rules(event)}</details>`).join("")}</section>`;
    if (html.includes("<!-- EVENT-HANDBOOK:START -->"))
      html = block(html, "EVENT-HANDBOOK", handbook);
    else
      html = html.replace(
        "</main>",
        `<!-- EVENT-HANDBOOK:START -->\n${handbook}\n<!-- EVENT-HANDBOOK:END -->\n</main>`,
      );
  }
  if (file === "results.html") {
    const source = await readFile(resolve(root, "jsfile/results.js"), "utf8");
    const contenders = readLiteral(source, "leadingContenders");
    const data = readLiteral(source, "resultsData");
    html = block(
      html,
      "CONTENDERS",
      `<div id="leadingContenders">${contenders.map((item) => `<div class="contender-item"><div class="contender-position">${escape(item.position)} Position</div><div class="contender-school">${escape(item.school)}</div></div>`).join("")}</div>`,
      /<div id="leadingContenders">\s*<\/div>/,
    );
    for (const [category, events] of Object.entries(data)) {
      const cards = events
        .map(
          (event) =>
            `<div class="event-card"><h3 class="event-title">${escape(event.name)}</h3><ul class="winners-list">${event.winners.map((winner) => `<li class="winner-item"><div class="position">${escape(winner.position)} Position</div><div class="winner-name">${(winner.names || [winner.name]).map(escape).join("<br>")}</div><div class="winner-school">${escape(winner.school)}</div></li>`).join("")}</ul></div>`,
        )
        .join("");
      html = block(
        html,
        `RESULTS-${category}`,
        `<div id="${category}Events">${cards}</div>`,
        new RegExp(`<div id="${category}Events">\\s*</div>`),
      );
    }
  }
  await writeFile(path, html);
}
await writeFile(
  resolve(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(
    pages,
  )
    .map((file) => `  <url><loc>${urlFor(file)}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
await writeFile(
  resolve(root, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  "Prepared metadata, structured data, crawlable event rules/results and sitemap for 8 pages.",
);
