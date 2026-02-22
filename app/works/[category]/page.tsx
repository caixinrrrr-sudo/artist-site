// app/works/[category]/page.tsx
import Link from "next/link";

const categoryName: Record<string, string> = {
  oil: "油画",
  guohua: "国画",
  watercolor: "水粉",
  sculpture: "雕塑",
  anime: "动漫",
  print: "版画",
  sketch: "素描",
  calligraphy: "书法",
  seal: "篆刻",
};

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const title = categoryName[category] ?? category;

  // 先用占位数据，后面你换成真实作品列表即可
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `${title} 作品 ${i + 1}`,
    year: "—",
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <Link className="text-sm underline" href="/works">
          ← 返回作品总页
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border bg-white overflow-hidden">
            <div className="aspect-[4/3] bg-zinc-100" />
            <div className="p-4">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-zinc-600">{it.year}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}