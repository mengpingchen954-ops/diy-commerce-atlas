import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight, Info } from "@phosphor-icons/react";

export function Badge({ children, quiet = false }) {
  return <span className={`badge ${quiet ? "quiet" : ""}`}>{children}</span>;
}
export function PageIntro({ title, children, action }) {
  return (
    <div className="page-intro">
      <h1>{title}</h1>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function Section({ title, description, children, id }) {
  return (
    <section className="section" id={id}>
      <div className="section-heading">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}
export function Notice({ children }) {
  return (
    <div className="notice">
      <Info size={20} weight="duotone" aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
export function DataTable({ headers, rows, caption }) {
  return (
    <div
      className="table-wrap"
      tabIndex="0"
      role="region"
      aria-label={caption || headers.join("、")}
    >
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} id={typeof row[0] === "string" ? row[0] : undefined}>
              {row.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function PointList({ items }) {
  return (
    <ul className="point-list">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
}
export function Dialog({ open, onClose, label, children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prior;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        className="icon-button dialog-close"
        onClick={onClose}
        aria-label="关闭窗口"
      >
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}
export function TextLink({ children, onClick }) {
  return (
    <button className="text-link" onClick={onClick}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </button>
  );
}
