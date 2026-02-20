import Image from "next/image";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

type Work = {
  id: string;
  category: string;
  title: string;
  year?: string;
  image: string;
  material?: string;
};

type Content = {
  worksCategories: { slug: string; name: string }[];
  works: Work[];
};

async function getContent(): Promise<Content> {
  const p = path.join(process.cwd(), "data", "content.json");
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw);
}

export default async function WorksCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const content = await getContent();
  const cat = content.worksCategories.find((c) => c.slug === params.category);
  if (!cat) return notFound();

  const items = content.works.filter((w) => w.category === params.category);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">{cat.name}</h1>
            <p className="mt-2 text-sm text-zinc-600">
              共 {items.length} 件作品
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link className="text-zinc-600 hover:text-zinc-900" href="/works">
              返回作品目录
            </Link>
            <Link className="text-zinc-600 hover:text-zinc-900" href="/">
              首页
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w) => (
            <Link
              key={w.id}
              href={`/works/${params.category}/${w.id}`}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-zinc-100">
                <Image
                  src={w.image}
                  alt={w.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-base font-semibold">{w.title}</div>
                <div className="mt-1 text-sm text-zinc-600">
                  {w.year ? `${w.year} · ` : ""}{w.material ?? ""}
                </div>
                <div className="mt-3 text-sm font-medium text-zinc-900 opacity-70 group-hover:opacity-100">
                  查看详情 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}