import React, { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  BookmarkSimple,
  ArrowUpRight,
  Diamond,
  Sparkle,
  TShirt,
  Handbag,
  DeviceMobile,
  Notebook,
  Tag,
  Palette,
  GridFour,
  Shapes,
  Flame,
  Cake,
  Gift,
  Flower,
  Dress,
  PawPrint,
  Fan,
  PaintBrush,
  Smiley,
  Funnel,
  X,
} from "@phosphor-icons/react";
import { categories, lanes, matchesCategory } from "./content.js";
import { Badge, Dialog, PageIntro, PointList, Notice } from "./ui.jsx";

const icons = {
  beads: Diamond,
  jewelry: Sparkle,
  nails: Sparkle,
  shirt: TShirt,
  bag: Handbag,
  phone: DeviceMobile,
  notebook: Notebook,
  tag: Tag,
  palette: Palette,
  grid: GridFour,
  shapes: Shapes,
  flame: Flame,
  cake: Cake,
  gift: Gift,
  flower: Flower,
  dress: Dress,
  paw: PawPrint,
  fan: Fan,
  brush: PaintBrush,
  smile: Smiley,
};
export function CategoryIcon({ type, size = 25 }) {
  const Icon = icons[type] || Shapes;
  return <Icon size={size} weight="duotone" aria-hidden="true" />;
}

export function CategoryCard({ category: c, onOpen, favorite, onFavorite }) {
  return (
    <article className="category-card">
      <div className="card-top">
        <span className="category-icon">
          <CategoryIcon type={c.icon} />
        </span>
        <Badge quiet>{c.stage}</Badge>
        <button
          className={`icon-button save-button ${favorite ? "saved" : ""}`}
          onClick={() => onFavorite(c.id)}
          aria-label={`${favorite ? "取消收藏" : "收藏"}${c.name}`}
          aria-pressed={favorite}
        >
          <BookmarkSimple size={20} weight={favorite ? "fill" : "regular"} />
        </button>
      </div>
      <button className="card-open" onClick={() => onOpen(c)}>
        <h3>
          {c.name}
          <ArrowUpRight size={21} aria-hidden="true" />
        </h3>
        <p>{c.desc}</p>
        <div className="item-preview">
          {c.items.slice(0, 4).join(" / ")}
          {c.items.length > 4 && <span> 等{c.items.length}项</span>}
        </div>
      </button>
      <div className="card-footer">
        <span>{c.engine}</span>
        <span>{c.fulfill.slice(0, 2).join(" · ")}</span>
      </div>
    </article>
  );
}

export function CategoryDetail({ category: c, onClose, favorite, onFavorite }) {
  return (
    <Dialog
      open={!!c}
      onClose={onClose}
      label={c ? `${c.name}详情` : "品类详情"}
      className="detail-dialog"
    >
      {c && (
        <>
          <div className="detail-header">
            <span className="category-icon large">
              <CategoryIcon type={c.icon} size={31} />
            </span>
            <div>
              <Badge>{c.stage} · 产品建议</Badge>
              <h2>{c.name}</h2>
            </div>
          </div>
          <p className="detail-description">{c.desc}</p>
          <div className="detail-facts">
            <div>
              <span>编辑能力</span>
              <strong>{c.engine}</strong>
            </div>
            <div>
              <span>实现复杂度估计</span>
              <strong>{c.complexity}</strong>
            </div>
            <div>
              <span>适配商家</span>
              <strong>{c.merchants.join("、")}</strong>
            </div>
            <div>
              <span>履约方式</span>
              <strong>{c.fulfill.join("、")}</strong>
            </div>
          </div>
          <h3>具体可以做什么</h3>
          <div className="chips">
            {c.items.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <div className="detail-columns">
            <div>
              <h3>用户怎样创作</h3>
              <PointList items={c.actions} />
            </div>
            <div>
              <h3>可选的游戏玩法</h3>
              <PointList items={c.play} />
            </div>
          </div>
          <h3>最小可验证方案</h3>
          <PointList items={c.mvp} />
          <h3>制作与交付边界</h3>
          <PointList items={c.risks} />
          <Notice>{c.note}</Notice>
          <button className="button primary" onClick={() => onFavorite(c.id)}>
            <BookmarkSimple size={18} weight={favorite ? "fill" : "regular"} />
            {favorite ? "已收藏，点击取消" : "收藏这个方向"}
          </button>
        </>
      )}
    </Dialog>
  );
}

export default function Categories({
  favorites,
  onFavorite,
  onOpen,
  initialSaved = false,
}) {
  const [lane, setLane] = useState("全部品类");
  const [query, setQuery] = useState("");
  const [delivery, setDelivery] = useState("全部履约");
  const [saved, setSaved] = useState(initialSaved);
  const filtered = useMemo(
    () =>
      categories.filter(
        (c) =>
          (lane === "全部品类" || c.lane === lane) &&
          (delivery === "全部履约" ||
            c.fulfill.some((s) => s.includes(delivery))) &&
          (!saved || favorites.includes(c.id)) &&
          matchesCategory(c, query),
      ),
    [lane, query, delivery, saved, favorites],
  );
  const reset = () => {
    setQuery("");
    setLane("全部品类");
    setDelivery("全部履约");
    setSaved(false);
  };
  return (
    <>
      <PageIntro title="找到值得开始的那个方向。">
        从商品、编辑方式和履约出发，探索20个品类组。优先级是产品建议，不是市场热度排名。
      </PageIntro>
      <div className="filter-panel">
        <div className="tabs" aria-label="品类分组">
          {lanes.map((l) => (
            <button
              key={l}
              className={lane === l ? "active" : ""}
              aria-pressed={lane === l}
              onClick={() => setLane(l)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="search-field">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <span className="sr-only">搜索品类、商品或商家</span>
            <input
              aria-label="搜索品类、商品或商家"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索品类、商品或商家…"
            />
            {query && (
              <button
                className="icon-button"
                onClick={() => setQuery("")}
                aria-label="清空品类搜索"
              >
                <X size={16} />
              </button>
            )}
          </label>
          <label className="select-field">
            <Funnel size={17} aria-hidden="true" />
            <span className="sr-only">按履约方式筛选</span>
            <select
              aria-label="按履约方式筛选"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            >
              {["全部履约", "成品", "材料包", "到店", "数字"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <button
            className={`button favorite-filter ${saved ? "selected" : ""}`}
            aria-pressed={saved}
            onClick={() => setSaved(!saved)}
          >
            <BookmarkSimple size={18} weight={saved ? "fill" : "regular"} />
            我的收藏 <span>{favorites.length}</span>
          </button>
        </div>
      </div>
      <div className="result-line">
        <span>
          共 <strong>{filtered.length}</strong> 个品类组
        </span>
        <span>点击品类，查看商品、玩法和最小方案</span>
      </div>
      {filtered.length ? (
        <div className="category-grid">
          {filtered.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              favorite={favorites.includes(c.id)}
              onFavorite={onFavorite}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <MagnifyingGlass size={36} />
          <h2>{saved ? "还没有符合条件的收藏" : "没有找到匹配的品类"}</h2>
          <p>试试更短的关键词，或清除筛选后重新探索。</p>
          <button className="button primary" onClick={reset}>
            清除全部筛选
          </button>
        </div>
      )}
    </>
  );
}
