"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const CONTENT = require("../content.js");
const {
  filterFromHash,
  projectsFor,
  escapeHtml,
  renderCaseStudy,
  renderDiagram,
  renderCard,
  initTheme,
} = require("../app.js");

const FILTER_IDS = CONTENT.filters.map((f) => f.id);

describe("app helpers", () => {
  it("filterFromHash normalises valid ids and falls back to all", () => {
    assert.equal(filterFromHash("#data-science", FILTER_IDS), "data-science");
    assert.equal(filterFromHash("#DATA-SCIENCE", FILTER_IDS), "data-science");
    assert.equal(filterFromHash("#foo", FILTER_IDS), "all");
    assert.equal(filterFromHash("", FILTER_IDS), "all");
    assert.equal(filterFromHash("#", FILTER_IDS), "all");
  });

  it("projectsFor automation contains flow-customs not muvi", () => {
    const list = projectsFor(CONTENT.projects, "automation");
    const ids = list.map((p) => p.id);
    assert.ok(ids.includes("flow-customs"));
    assert.ok(!ids.includes("muvi"));
  });

  it("renderCaseStudy omits empty sections for thin projects", () => {
    const html = renderCaseStudy({
      id: "x",
      title: "T",
      client: "C",
      tags: ["automation"],
      summary: "S",
      result: null,
    });
    assert.ok(!html.includes("undefined"));
    assert.ok(!html.includes("null"));
    assert.ok(!html.includes("Result"));
    assert.ok(!html.includes("Stack"));
  });

  it("renderCaseStudy includes Fosroc result", () => {
    const fosroc = CONTENT.projects.find((p) => p.id === "fosroc");
    const html = renderCaseStudy(fosroc);
    assert.ok(
      html.includes(
        "30–50% efficiency gains, 20–30% additive cost savings · PASHA Award winner"
      )
    );
  });

  it("escapeHtml escapes markup characters", () => {
    assert.equal(escapeHtml('<a "&">'), "&lt;a &quot;&amp;&quot;&gt;");
  });

  it("renderDiagram produces svg with rects and aria-label", () => {
    const muvi = CONTENT.projects.find((p) => p.id === "muvi");
    const svg = renderDiagram(muvi.diagram);
    assert.ok(svg.startsWith("<svg"));
    assert.equal((svg.match(/<rect/g) || []).length, muvi.diagram.nodes.length);
    assert.ok(svg.includes("aria-label"));
  });

  it("renderCard is a button with data-id", () => {
    const muvi = CONTENT.projects.find((p) => p.id === "muvi");
    const html = renderCard(muvi);
    assert.ok(html.includes("<button"));
    assert.ok(html.includes('data-id="muvi"'));
  });
});
