// app/works/page.tsx
import Link from "next/link";
import { client } from "@/sanity/lib/client";

type Category = {
  _id: string;
  title: string;
  slug: string;
  order?: number;
  description?: string;
};

export default async function WorksPage() {
  const intro = await client.fetch<{ content?: string } | null>(
    `*[_type=="siteText" && key=="works_intro"][0]{content}`
  );

  const categories = await client.fetch<Category[]>(
    `*[_type=="category"]|order(order asc, title asc){
      _id,
      title,
      "slug": slug.current,
      order,
      description
    }`
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">作品</h1>

      {intro?.content ? (
        <p className="text-zinc-600 leading-7">{intro.content}</p>
      ) : (
        <p className="text-zinc-600">
          （你还没在 Sanity 里创建 works_intro 文案。后台 → 网站文案(siteText) 新建一条：key=works_intro）
        </p>
      )}

      {categories.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-zinc-700">
          还没有分类。请去 Sanity 后台创建 category（例如：国画/油画/水彩等）。
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c._id}
              href={`/works/${c.slug}`}
              className="rounded-2xl border bg-white p-6 hover:shadow-sm transition"
            >
              <div className="text-lg font-semibold">{c.title}</div>
              {c.description ? (
                <div className="mt-2 text-sm text-zinc-600 line-clamp-2">
                  {c.description}
                </div>
              ) : (
                <div className="mt-2 text-sm text-zinc-600">进入 →</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}