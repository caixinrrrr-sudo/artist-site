import Link from "next/link";
import fs from "fs/promises";
import path from "path";

type Content = {
  worksCategories: { slug: string; name: string }[];
};

async function getContent(): Promise<Content> {
  const p = path.join(process.cwd(), "data", "content.json");
  const raw = await fs.readFile(p, "utf-8");
  return JSON.parse(raw);
}

export default async function WorksPage() {
  const content = await getContent();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">作品</h1>
            <p className="mt-2 text-sm text-zinc-600">
              请选择一个类别进入浏览作品。
            </p>
          </div>
          <Link className="text-sm text-zinc-600 hover:text-zinc-900" href="/">
            返回首页
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.worksCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/works/${c.slug}`}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-lg font-semibold">{c.name}</div>
              <div className="mt-2 text-sm text-zinc-600">查看该类别作品 →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}