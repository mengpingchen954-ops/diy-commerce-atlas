import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SquaresFour,
  Compass,
  GameController,
  Storefront,
  UsersThree,
  Stack,
  Images,
  Path,
  Notebook,
  MagnifyingGlass,
  BookmarkSimple,
  DownloadSimple,
  List,
  X,
  ArrowUpRight,
  ArrowRight,
  Flower,
  Check,
} from "@phosphor-icons/react";
import { site, categories, getSearchRecords } from "./content.js";
import Categories, { CategoryDetail } from "./Categories.jsx";
import {
  Overview,
  MechanicsPage,
  BusinessPage,
  MerchantsPage,
  EnginePage,
  EvidencePage,
  RoadmapPage,
  NotesPage,
} from "./Pages.jsx";
import { Dialog, Badge } from "./ui.jsx";

const nav = [
  ["overview", "项目总览", SquaresFour],
  ["categories", "品类地图", Compass],
  ["mechanics", "玩法机制", GameController],
  ["business", "商业模式", Storefront],
  ["merchants", "商家与服务", UsersThree],
  ["engine", "产品引擎", Stack],
  ["evidence", "案例与截图", Images],
  ["roadmap", "落地路线", Path],
  ["notes", "研究备忘", Notebook],
];
const readPage = () =>
  nav.some((n) => n[0] === location.hash.slice(1))
    ? location.hash.slice(1)
    : "overview";
const loadFavorites = () => {
  try {
    const value = JSON.parse(
      localStorage.getItem("diy-atlas-favorites") || "[]",
    );
    return Array.isArray(value)
      ? value.filter((id) => categories.some((c) => c.id === id))
      : [];
  } catch {
    return [];
  }
};

