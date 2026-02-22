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

// 你的路由参数是英文 category，但你的图片文件夹是中文拼音/英文自定义
// 这里做一个 “路由 -> public 文件夹名” 的映射
const categoryFolder: Record<string, string> = {
  oil: "youhua",
  guohua: "guohua",
  watercolor: "shuifen",
  sculpture: "diaosu",
  anime: "dongman",
  print: "banhua",
  sketch: "sumiao",
  calligraphy: "shufa",
  seal: "zhuanke",
};

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const title = categoryName[category] ?? category;

  const folder = categoryFolder[category] ?? category;

  // 你现在实际有 3 张图：001.png, 002.png, 003.jpg
  const items = [
    { id: 1, name: `${title} 作品 1`, year: "—", src: `/artworks/${folder}/001.png` },
    { id: 2, name: `${title} 作品 2`, year: "—", src: `/artworks/${folder}/002.png` },
    { id: 3, name: `${title} 作品 3`, year: "—", src: `/artworks/${folder}/003.jpg` },
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
          <div key={it.id} className="rounded-2xl border bg-white overflow-hidden">
            {/* 图片区域：用 next/image 填满容器 */}
            <div className="relative aspect-[4/3] bg-zinc-100">
              <Image
                src={it.src}
                alt={it.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
                priority={it.id === 1}
              />
            </div>

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