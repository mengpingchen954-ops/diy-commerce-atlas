import assert from 'node:assert/strict';
import { evidence, categories, selfOperation, developmentGuide, popupDesign } from '../src/content.js';

const base = new URL(process.argv[2] || 'https://mengpingchen954-ops.github.io/diy-commerce-atlas/');
const home = await fetch(base);
assert.equal(home.status, 200);
const html = await home.text();
assert.ok(html.includes('手作生意图谱'));
const resources = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
  .map(match => new URL(match[1], base));
resources.push(...evidence.map(e => new URL('references/' + e.image, base)));
resources.push(new URL('references/bracelet-detail.jpg', base));
const results = await Promise.allSettled(resources.map(async url => {
  assert.equal(url.origin, base.origin, '运行资源应同源');
  assert.ok(url.pathname.startsWith(base.pathname), '资源应在仓库子路径内');
  const response = await fetch(url);
  assert.equal(response.status, 200, url.href);
  const bytes = await response.arrayBuffer();
  assert.ok(bytes.byteLength > 0, url.href);
  return { path: url.pathname, status: response.status, bytes: bytes.byteLength };
}));
for (const result of results) {
  if (result.status === 'rejected') throw result.reason;
  console.log(JSON.stringify(result.value));
}
const download = await fetch(new URL('资料总集.md', base));
assert.equal(download.status, 200);
const markdown = await download.text();
for (const category of categories) {
  assert.ok(markdown.includes(category.name), category.name);
  for (const item of category.items) assert.ok(markdown.includes(item), item);
}
assert.ok(markdown.includes('定价草案'));
for (const item of popupDesign.items) {
  for (const text of [item.name, item.english, item.motion, item.scenes, item.prompt, item.notes])
    assert.ok(markdown.includes(text), text);
}
assert.ok(markdown.includes(popupDesign.commonPrompt));
for (const step of developmentGuide.steps) {
  for (const text of [step.title, ...step.tasks, step.deliver, step.gate])
    assert.ok(markdown.includes(text), text);
}
assert.ok(markdown.includes(developmentGuide.boundary));
for (const section of selfOperation.sections) {
  assert.ok(markdown.includes(section.title), section.title);
  for (const row of section.rows)
    for (const cell of row) assert.ok(markdown.includes(cell), cell);
}
assert.ok(!/1[3-9]\d{9}/.test(markdown), '公开资料不得包含手机号');
console.log(JSON.stringify({ home: 200, resources: resources.length, download: 200, categoryGroups: categories.length, catalogItems: categories.reduce((n,c)=>n+c.items.length,0) }));