function Search({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const records = useMemo(getSearchRecords, []);
  const results = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return terms.length
      ? records.filter((r) =>
          terms.every((t) =>
            (r.title + " " + r.text).toLocaleLowerCase().includes(t),
          ),
        )
      : [];
  }, [records, query]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label="搜索全部资料"
      className="search-dialog"
    >
      <h2>搜索全部资料</h2>
      <label className="search-field">
        <MagnifyingGlass size={21} />
        <span className="sr-only">全站搜索关键词</span>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="试试“穿戴甲”“佣金”“300DPI”…"
        />
      </label>
      {query.trim() ? (
        <>
          <p className="result-line" role="status">
            找到 {results.length} 条相关资料
          </p>
          <div className="search-results">
            {results.length ? (
              results.map((r) => (
                <button
                  key={r.page + r.id}
                  onClick={() => {
                    onSelect(r);
                    setQuery("");
                  }}
                >
                  <Badge quiet>{r.kind}</Badge>
                  <strong>{r.title}</strong>
                  <p>
                    {r.text.slice(0, 115)}
                    {r.text.length > 115 ? "…" : ""}
                  </p>
                  <ArrowUpRight size={17} />
                </button>
              ))
            ) : (
              <div className="search-empty">
                没有匹配结果。试试商品名称、玩法或更短的关键词。
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="search-hints">
          <p>搜索覆盖品类、玩法、商业模式、商家服务、案例、路线与研究备忘。</p>
          <div className="chips">
            {["穿戴甲", "材料包", "佣金", "版权", "预约"].map((q) => (
              <button key={q} onClick={() => setQuery(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </Dialog>
  );
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchTarget, setSearchTarget] = useState(null);
  const [detail, setDetail] = useState(null);
  const [image, setImage] = useState(null);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [onlySaved, setOnlySaved] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef(null);
  useEffect(() => {
    const change = () => {
      setPage(readPage());
      setMenu(false);
      setDetail(null);
      setImage(null);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.title = `${nav.find((n) => n[0] === page)?.[1]} · ${site.title}`;
  }, [page]);
  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
      if (e.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (menu) document.querySelector(".sidebar nav a.active")?.focus();
  }, [menu]);
  useEffect(() => {
    if (!searchTarget || searchTarget.page !== page) return;
    if (page === "categories") {
      setDetail(categories.find((c) => c.id === searchTarget.id));
    } else {
      document.getElementById(searchTarget.id)?.scrollIntoView({ block: "start" });
    }
    setSearchTarget(null);
  }, [page, searchTarget]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const navigate = (next, saved = false) => {
    setOnlySaved(saved);
    setMenu(false);
    if (location.hash !== `#${next}`) location.hash = next;
    else {
      setPage(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };
  const favorite = (id) => {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem("diy-atlas-favorites", JSON.stringify(next));
      setToast(next.includes(id) ? "已收藏，保存在当前浏览器" : "已取消收藏");
    } catch {
      setToast("本次已更新；浏览器未允许持久保存");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  };
  const selectSearch = (r) => {
    setSearch(false);
    setSearchTarget(r);
    navigate(r.page);
  };
  const navIndex = nav.findIndex((n) => n[0] === page);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        跳到主要内容
      </a>
      <div className="app-shell">
        {menu && (
          <button
            className="menu-overlay"
            aria-label="关闭导航"
            onClick={() => setMenu(false)}
          />
        )}
        <aside className={`sidebar ${menu ? "open" : ""}`} aria-label="网站目录">
          <a className="brand" href="#overview" onClick={() => setMenu(false)}>
            <span className="brand-mark">
              <Flower weight="fill" size={25} />
            </span>
            <span>
              手作生意图谱<small>DIY COMMERCE ATLAS</small>
            </span>
          </a>
          <button
            className="side-search"
            onClick={() => {
              setSearch(true);
              setMenu(false);
            }}
          >
            <MagnifyingGlass size={18} />
            <span>搜索资料</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="nav-group-label">探索与规划</div>
          <nav aria-label="主导航">
            {nav.map(([id, label, Icon]) => (
              <a
                key={id}
                href={`#${id}`}
                className={page === id ? "active" : ""}
                aria-current={page === id ? "page" : undefined}
                onClick={() => {
                  setOnlySaved(false);
                  setMenu(false);
                }}
              >
                <Icon size={21} weight={page === id ? "fill" : "regular"} />
                <span>{label}</span>
                {id === "categories" && <small>{categories.length}</small>}
              </a>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <button onClick={() => navigate("categories", true)}>
              <BookmarkSimple size={19} />
              <span>我的收藏</span>
              <small>{favorites.length}</small>
            </button>
            <a href="./资料总集.md" download>
              <DownloadSimple size={19} />
              <span>下载完整资料</span>
            </a>
            <p>
              项目研究资料 · 非交易平台
              <br />
              整理于 {site.updated}
            </p>
          </div>
        </aside>
        <div className="workspace" inert={menu ? true : undefined}>
          <header className="topbar">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? "关闭目录" : "打开目录"}
              aria-expanded={menu}
            >
              <List size={25} />
            </button>
            <div className="breadcrumb">
              <span>资料库</span>
              <span>/</span>
              <strong>{nav[navIndex][1]}</strong>
            </div>
            <div className="top-actions">
              <button
                className="icon-button"
                onClick={() => setSearch(true)}
                aria-label="打开全站搜索"
              >
                <MagnifyingGlass size={21} />
              </button>
              <a className="download-link" href="./资料总集.md" download>
                <DownloadSimple size={17} />
                <span>下载资料</span>
              </a>
            </div>
          </header>
          <main id="main" tabIndex="-1" key={page + onlySaved}>
            <div className="content">
              {page === "overview" && (
                <Overview navigate={navigate} onOpen={setDetail} />
              )}
              {page === "categories" && (
                <Categories
                  favorites={favorites}
                  onFavorite={favorite}
                  onOpen={setDetail}
                  initialSaved={onlySaved}
                />
              )}
              {page === "mechanics" && <MechanicsPage />}
              {page === "business" && <BusinessPage />}
              {page === "merchants" && <MerchantsPage />}
              {page === "engine" && <EnginePage />}
              {page === "evidence" && <EvidencePage onImage={setImage} />}
              {page === "roadmap" && <RoadmapPage />}
              {page === "notes" && <NotesPage />}
              <footer className="page-footer">
                <span>
                  手作生意图谱 <span className="footer-separator">·</span>{" "}
                  创作、商品与经营之间的连接
                </span>
                {navIndex < nav.length - 1 && (
                  <a href={`#${nav[navIndex + 1][0]}`}>
                    继续阅读：{nav[navIndex + 1][1]}
                    <ArrowRight size={16} />
                  </a>
                )}
              </footer>
            </div>
          </main>
        </div>
      </div>
      <Search
        open={search}
        onClose={() => setSearch(false)}
        onSelect={selectSearch}
      />
      <CategoryDetail
        category={detail}
        onClose={() => setDetail(null)}
        favorite={!!detail && favorites.includes(detail.id)}
        onFavorite={favorite}
      />
      <Dialog
        open={!!image}
        onClose={() => setImage(null)}
        label={image ? image.title + "截图" : "截图"}
        className="image-dialog"
      >
        {image && (
          <>
            <h2>{image.title}</h2>
            <p>第三方参考截图，公开副本已脱敏。</p>
            <img
              src={`./references/${image.image}`}
              alt={`${image.title}完整参考截图`}
            />
          </>
        )}
      </Dialog>
      {toast && (
        <div className="toast" role="status">
          <Check size={18} />
          {toast}
        </div>
      )}
    </>
  );
}
