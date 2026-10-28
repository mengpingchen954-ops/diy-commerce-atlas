import React, { useState } from "react";
import { Copy } from "@phosphor-icons/react";
import { popupDesign } from "./content.js";
import { Badge, PageIntro, Section, Notice, PointList, DataTable } from "./ui.jsx";

export default function InteractionsPage() {
  const [copyStatus, setCopyStatus] = useState(null);
  const copyPrompt = async (item) => {
    try {
      await navigator.clipboard.writeText(item.prompt + "\n\n" + popupDesign.commonPrompt);
      setCopyStatus({ id: item.id, text: "已复制提示词及通用要求。" });
    } catch {
      setCopyStatus({ id: item.id, text: "自动复制未成功，请展开提示词并选中文本复制。" });
    }
  };
  return (
    <>
      <PageIntro title={popupDesign.title}>{popupDesign.intro}</PageIntro>
      <Section id="interaction-principles" title="动态反馈与分层视觉">
        <PointList items={popupDesign.principles} />
        <Notice>{popupDesign.boundary}</Notice>
      </Section>
      {popupDesign.items.map((item, index) => (
        <Section key={item.id} id={item.id} title={`${String(index + 1).padStart(2, "0")} · ${item.name}`} description={item.motion}>
          <Badge quiet>{item.english}</Badge>
          <p><strong>适用场景：</strong>{item.scenes}</p>
          <p><strong>实现要点：</strong>{item.notes}</p>
          <details className="craft-guide prompt-guide">
            <summary>查看{item.name}的AI提示词</summary>
            <div className="prompt-copy">
              <pre>{item.prompt + "\n\n" + popupDesign.commonPrompt}</pre>
            </div>
          </details>
          <button className="button secondary" onClick={() => copyPrompt(item)} aria-label={`复制${item.name}提示词`}>
            <Copy size={18} aria-hidden="true" />复制提示词
          </button>
          <p className="prompt-status" role="status">{copyStatus?.id === item.id ? copyStatus.text : ""}</p>
        </Section>
      ))}
      <Section title="参数修正与验收" description="参数可复用，效果仍要按目标平台与实际内容检查。">
        <DataTable headers={["方面", "说明"]} rows={popupDesign.corrections} />
      </Section>
    </>
  );
}
