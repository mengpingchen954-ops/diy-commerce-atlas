import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  categories,
  engines,
  mechanics,
  evidence,
  getSearchRecords,
  matchesCategory,
  exportMarkdown,
  selfOperation,
} from "../src/content.js";

test("所有品类保留独立制作规则、交付方式和边界", () => {
  assert.equal(categories.length, 20);
  assert.equal(new Set(categories.map((c) => c.id)).size, categories.length);
  for (const c of categories) {
    for (const field of [
      "items",
      "actions",
      "merchants",
      "fulfill",
      "play",
      "mvp",
      "risks",
    ])
      assert.ok(c[field].length > 0, `${c.id}.${field}`);
    assert.ok(
      engines.some((e) => e[0] === c.engine),
      c.engine,
    );
  }
});
test("关键原始方向可通过商品别名检索，多词搜索必须全部匹配", () => {
  for (const word of [
    "菩提",
    "水晶",
    "穿戴甲",
    "蛋糕",
    "水果干",
    "吐司",
    "笔记本",
    "鞋",
    "表情包",
    "漆扇",
    "活字印刷",
    "热缩片",
    "手机链",
    "软陶",
    "口脂",
    "积木",
    "微缩",
  ])
    assert.ok(
      categories.some((c) => matchesCategory(c, word)),
      word,
    );
  assert.ok(matchesCategory(categories[0], "串珠 材料包"));
  assert.ok(!matchesCategory(categories[0], "串珠 不存在的关键词"));
});
test("全站搜索覆盖业务、规则和证据，不把付款界面算作交易完成", () => {
  const records = getSearchRecords();
  for (const term of ["佣金", "300DPI", "退款", "平台", "纹样", "奇偶潮玩"])
    assert.ok(
      records.some((r) => (r.title + " " + r.text).includes(term)),
      term,
    );
  assert.equal(mechanics.length, 5);
  assert.equal(evidence.length, 9);
  assert.match(
    evidence.find((e) => e.id === "checkout").limit,
    /不证明交易完成/,
  );
});
test("导出资料涵盖全部品类、定价草案、参考对象与假设修订", () => {
  const out = exportMarkdown();
  for (const c of categories)
    for (const item of c.items) assert.ok(out.includes(item), item);
  for (const term of [
    "99元",
    "199元",
    "399元",
    "待核验",
    "3至5家",
    "Bouquet Builder",
    "数字素材",
    "出血",
  ])
    assert.ok(out.includes(term), term);
  for (const heading of [
    "商家与服务",
    "产品引擎",
    "落地路线",
    "截图证据",
    "经营与成本",
    "跨品类工坊设想",
    "自营定制",
  ])
    assert.ok(out.includes("## " + heading), heading);
  assert.ok(!/1[3-9]\d{9}/.test(out), "导出不包含手机号");
});
test("自营方案在搜索和下载中完整可达，生产建议保留验证边界", () => {
  const records = getSearchRecords();
  const out = exportMarkdown();
  for (const section of selfOperation.sections) {
    const record = records.find((r) => r.page === "self-operated" && r.id === section.id);
    assert.ok(record, section.id);
    for (const row of section.rows)
      for (const cell of row) {
        assert.ok(record.text.includes(cell), cell);
        assert.ok(out.includes(cell), cell);
      }
  }
  assert.match(selfOperation.boundary, /尚未完成采购/);
  for (const word of ["拼多多", "转印膜", "整盒定制印刷", "婚宴", "订单人工"])
    assert.ok(records.some((r) => r.page === "self-operated" && r.text.includes(word)), word);
});
test("公开截图副本存在，原始附件不属于站点资源", () => {
  for (const e of evidence)
    assert.ok(
      existsSync(new URL("../public/references/" + e.image, import.meta.url)),
      e.image,
    );
  assert.ok(
    existsSync(
      new URL("../public/references/bracelet-detail.jpg", import.meta.url),
    ),
  );
});
