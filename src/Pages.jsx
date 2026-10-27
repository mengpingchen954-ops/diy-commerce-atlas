import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  LinkSimple,
  Image as ImageIcon,
  DownloadSimple,
  Check,
  Compass,
  Storefront,
  Stack,
  Path,
  BookmarkSimple,
} from "@phosphor-icons/react";
import {
  site,
  categories,
  engines,
  mechanics,
  business,
  pricing,
  merchants,
  services,
  modules,
  flow,
  acquisition,
  roadmap,
  metrics,
  evidence,
  competitors,
  corrections,
  scenarios,
  taxonomy,
  routes,
  safeguards,
  sourceNotes,
} from "./content.js";
import {
  Badge,
  PageIntro,
  Section,
  Notice,
  DataTable,
  PointList,
  TextLink,
} from "./ui.jsx";
import { CategoryIcon } from "./Categories.jsx";

export function Overview({ navigate, onOpen }) {
  const itemCount = categories.reduce((n, c) => n + c.items.length, 0);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            把手作灵感，
            <br />
            变成可经营的生意。
          </h1>
          <p>游戏化 DIY 的品类、玩法与商业路径，都在这里。</p>
          <div className="hero-actions">
            <button
              className="button primary"
              onClick={() => navigate("categories")}
            >
              探索品类地图
              <ArrowRight size={18} />
            </button>
            <button
              className="button secondary"
              onClick={() => navigate("roadmap")}
            >
              查看落地路线
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="./references/bracelet-detail.jpg"
            alt="参考产品截图中的彩色珠串细节"
          />
          <div className="photo-note">从一颗珠子，开始一个创作闭环</div>
        </div>
      </section>
      <div className="stats-strip">
        <div>
          <strong>
            {categories.length}
            <span>个</span>
          </strong>
          <p>品类组，连接多种手作生意</p>
        </div>
        <div>
          <strong>
            {itemCount}
            <span>项</span>
          </strong>
          <p>具体商品与创作项目</p>
        </div>
        <div>
          <strong>
            {engines.length}
            <span>类</span>
          </strong>
          <p>编辑能力，按生产规则适配</p>
        </div>
        <div>
          <strong>
            {mechanics.length}
            <span>类</span>
          </strong>
          <p>玩法机制，按需求逐步加入</p>
        </div>
      </div>
      <Section
        title="一个创作闭环，多种经营可能。"
        description="用户自己设计，商家负责供货与制作，软件连接方案、材料和订单。"
      >
        <div className="flow-strip">
          {site.formula.map((s, i) => (
            <React.Fragment key={s}>
              <div>
                <span className="flow-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <strong>{s}</strong>
              </div>
              {i < site.formula.length - 1 && (
                <ArrowRight size={18} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Section>
      <div className="overview-columns">
        <Section
          title="先从这些方向看起"
          description="保留不同验证路线，不把所有品类塞进首版。"
        >
          <div className="focus-list">
            {["beads", "nails", "pod", "cream"].map((id) => {
              const c = categories.find((c) => c.id === id);
              return (
                <button
                  className="focus-row"
                  key={id}
                  onClick={() => onOpen(c)}
                >
                  <span className="category-icon">
                    <CategoryIcon type={c.icon} />
                  </span>
                  <span>
                    <strong>{c.name}</strong>
                    <small>
                      {c.stage} · {c.engine}
                    </small>
                  </span>
                  <ArrowUpRight size={20} />
                </button>
              );
            })}
          </div>
          <TextLink onClick={() => navigate("categories")}>
            查看全部品类
          </TextLink>
        </Section>
        <Section
          title="把灵感整理成行动"
          description="按你现在最需要解决的问题进入。"
        >
          <div className="reading-list">
            {[
              [
                Stack,
                "产品引擎",
                "哪些能力可以复用，哪些必须单独配置？",
                "engine",
              ],
              [
                Storefront,
                "商业模式",
                "订阅、开发、佣金与运营如何组合？",
                "business",
              ],
              [
                Path,
                "落地路线",
                "先跑通一个商家，再检验跨品类复用。",
                "roadmap",
              ],
            ].map(([Icon, title, text, page]) => (
              <button key={page} onClick={() => navigate(page)}>
                <Icon size={24} weight="duotone" />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
        </Section>
      </div>
      <Notice>
        <strong>阅读提示：</strong>
        这里整理的是项目设想与验证路径。截图证据、产品建议、定价草案与待核验判断分别标注，数量来自资料条目，不代表市场规模或经营业绩。
      </Notice>
    </>
  );
}

export function MechanicsPage() {
  return (
    <>
      <PageIntro title="让创作本身，值得再来一次。">
        用户的首要目标是做出自己的作品，并得到它。玩法帮助选择、学习和表达。
      </PageIntro>
      <div className="mechanic-list">
        {mechanics.map((m, i) => (
          <article className="mechanic" key={m.id} id={m.id}>
            <div className="mechanic-index">0{i + 1}</div>
            <div className="mechanic-body">
              <div className="inline-heading">
                <h2>{m.name}</h2>
                <Badge quiet>{m.stage}</Badge>
              </div>
              <p className="strong-text">{m.goal}</p>
              <p>{m.intro}</p>
              <div className="chips">
                {m.variants.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
              <p className="example-text">应用示例：{m.examples.join("、")}</p>
              <div className="boundary">{m.boundary}</div>
            </div>
          </article>
        ))}
      </div>
      <Section title="数字素材、库存和权益，分别记录。">
        <DataTable
          headers={["类型", "代表什么", "示例"]}
          rows={[
            [
              "数字素材",
              "编辑器里可用的图案、纹样或部件",
              "抽到数字金色珠纹，可在作品中使用",
            ],
            [
              "实物库存",
              "商家实际可交付的商品和配件",
              "一颗珠子、一个吊坠、一盒贴纸",
            ],
            [
              "兑换权益",
              "符合条件后可核销的机会或优惠",
              "优惠券、赠品资格、指定兑换",
            ],
          ]}
        />
      </Section>
      <Section title="流量与传播，也要接回真实订单。">
        <DataTable headers={["玩法", "用途", "需要明确"]} rows={acquisition} />
      </Section>
      <Section title="远期设想：一间可以切换的手作工坊">
        <p>
          玩家在串珠、香氛、奶油胶、花艺工坊间切换，完成主题任务、积累作品、获得数字奖励，再购买喜欢的实物方案。虚拟币兑换实物优惠券只是待评估机制，需要明确成本、条件、库存与规则。
        </p>
        <Notice>
          先完成单品类创作和成交闭环，再评估多工坊、复杂养成与付费随机机制。添加玩法不等于已经证明留存或转化提升。
        </Notice>
      </Section>
    </>
  );
}

export function BusinessPage() {
  return (
    <>
      <PageIntro title="软件、服务与交易，各有价值。">
        基础 SaaS 加可选代运营和供应链服务。按实际交付收费，按实际角色承担责任。
      </PageIntro>
      <div className="business-model">
        <div>
          <span>商家自己卖</span>
          <h2>品牌 DIY 店铺</h2>
          <p>你提供软件、素材与培训，商家经营和履约。</p>
        </div>
        <LinkSimple size={26} />
        <div>
          <span>你帮助商家卖</span>
          <h2>分销与代运营</h2>
          <p>在约定范围内提供获客、内容或运营，记录订单归因与结算。</p>
        </div>
      </div>
      <Section title="收入方式与交付边界">
        <DataTable
          headers={["收入项目", "交付内容", "收费方式", "适用阶段", "服务边界"]}
          rows={business}
        />
      </Section>
      <Section
        title="把价格当成待测试的草案。"
        description="以下99／199／399元来自讨论，不是市场报价、已售套餐或盈利保证。"
      >
        <div className="pricing-grid">
          {pricing.map((p) => (
            <article className="price-card" key={p.name}>
              <Badge quiet>定价草案</Badge>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="price">
                ¥{p.price}
                <small>{p.price === 399 ? "起 / 月" : " / 月"}</small>
              </div>
              <PointList items={p.features} />
              <p className="price-limit">{p.limit}</p>
            </article>
          ))}
        </div>
      </Section>
      <Notice>
        标准软件订阅、素材制作、专属开发、代运营分别约定。商品建库、培训、客服和修改的人力成本不能被忽略。
      </Notice>
      <Section title="两条经营路线，可以先后推进。">
        <DataTable
          headers={["路线", "交付与收益", "投入与责任"]}
          rows={[
            [
              "B端SaaS主线",
              "卖给商家，收订阅与服务费",
              "软件、培训、维护；实际参与交易的责任另行明确",
            ],
            [
              "C端自营示范店",
              "自己接订单，验证设计到实物的完整体验",
              "选品、获客、供应链、物流与售后",
            ],
            [
              "综合多商家平台",
              "多个工坊或商家统一展示与分销",
              "增加入驻审核、订单拆分、结算和纠纷处理",
            ],
          ]}
        />
      </Section>
      <Section title="先算清楚一笔订单，再讨论规模。">
        <p>
          商品收入应覆盖材料、工艺人工、包装物流、支付相关费用、获客、平台服务、损耗和售后。软件收入也应覆盖素材支持、培训、维护与基础设施。按真实数据填写，不在资料阶段预设利润或回本时间。
        </p>
      </Section>
    </>
  );
}

export function MerchantsPage() {
  return (
    <>
      <PageIntro title="从商家最费时间的地方开始。">
        减少沟通、准确备料、按时交付，比堆功能更容易形成清楚的购买理由。
      </PageIntro>
      <Section title="谁适合成为你的客户">
        <DataTable
          headers={["客户类型", "主要需求", "适合商品", "产品形态"]}
          rows={merchants}
        />
      </Section>
      <Section title="可单独交付的增值服务">
        <div className="service-grid">
          {services.map(([problem, answer]) => (
            <article key={problem} id={problem}>
              <h3>{problem}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section title="AI素材服务，区分数字想象与真实商品。">
        <DataTable
          headers={["素材类型", "适用方式", "交付要求"]}
          rows={[
            [
              "背景、主题插画、场景、数字装饰",
              "可探索AI辅助生成与人工设计",
              "检查授权、品牌一致性和使用范围",
            ],
            [
              "真实珠子、配件、商品图片",
              "以实物资料为基础，拍摄、抠图、校正",
              "核对颜色、比例、尺寸、规格、编号与可供货状态",
            ],
          ]}
        />
      </Section>
      <Section title="同一种商品，可以进入不同场景。">
        <div className="scenario-grid">
          {scenarios.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Notice>
        “商家多、预算高、愿意付费、付费意愿强”都是需要访谈的问题。记录具体客户、预算、采购流程和持续使用，而不是从品类名称推断。
      </Notice>
    </>
  );
}

export function EnginePage() {
  return (
    <>
      <PageIntro title="共用基础能力，保留专业规则。">
        账号、素材、作品和订单可以复用；生产文件、长度、尺寸与交付条件按品类配置。
      </PageIntro>
      <Section title="先分清五个信息维度">
        <DataTable headers={["维度", "回答的问题", "举例"]} rows={taxonomy} />
      </Section>
      <Section title="八类编辑能力">
        <DataTable
          headers={["编辑能力", "用户操作", "覆盖商品", "不能省掉的规则"]}
          rows={engines}
        />
      </Section>
      <Section title="一个订单闭环的两端">
        <DataTable headers={["环节", "用户端", "商家端"]} rows={flow} />
      </Section>
      <Notice>
        <strong>订单保存下单时的快照。</strong>
        设计、商品规格、材料、工艺、价格、确认事项和交付时间不能随素材下架或改价而改变。商家需要材料单与生产参数，不能只收到一张效果图。
      </Notice>
      <Section title="配套能力按需求加入">
        <DataTable headers={["模块", "内容", "建议阶段"]} rows={modules} />
      </Section>
      <Section title="首版边界">
        <PointList
          items={[
            "先用固定模板、标准视角、有限部件验证，不预设复杂3D或流体仿真。",
            "同一底座可以增加商品模板，但不同生产方法需要不同规则。",
            "预约业务增加时段、人数、备料、改期与核销。",
            "多商家阶段再增加商家隔离、订单归属、权限和结算。",
            "参考公开流程后独立实现，品牌、美术、代码和素材使用需要相应授权。",
          ]}
        />
      </Section>
    </>
  );
}

export function EvidencePage({ onImage }) {
  return (
    <>
      <PageIntro title="从截图中看见结构，也保留边界。">
        用户提供了10张好运成串截图。合并重复购物车后展示9张公开副本，联系号码、访客编号和支付金额已遮盖。
      </PageIntro>
      <Notice>
        第三方产品界面仅作为研究参考。按钮出现不等于行为已实测，隐私声明也不能证明功能实际实现；本站与所列产品没有关联或合作背书。
      </Notice>
      <div className="evidence-grid">
        {evidence.map((e) => (
          <article className="evidence-card" key={e.id} id={e.id}>
            <button
              className="screenshot-button"
              onClick={() => onImage(e)}
              aria-label={`放大${e.title}截图`}
            >
              <img
                src={`./references/${e.image}`}
                alt={`好运成串参考：${e.title}，已脱敏`}
                loading="lazy"
              />
              <span>
                <ImageIcon size={16} />
                查看完整截图
              </span>
            </button>
            <div className="evidence-copy">
              <Badge quiet>{e.status}</Badge>
              <h2>{e.title}</h2>
              <p>{e.visible}</p>
              <h3>可以借鉴</h3>
              <p>{e.learn}</p>
              <div className="boundary">{e.limit}</div>
            </div>
          </article>
        ))}
      </div>
      <Section title="可借鉴的视觉表达">
        <p>
          米白背景、深绿色重点、少量金色、珠串实物摄影、圆角信息容器与生活方式文案，形成手作品牌感。中央“定制”入口突出创作，作品广场帮助寻找灵感，空购物车引导继续浏览。
        </p>
      </Section>
    </>
  );
}

export function RoadmapPage() {
  return (
    <>
      <PageIntro title="从一个真实闭环，走向可复用产品。">
        先证明用户能设计、商家能交付，再判断收费与跨品类复用。阶段没有预设工期。
      </PageIntro>
      <div className="timeline">
        {roadmap.map((r, i) => (
          <article key={r.title} id={r.title}>
            <span className="timeline-number">0{i + 1}</span>
            <div>
              <h2>{r.title}</h2>
              <p>{r.text}</p>
              <div className="chips">
                {r.deliver.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="gate">
                <CheckCircle size={19} weight="duotone" />
                <span>推进依据：{r.gate}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Section title="四条路线分别排序">
        <DataTable headers={["路线", "顺序", "主要验证"]} rows={routes} />
      </Section>
      <Section title="用真实数据检验，而不是预设结果。">
        <DataTable headers={["指标", "记录口径", "用途"]} rows={metrics} />
      </Section>
      <Section title="第二品类怎样选">
        <div className="decision-list">
          <div>
            <strong>已有愿意试用的美甲商家</strong>
            <span>穿戴甲：验证十指搭配、尺寸与接单</span>
          </div>
          <div>
            <strong>有奶油胶／咕卡库存与制作方</strong>
            <span>手作拼贴：验证乐趣到材料包／成品购买</span>
          </div>
          <div>
            <strong>已有可靠印制供应商</strong>
            <span>固定商品印制：验证模板、导出与打样</span>
          </div>
          <div>
            <strong>有合作体验馆</strong>
            <span>有限体验项目：验证预约、备料与核销</span>
          </div>
        </div>
      </Section>
      <Notice>
        一个店铺运行说明方案可能有用；多个商家主要通过配置接入，才逐渐体现SaaS价值。3至5家是招募目标，不是已完成的试点。
      </Notice>
    </>
  );
}

export function NotesPage() {
  return (
    <>
      <PageIntro title="把想法、证据和假设分开存放。">
        保留原始思路的价值，同时记录还需要验证的市场、工艺和平台判断。
      </PageIntro>
      <Section
        title="竞品与参考对象"
        description="以下为对话提供的线索，未独立核验当前功能、价格、规模或商业化状态。"
      >
        <DataTable
          headers={["参考对象", "资料来源", "研究角度", "核验状态"]}
          rows={competitors}
        />
      </Section>
      <Section title="原判断与整理后的表述">
        <div className="correction-list">
          {corrections.map(([before, after]) => (
            <details key={before} id={before}>
              <summary>
                {before}
                <Badge quiet>待修订判断</Badge>
              </summary>
              <p>{after}</p>
            </details>
          ))}
        </div>
      </Section>
      <Section title="业务中需要保留的边界">
        <DataTable headers={["方面", "处理方式"]} rows={safeguards} />
      </Section>
      <Section title="来源与阅读说明">
        <PointList items={sourceNotes} />
        <p>
          本资料按商品品类、使用场景、履约方式、编辑能力和商家类型重新组织，保留所有独立方向与重要变种，合并重复描述。原文中的“下一步可以写PRD／报价／商家文案”记录为可选后续交付，不表示已经完成。
        </p>
      </Section>
      <Section title="后续可以继续补充什么">
        <div className="scenario-grid">
          {[
            ["商家产品介绍", "面向商家说明收益、流程、适用品类与合作边界。"],
            ["产品需求文档PRD", "将已验证流程拆成页面、字段、规则与验收。"],
            ["商家报价方案", "明确开发、订阅、初始化、素材、运营与佣金。"],
            ["竞品验证记录", "逐个记录入口、版本、真实操作和核验日期。"],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
