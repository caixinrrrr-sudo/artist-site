import Link from "next/link";

const EXHIBITIONS = [
  { slug: "overview", title: "展览概览", date: "—", location: "—", content: "这里将展示陈琪的展览信息。你后续可以把内容替换成真实资料。" },
  { slug: "solo-2020", title: "个展示例（2020）", date: "2020", location: "上海", content: "示例展览页面，用于静态导出。后续可扩展为真实展览条目。" },
  { slug: "group-2018", title: "群展示例（2018）", date: "2018", location: "北京", content: "示例展览页面，用于静态导出。后续可扩展为真实展览条目。" }
];

export function generateStaticParams() {
  return EXHIBITIONS.map((e) => ({ slug: e.slug }));
}

export default function ExhibitionDetailPage({ params }: { params: { slug: string } }) {
  const item = EXHIBITIONS.find((e) => e.slug === params.slug);

  if (!item) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">未找到展览</h1>
        <Link className="text-sm underline" href="/exhibitions">← 返回展览列表</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{item.title}</h1>
        <div className="text-sm text-zinc-600">{item.date} · {item.location}</div>
        <Link className="text-sm underline" href="/exhibitions">← 返回展览列表</Link>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 leading-7 text-zinc-700">
        {item.content}
      </div>
    </div>
  );
}
