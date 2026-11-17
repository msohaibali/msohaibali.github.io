"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const CONTENT = require("../content.js");

const FILTER_IDS = ["agentic-ai", "data-science", "automation", "mlops-cloud"];
const DIAGRAM_IDS = new Set([
  "muvi",
  "proclaim",
  "ikea-vendor-portal",
  "fosroc",
  "burd",
  "ikea-checkout-qa",
  "flow-utility-sadad",
  "flow-customs",
]);

function walkStrings(value, visit) {
  if (typeof value === "string") {
    visit(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) walkStrings(item, visit);
    return;
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) walkStrings(value[key], visit);
  }
}

describe("CONTENT schema", () => {
  it("every project has id, title, client, summary and ≥1 valid filter tag", () => {
    for (const p of CONTENT.projects) {
      assert.ok(p.id, "id required");
      assert.ok(p.title, "title required");
      assert.ok(p.client, "client required");
      assert.ok(p.summary, "summary required");
      assert.ok(Array.isArray(p.tags) && p.tags.length >= 1, `${p.id} needs tags`);
      assert.ok(
        p.tags.some((t) => FILTER_IDS.includes(t)),
        `${p.id} needs a filter tag from the four ids`
      );
    }
  });

  it("ids are unique; 13 projects; first four tagged agentic-ai", () => {
    assert.equal(CONTENT.projects.length, 13);
    const ids = CONTENT.projects.map((p) => p.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const p of CONTENT.projects.slice(0, 4)) {
      assert.ok(p.tags.includes("agentic-ai"), `${p.id} should be agentic-ai`);
    }
  });

  it("diagram present only for the 8 allowed ids; edges reference nodes", () => {
    for (const p of CONTENT.projects) {
      if (p.diagram) {
        assert.ok(DIAGRAM_IDS.has(p.id), `unexpected diagram on ${p.id}`);
        const nodeIds = new Set(p.diagram.nodes.map((n) => n.id));
        for (const [from, to] of p.diagram.edges) {
          assert.ok(nodeIds.has(from), `${p.id}: edge from ${from}`);
          assert.ok(nodeIds.has(to), `${p.id}: edge to ${to}`);
        }
      } else {
        assert.ok(!DIAGRAM_IDS.has(p.id), `${p.id} should have a diagram`);
      }
    }
    for (const id of DIAGRAM_IDS) {
      const p = CONTENT.projects.find((x) => x.id === id);
      assert.ok(p && p.diagram, `missing diagram for ${id}`);
    }
  });

  it('no string contains "TBD", "lorem" or "undefined"', () => {
    const bad = [];
    walkStrings(CONTENT, (s) => {
      const lower = s.toLowerCase();
      if (lower.includes("tbd") || lower.includes("lorem") || lower.includes("undefined")) {
        bad.push(s);
      }
    });
    assert.deepEqual(bad, []);
  });

  it("fosroc result string is exact", () => {
    const fosroc = CONTENT.projects.find((p) => p.id === "fosroc");
    assert.ok(fosroc);
    assert.equal(
      fosroc.result,
      "30–50% efficiency gains, 20–30% additive cost savings · PASHA Award winner"
    );
  });

  it("experience[0] is IKEA; experience[1] is Enterprise AI Architect", () => {
    assert.equal(CONTENT.experience[0].org, "IKEA Alsulaiman");
    assert.equal(CONTENT.experience[1].title, "Enterprise AI Architect");
    assert.equal(CONTENT.experience[1].period, "Sept 2024 – Present");
  });

  it('clients includes "Muvi Cinemas" and "Catrion"', () => {
    const names = CONTENT.clients.map((c) => (typeof c === "string" ? c : c.name));
    assert.ok(names.includes("Muvi Cinemas"));
    assert.ok(names.includes("Catrion"));
  });

  it("profile has photo and Pakistani phone", () => {
    assert.equal(CONTENT.profile.photo, "assets/photo.jpg");
    assert.equal(CONTENT.profile.phonePk, "+923155507888");
  });

  it("certifications match LinkedIn licenses list", () => {
    assert.equal(CONTENT.certifications.length, 10);
    assert.equal(
      CONTENT.certifications[0].name,
      "Microsoft Certified: Azure Solutions Architect Expert"
    );
    assert.equal(CONTENT.certifications[0].id, "10CA870D58D58C41");
    assert.equal(CONTENT.certifications[1].id, "2EFEDF3006A9021E");
    assert.equal(CONTENT.certifications[4].issuer, "Oracle");
    assert.equal(CONTENT.certifications[4].expired, "Jul 2026");
    assert.equal(CONTENT.certifications[9].id, "2393792");
    for (const c of CONTENT.certifications) {
      assert.ok(c.name, "name required");
      assert.ok(c.issuer, "issuer required");
      assert.ok(c.issued, "issued required");
      assert.ok(c.url && /^https?:\/\//.test(c.url), "verify url required");
    }
    assert.match(
      CONTENT.certifications[0].url,
      /learn\.microsoft\.com.*10CA870D58D58C41/
    );
    assert.match(
      CONTENT.certifications[4].url,
      /brm-certview\.oracle\.com/
    );
  });
});
