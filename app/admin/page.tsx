"use client";

import { useEffect, useMemo, useState } from "react";

type Work = {
  title: string;
  year?: string | number;
  imageUrl?: string;
  category?: string; // 作品馆/展览馆/图书馆/影像馆/资料馆/社会荣誉/社会公益
};

type TimelineItem = {
  year: string | number;
  label: string;
  detail?: string;
};

type Content = {
  siteTitle: string;
  artist: {
    name: string;
    portraitUrl: string;
    bannerUrl: string;
    bioHtml: string;
  };
  works: Work[];
  timeline?: TimelineItem[];
};

const TABS = [
  { key: "bio", label: "艺术家介绍" },
  { key: "works", label: "作品馆" },
  { key: "exhibitions", label: "展览馆" },
  { key: "library", label: "图书馆" },
  { key: "video", label: "影像馆" },
  { key: "archive", label: "资料馆" },
  { key: "honor", label: "社会荣誉" },
  { key: "public", label: "社会公益" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function HomePage() {
  const [content, setContent] = useState<Content | null>(null);
  const [tab, setTab] = useState<TabKey>("bio");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent(null));
  }, []);

  const worksByTab = useMemo(() => {
    if (!content?.works?.length) return [];
    const map: Record<TabKey, string | undefined> = {
      bio: undefined,
      works: "作品馆",
      exhibitions: "展览馆",
      library: "图书馆",
      video: "影像馆",
      archive: "资料馆",
      honor: "社会荣誉",
      public: "社会公益",
    };
    const want = map[tab];
    if (!want) return content.works;
    return content.works.filter((w) => (w.category || "").trim() === want);
  }, [content, tab]);

  if (!content) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Loading...</div>
        <div style={{ marginTop: 8, color: "#666" }}>
          如果一直卡住：确认终端里有 GET /api/content 200
        </div>
      </div>
    );
  }

  const { artist } = content;

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d" }}>
      {/* HERO */}
      <div
        style={{
          position: "relative",
          height: 360,
          backgroundImage: `url(${artist.bannerUrl || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.7))",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "56px 20px 0",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 2 }}>
            {content.siteTitle || "艺术世界"}
          </div>
          <div style={{ marginTop: 10, opacity: 0.9 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.18)",
                padding: "10px 14px",
                borderRadius: 999,
                backdropFilter: "blur(6px)",
              }}
            >
              <span style={{ fontWeight: 800 }}>{artist.name || "艺术家"}</span>
              <span style={{ opacity: 0.8 }}>·</span>
              <span style={{ opacity: 0.85 }}>已入藏/展陈信息可在后台补充</span>
            </span>
          </div>

          {/* TABS */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 0,
              borderRadius: 10,
              overflow: "hidden",
              width: "fit-content",
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(0,0,0,.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    padding: "12px 16px",
                    fontWeight: 800,
                    fontSize: 14,
                    color: active ? "#1b1b1b" : "rgba(255,255,255,.9)",
                    background: active ? "#e7d8b0" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    borderRight: "1px solid rgba(255,255,255,.10)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div
        style={{
          background: "linear-gradient(180deg, #151517, #0b0b0d)",
          padding: "28px 0 60px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: 22,
              alignItems: "start",
            }}
          >
            {/* LEFT CARD */}
            <div
              style={{
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.10)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,.35)",
              }}
            >
              <div style={{ padding: 14 }}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,.10)",
                    background: "rgba(255,255,255,.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.portraitUrl || ""}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,.06)",
                  borderTop: "1px solid rgba(255,255,255,.10)",
                  padding: "14px 16px",
                }}
              >
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>
                  {artist.name || "艺术家"}
                </div>
                <div style={{ color: "rgba(255,255,255,.75)", marginTop: 8, fontSize: 13 }}>
                  {tab === "bio" ? "艺术家介绍" : "精选内容展示"}
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* SECTION TITLE */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: 900 }}>
                  {TABS.find((t) => t.key === tab)?.label}
                </div>
                <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>
                  （内容来自 /api/content）
                </div>
              </div>

              {/* BIO */}
              {tab === "bio" && (
                <div
                  style={{
                    marginTop: 14,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.10)",
                    borderRadius: 14,
                    padding: 18,
                    color: "rgba(255,255,255,.92)",
                    lineHeight: 1.85,
                    boxShadow: "0 12px 40px rgba(0,0,0,.25)",
                  }}
                >
                  <div
                    style={{ fontSize: 14 }}
                    dangerouslySetInnerHTML={{
                      __html: artist.bioHtml || "<p>请在后台填写艺术家介绍。</p>",
                    }}
                  />
                </div>
              )}

              {/* WORKS CAROUSEL */}
              {tab !== "bio" && (
                <div style={{ marginTop: 14 }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.10)",
                      borderRadius: 14,
                      padding: 16,
                      boxShadow: "0 12px 40px rgba(0,0,0,.25)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        overflowX: "auto",
                        paddingBottom: 10,
                        scrollSnapType: "x mandatory",
                      }}
                    >
                      {(worksByTab.length ? worksByTab : content.works).slice(0, 20).map((w, idx) => (
                        <div
                          key={idx}
                          style={{
                            minWidth: 260,
                            width: 260,
                            scrollSnapAlign: "start",
                            borderRadius: 12,
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,.10)",
                            background: "rgba(255,255,255,.05)",
                            position: "relative",
                          }}
                        >
                          <div style={{ width: "100%", height: 170, background: "rgba(0,0,0,.25)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={w.imageUrl || artist.bannerUrl || ""}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                          </div>

                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.85) 100%)",
                            }}
                          />

                          <div style={{ position: "absolute", left: 12, bottom: 12, right: 12 }}>
                            <div style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>
                              {w.title || "作品标题"}
                            </div>
                            <div style={{ color: "rgba(255,255,255,.75)", marginTop: 4, fontSize: 13 }}>
                              {w.year ? `${w.year}年` : "年份可选"}
                            </div>
                          </div>
                        </div>
                      ))}

                      {!content.works?.length && (
                        <div style={{ color: "rgba(255,255,255,.75)", padding: 10 }}>
                          你现在 works 还是空的。想要和截图一样有一排作品卡片，需要在 data/content.json 里给 works 加数据（我也可以给你模板）。
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TIMELINE */}
              <div style={{ marginTop: 18 }}>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 900 }}>艺术历程</div>
                <div
                  style={{
                    marginTop: 12,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.10)",
                    borderRadius: 14,
                    padding: 16,
                    boxShadow: "0 12px 40px rgba(0,0,0,.25)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6 }}>
                    {(content.timeline && content.timeline.length ? content.timeline : demoTimeline()).map((t, idx) => (
                      <div
                        key={idx}
                        style={{
                          minWidth: 140,
                          borderRadius: 999,
                          padding: "10px 12px",
                          border: "1px solid rgba(231,216,176,.35)",
                          background: "rgba(231,216,176,.10)",
                          color: "rgba(255,255,255,.92)",
                        }}
                      >
                        <div style={{ fontWeight: 900 }}>{t.year}</div>
                        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>{t.label}</div>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      marginTop: 12,
                      height: 10,
                      borderRadius: 999,
                      background: "rgba(255,255,255,.10)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ width: "32%", height: "100%", background: "#e7d8b0" }} />
                  </div>

                  <div style={{ marginTop: 10, color: "rgba(255,255,255,.65)", fontSize: 12 }}>
                    提示：如果你想完全做成你截图那种“年份刻度 + 彩色分段 + 点击切换”，我也能继续给你做升级版。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 40 }} />
        </div>
      </div>
    </div>
  );
}

function demoTimeline(): TimelineItem[] {
  return [
    { year: 1989, label: "参展 / 交流" },
    { year: 1992, label: "重要作品阶段" },
    { year: 1999, label: "海外展出" },
    { year: 2006, label: "作品代表作" },
    { year: 2011, label: "学术 / 馆藏" },
    { year: 2018, label: "重要展览" },
    { year: 2024, label: "近期动态" },
  ];
}
