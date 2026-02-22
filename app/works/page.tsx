// app/works/page.tsx
import Link from "next/link";

const categories = [
  { slug: "oil", name: "油画" },
  { slug: "guohua", name: "国画" },
  { slug: "watercolor", name: "水粉" },
  { slug: "sculpture", name: "雕塑" },
  { slug: "anime", name: "动漫" },
  { slug: "print", name: "版画" },
  { slug: "sketch", name: "素描" },
  { slug: "calligraphy", name: "书法" },
  { slug: "seal", name: "篆刻" },
];

export default function WorksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">作品</h1>
      <p className="text-zinc-600">选择一个门类进入浏览。</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/works/${c.slug}`}
            className="rounded-2xl border bg-white p-6 hover:shadow-sm transition"
          >
            <div className="text-lg font-semibold">{c.name}</div>
            <div className="mt-2 text-sm text-zinc-600">进入 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}