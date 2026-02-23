// app/works/[category]/page.tsx
import Link from "next/link";
import Image from "next/image";

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

// ✅ 关键：静态导出必须写这个，告诉 Next 要生成哪些 category 页面
export function generateStaticParams() {
  return Object.keys(categoryName).map((category) => ({ category }));
}

export default function WorkCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const title = categoryName[category] ?? category;

  // ✅ 先用 3 张示例图（你可以按分类扩展）
  // 注意：这只是示例，如果分类不是 guohua，也会显示这 3 张（为了先让你 export 成功上线）
  const items = [
    { id: 1, name: `${title} 作品 001`, src: "/artworks/guohua/001.png" },
    { id: 2, name: `${title} 作品 002`, src: "/artworks/guohua/002.png" },
    { id: 3, name: `${title} 作品 003`, src: "/artworks/guohua/003.jpg" },
  ];

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
          <div
            key={it.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <div className="relative aspect-[4/3] bg-zinc-100">
              <Image
                src={it.src}
                alt={it.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="font-medium">{it.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}